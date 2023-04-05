import { createInstance } from "@optimizely/react-sdk";
import Config from "config";
import { HookOverrides } from "hooks/useFeature";
import FeatureFlag from "util/constants/FeatureFlag";
import { defaultConfig, enabledFeatures, getOptimizelyUserId } from "./util";

/**
 * This method is intended for use in React components that are wrapped in an
 * `<OptimizelyProvider />` instance, whether they are server-rendered or not.
 *
 * Note that static generation feature checking is limited to build-time - but
 * since the page will be rehydrated client-side, the `useFeature` hook will
 * re-render the page after initial download. Just be sure to check the
 * `clientReady` value from `useFeature` to avoid a possible flash of
 * feature-flagged content.
 *
 * If you desire feature checking in `/src/pages/api/*` or `getServerSideProps` - see
 * `src/util/optimizely/server.ts`.
 */
const createOptimizelyClient = () => {
  const client = createInstance({
    sdkKey: Config.optimizelySdkKey,
    datafile: Config.isServerSide ? undefined : window.optimizelyDatafile,
    ...defaultConfig,
  });

  client.setUser({
    id: getOptimizelyUserId(),
    attributes: enabledFeatures(),
  });

  // The default timeout is 30 seconds, but our current page-load speed on the
  // slowest connections is around 10 seconds. The timeout itself has no impact
  // other than to log an error if it's reached, giving analytics about the
  // timeout rate and reasons for failure.
  client.onReady({ timeout: 10000 }).then((clientResult) => {
    if (!clientResult.success) {
      console.error(`Optimizely failed to load: ${clientResult.reason}`);
    }
  });

  // Override `isFeatureEnabled` to honor cookie overrides
  // `bind` is required here since isFeatureEnabled relies on `this`.
  const origIsFeatureEnabled = client.isFeatureEnabled.bind(client);
  client.isFeatureEnabled = (
    featureKey: FeatureFlag,
    overrideUserId?: HookOverrides["overrideUserId"],
    overrideAttributes?: HookOverrides["overrideAttributes"],
  ): boolean => {
    const override = enabledFeatures()[featureKey];
    if (!client.isReady()) {
      return override;
    }
    const enabled = origIsFeatureEnabled(
      featureKey.toLowerCase(),
      overrideUserId,
      overrideAttributes,
    );
    return override ?? enabled;
  };

  return client;
};

export const optimizelyClient = createOptimizelyClient();
