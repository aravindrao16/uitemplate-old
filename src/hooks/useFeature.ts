// eslint-disable-next-line driveway/custom-use-feature
import { useFeature as useOptimizelyFeature } from "@optimizely/react-sdk";
import { useEffect, useState } from "react";
import FeatureFlag from "util/constants/FeatureFlag";
import { enabledFeatures } from "util/optimizely/util";

type HookOptions = {
  autoUpdate?: boolean;
  timeout?: number;
};
type HookOverrides = {
  overrideUserId?: string;
  overrideAttributes?: {
    [name: string]: any;
  };
};
interface FeatureDecisionValues {
  isEnabled: boolean;
  variables: {
    [key: string]: any;
  };
}
type ClientReady = boolean;
type DidTimeout = boolean;

type UseFeature = {
  (featureKey: FeatureFlag, options?: HookOptions, overrides?: HookOverrides): [
    FeatureDecisionValues["isEnabled"],
    FeatureDecisionValues["variables"],
    ClientReady,
    DidTimeout,
  ];
};

const useFeature: UseFeature = (featureKey, options?, overrides?) => {
  const [optimizelyEnabled, variables, clientReady, didTimeout] =
    useOptimizelyFeature(featureKey, options, overrides);
  const [enabled, setEnabled] = useState(optimizelyEnabled);

  useEffect(() => {
    const override = enabledFeatures()[featureKey.toLowerCase()];
    setEnabled(override ?? optimizelyEnabled);
  }, [enabled, featureKey, optimizelyEnabled]);

  return [enabled, variables, clientReady, didTimeout];
};

export default useFeature;
export type {
  HookOptions,
  HookOverrides,
  FeatureDecisionValues,
  ClientReady,
  DidTimeout,
};
