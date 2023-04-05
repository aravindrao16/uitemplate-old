import Paths from "paths";

export const OPTIMIZELY_USER_COOKIE = "iui-optimizely_visitor_id";
export const IS_BOT_COOKIE = "iui-isBot";

const Config = {
  isServerSide: typeof window === "undefined",
  version: process.env.NEXT_PUBLIC_VERSION || "",
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "prod",
  pathAfterLogin: Paths.Home,
  authClientID: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || "",
  authAuthorityID: process.env.NEXT_PUBLIC_AUTH_AUTHORITY_ID || "",
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "",
  apiBase: process.env.NEXT_PUBLIC_API_BASE || "",
  backendApiKey: process.env.NEXT_PUBLIC_BACKEND_API_KEY || "",
  exampleEndpointApiPath:
    process.env.NEXT_PUBLIC_EXAMPLE_ENDPOINT_API_PATH || "",
  optimizelySdkKey: process.env.NEXT_PUBLIC_OPTIMIZELY_KEY || "",
  optimizelyDomain: process.env.NEXT_PUBLIC_OPTIMIZELY_DOMAIN || "",
};

export default Config;
