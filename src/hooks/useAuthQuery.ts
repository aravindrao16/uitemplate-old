import { PublicClientApplication } from "@azure/msal-browser";
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { msalConfig } from "authConfig";
import { useCallback } from "react";

export const useAuthQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseGetAccessTokenOpts &
    Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn" | "initialData"
    >,
) => {
  const { audience, scopes, ...queryOptions } = options ?? {};
  const getAccessToken = useGetAccessToken({ audience, scopes });
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    async (context) => {
      const accessToken = await getAccessToken();
      return queryFn({ ...context, meta: { ...context.meta, accessToken } });
    },
    queryOptions,
  );
};

export type UseGetAccessTokenOpts = {
  audience?: string;
  scopes?: string[];
};

export const useGetAccessToken = ({
  audience,
  scopes = [],
}: UseGetAccessTokenOpts) => {
  const getAccessToken = useCallback(async () => {
    const instance = new PublicClientApplication(msalConfig);
    const account = instance.getAllAccounts()[0];
    const tokenParams = {
      audience,
      scopes,
      account,
    };

    let accessToken = "";
    try {
      accessToken = (await instance.acquireTokenSilent(tokenParams))
        .accessToken;
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Consent required")) {
        accessToken = (await instance.acquireTokenPopup(tokenParams))
          .accessToken;
      }
    }
    if (!accessToken) {
      throw new Error("Failed to fetch Access Token");
    }
    return accessToken;
  }, [audience, scopes]);

  return getAccessToken;
};
