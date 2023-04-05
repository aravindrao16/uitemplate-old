import type msalBrowserType from "@azure/msal-browser";
import type { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "authConfig";

const msalBrowser: jest.Mocked<typeof msalBrowserType> =
  jest.createMockFromModule("@azure/msal-browser");

let instance = new msalBrowser.PublicClientApplication(msalConfig);

const acquireTokenSilent = jest.fn(async () => ({
  accessToken: "27a5652247324ce4a416aeb75f8f493a",
}));
const acquireTokenPopup = jest.fn(async () => ({
  accessToken: "27a5652247324ce4a416aeb75f8f493a",
}));
const getAllAccounts = jest.fn(() => [] as AccountInfo[]);

msalBrowser.PublicClientApplication.mockReturnValue({
  ...instance,
  acquireTokenSilent,
  acquireTokenPopup,
  getAllAccounts,
} as unknown as PublicClientApplication);

module.exports = {
  ...msalBrowser,
  acquireTokenSilent,
  acquireTokenPopup,
  getAllAccounts,
};
export default msalBrowser;
export { acquireTokenSilent, acquireTokenPopup, getAllAccounts };
