import { enums } from "@optimizely/react-sdk";
import Config from "config";
import { OPTIMIZELY_USER_COOKIE } from "config";
import { nanoid } from "nanoid";

type EnabledFeatures = {
  [featureKey: string]: boolean;
};

type Cookies = { [key: string]: string | undefined };

const cookiesFromString = (cookies: string) =>
  Object.fromEntries(cookies.split("; ").map((cookie) => cookie.split("=")));

export const getOptimizelyUserId = (cookies: Cookies = {}): string => {
  if (typeof document !== "undefined") {
    cookies = cookiesFromString(document.cookie);
  }

  const userId = cookies[OPTIMIZELY_USER_COOKIE] ?? nanoid();
  if (typeof document !== "undefined" && !cookies[OPTIMIZELY_USER_COOKIE]) {
    document.cookie = `${OPTIMIZELY_USER_COOKIE}=${userId}; Secure`;
  }

  return userId;
};

// Retrieve local feature overrides set via cookies. By default will use
// `document.cookie` on the client. Optionally accepts a cookies string which
// is used by enabledFeaturesServer for determining enabled features on
// the server
export const enabledFeatures = (cookies: Cookies = {}): EnabledFeatures => {
  if (typeof document !== "undefined") {
    cookies = cookiesFromString(document.cookie);
  }

  return Object.entries(cookies)
    .filter(([key]) => key.startsWith("TesterEnabled_"))
    .reduce<EnabledFeatures>((overrides, [key, value]) => {
      if (key) {
        const featureKey = key.split("TesterEnabled_").pop()?.toLowerCase();
        if (featureKey) {
          overrides[featureKey] = value?.toLowerCase() === "true";
        }
      }
      return overrides;
    }, {});
};

type LogLevel = ValueOf<typeof enums.LOG_LEVEL>;

// set up custom logger for optimizely log to forward to DataDog
export const customLogger = (level: LogLevel, message: string) => {
  const getLogLevel = (logLevel: LogLevel) => {
    const LOG_LEVEL = enums.LOG_LEVEL;
    switch (logLevel) {
      case LOG_LEVEL.DEBUG:
        return "debug";
      case LOG_LEVEL.INFO:
        return "info";
      case LOG_LEVEL.WARNING:
        return "warn";
      case LOG_LEVEL.ERROR:
        return "error";
      default:
        return "debug";
    }
  };

  if (!Config.isServerSide && process.env.NODE_ENV === "production") {
    import("@datadog/browser-logs").then(({ datadogLogs }) =>
      datadogLogs.logger.log(
        message,
        {
          env: Config.environment,
          version: Config.version,
        },
        getLogLevel(level),
      ),
    );
  } else {
    console[getLogLevel(level)](message);
  }
};

export const defaultConfig = {
  // https://docs.developers.optimizely.com/full-stack/docs/initialize-sdk-javascript#section-on-ready
  datafileOptions: {
    autoUpdate: true,
    urlTemplate: `${Config.optimizelyDomain}/datafiles/%s.json`,
  },
  logger: { log: customLogger },
  logLevel: enums.LOG_LEVEL.ERROR,
};
