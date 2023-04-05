import pino, { LoggerOptions } from "pino";
import pinoHttp from "pino-http";

const logLevel = process.env.VERBOSITY ?? "info";

const pinoConfig: LoggerOptions = {
  level: logLevel,
  ...(process.env.NODE_ENV !== "production" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  }),
};

const logger = pino(pinoConfig);
const httpLogger = pinoHttp({
  logger,
  customLogLevel: function (_req, res, err) {
    // Don't log in development unless debug/trace is enabled
    if (
      process.env.NODE_ENV !== "production" &&
      !["debug", "trace"].includes(logLevel)
    ) {
      return "silent";
    }

    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
});

export default logger;
export { httpLogger };
