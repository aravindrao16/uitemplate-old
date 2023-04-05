import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import Config from "config";

type FetchJsonProps<
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = any,
> = RequestInit & {
  /**
   * Absolute url or url relative to hostname.
   * Do *not* include querystring,
   */
  url: string;
  /**
   * Parameters for constructing the querystring (post-'?') portion of a url
   */
  params?: string | string[][] | Record<string, string> | URLSearchParams;
  /**
   * Function to customize which statuses do not throw errors (default: 200-299)
   */
  validateStatus?: (status: number) => boolean;
  /**
   * useQuery's context object, which may contain an auth token that useAuthQuery will provide if available.
   */
  context?: QueryFunctionContext<TQueryKey, TPageParam>;
};

const defaultValidateStatus = (status: number) =>
  status >= 200 && status <= 299;

/**
 * Helper to simplify calling Driveway endpoints.
 * * Will include an environment-specific hostname if a relative url is provided.
 * * Will include Driveway's api-key in the querystring
 * unless a "key" prop is specified in params.
 * * Throws errors for non-2** responses (customizable).
 * * Includes JSON headers and only supports JSON return type.
 * * Intended for composition with useQuery and useMutation
 */
export const fetchJson = async <
  TReturn,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = any,
>({
  url,
  params = {},
  validateStatus = defaultValidateStatus,
  context = undefined,
  ...customFetchOptions
}: FetchJsonProps<TQueryKey, TPageParam>): Promise<TReturn> => {
  const fetchUrl = new URL(url, Config.apiBase);
  [...new URLSearchParams(params)].forEach(([param, val]) =>
    fetchUrl.searchParams.set(param, val),
  );
  if (!fetchUrl.searchParams.has("key")) {
    fetchUrl.searchParams.set("key", Config.backendApiKey);
  }

  const { accessToken } = context?.meta ?? {};

  const fetchOptions = {
    ...customFetchOptions,
    headers: {
      ...customFetchOptions.headers,
      ...(Boolean(accessToken) && {
        authorization: `Bearer ${accessToken}`,
      }),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return fetch(fetchUrl.toString(), fetchOptions).then((res) => {
    if (!res.ok && !validateStatus(res.status)) {
      throw new Error(`Didn't receive a valid response. Status: ${res.status}`);
    } else {
      return res.json() as Promise<TReturn>;
    }
  });
};
