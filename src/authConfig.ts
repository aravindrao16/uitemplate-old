import {
  Configuration,
  PopupRequest,
  SilentRequest,
} from "@azure/msal-browser";
import Config from "config";

const protocol = Config.baseURL.startsWith("localhost") ? "http" : "https";

export const msalConfig: Configuration = {
  auth: {
    clientId: Config.authClientID,
    authority: `https://login.microsoftonline.com/${Config.authAuthorityID}`,
    redirectUri: `${protocol}://${Config.baseURL}/blank.html`,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginPopupRequest: PopupRequest = {
  scopes: ["User.Read"],
};

export const graphApiTokenSilentRequest: SilentRequest = {
  scopes: ["User.Read"],
};

// Internal API Endpoint examples, should be in the appropriate domain folder
export const exampleApiConfig = {
  endpoint: "https://internal-api-template-v2.dev.driveway.cloud",
  scopes: ["api://internal-api-template-v2.dev.driveway.cloud/access_as_user"],
};

export const exampleApiTokenSilentRequest: SilentRequest = {
  scopes: exampleApiConfig.scopes,
};

export const exampleApiTokenPopupRequest: PopupRequest = {
  scopes: exampleApiConfig.scopes,
};
