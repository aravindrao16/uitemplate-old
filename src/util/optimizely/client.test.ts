import { isFeatureEnabled as mockIsFeatureEnabled } from "__mocks__/@optimizely/react-sdk";
import FeatureFlag from "util/constants/FeatureFlag";
import { optimizelyClient } from "./client";

describe("Config", () => {
  const featureKey = "1234-mock-feature-flag" as FeatureFlag;

  beforeEach(() => {
    // Jest doesn't have real cookies so this works to clear all cookies
    document.cookie = "";
  });

  it("Allows overriding isFeatureEnabled with TesterEnabled_ cookie set to true when feature is disabled", () => {
    mockIsFeatureEnabled.mockReturnValue(false);
    document.cookie = `TesterEnabled_${featureKey}=true`;
    expect(optimizelyClient.isFeatureEnabled(featureKey)).toBe(true);
  });

  it("Allows overriding isFeatureEnabled with TesterEnabled_ cookie set to false when feature is enabled", () => {
    mockIsFeatureEnabled.mockReturnValue(true);
    document.cookie = `TesterEnabled_${featureKey}=false`;
    expect(optimizelyClient.isFeatureEnabled(featureKey)).toBe(false);
  });
});
