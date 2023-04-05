// eslint-disable-next-line driveway/custom-use-feature
import { useFeature as useOptimizelyFeature } from "@optimizely/react-sdk";
import { renderHook } from "@testing-library/react";
import FeatureFlag from "util/constants/FeatureFlag";
import { featureDisabled, featureEnabled } from "util/tests/mockFeature";
import useFeature from "./useFeature";

describe("useFeature", () => {
  const featureKey = "1234-mock-feature-flag" as FeatureFlag;
  const mockUseOptimizelyFeature = useOptimizelyFeature as jest.Mock;

  beforeEach(() => {
    // Jest doesn't have real cookies so this works to clear all cookies
    document.cookie = "";
  });

  it("Allows overriding feature with TesterEnabled_ cookie set to true when feature is disabled", () => {
    mockUseOptimizelyFeature.mockReturnValue(featureDisabled);
    document.cookie = `TesterEnabled_${featureKey}=true`;
    const { result } = renderHook(() => useFeature(featureKey));
    expect(result.current[0]).toBe(true);
  });

  it("Allows overriding feature with TesterEnabled_ cookie set to false when feature is enabled", () => {
    mockUseOptimizelyFeature.mockReturnValue(featureEnabled);
    document.cookie = `TesterEnabled_${featureKey}=false`;
    const { result } = renderHook(() => useFeature(featureKey));
    expect(result.current[0]).toBe(false);
  });
});
