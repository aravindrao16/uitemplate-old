// This import is a minimal SDK which does not have a DatafileManager - hence it
// will only work when passed a `datafile` directly. Just passing an `sdkKey`
// will not work.
// See: https://github.com/optimizely/javascript-sdk/issues/743
import {
  createInstance,
  UserAttributes,
} from "@optimizely/optimizely-sdk/dist/optimizely.lite.min";
import Config from "config";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import FeatureFlag from "util/constants/FeatureFlag";
import { defaultConfig, enabledFeatures } from "./util";

export type ContextRequest = GetServerSidePropsContext["req"];

/**
 * This method is intended for use in `src/pages/api/*.ts`, and
 * `getServerSideProps` for determining whether a feature is enabled during a
 * server request. Each request needs to create a new instance and the feature
 * checked with a unique `userId`, usually retrieved from the `cookies` in the
 * request.
 *
 * Feature checking in `middleware.ts` has additional constraints around
 * fetching the `datafile` that will need to be addressed before feature
 * flagging can be used there. However, for most purposes, server-side or
 * client-side feature checking should be sufficient.
 *
 * Feature checking in `getStaticProps` is not as useful and limited to
 * build-time feature-flag state only. Features can be toggled client-side, or
 * `getStaticProps` can be changed to `getServerSideProps` for the duration of a
 * feature.
 *
 * When using `client.isFeatureEnabled`, you may find that you mistype the
 * `featureKey` - If that is the case, check the server-side console logs for
 * the message `PROJECT_CONFIG: Feature key <featureKey> is not in datafile.`.
 *
 * # Examples
 *
 * ```
 * const myApi = async (req: NextApiRequest, res: NextApiResponse) => {
 *   const client = await createOptimizelyInstance(req);
 *   const userId = getOptimizelyUserId(req.cookies);
 *   const myFeature: FeatureFlag = "my-feature";
 *   if (client.isFeatureEnabled(myFeature, userId)) {
 *     // Do something when the feature is enabled
 *   }
 *   return res.status.json(someData);
 * }
 * ```
 *
 * ```
 * const getServerSideProps = async (
 *   ctx: GetServerSidePropsContext,
 * ): Promise<GetServerSidePropsResult> => {
 *   const client = await createOptimizelyInstance(ctx.req);
 *   const userId = getOptimizelyUserId(ctx.req.cookies);
 *   const myFeature: FeatureFlag = "my-feature";
 *   if (client.isFeatureEnabled(myFeature, userId)) {
 *     // Do something when the feature is enabled
 *   }
 *   return { props: { someProps } };
 * };
 * ```
 */
export const createOptimizelyInstance = async (
  req: ContextRequest | NextApiRequest,
) => {
  const datafile_res = await fetch(
    `${Config.optimizelyDomain}/datafiles/${Config.optimizelySdkKey}.json`,
  );
  const datafile = await datafile_res.json();
  const client = createInstance({
    datafile,
    ...defaultConfig,
  });

  if (!client) {
    throw new Error("failed to instantiate Optimizely Client");
  }

  // Override `isFeatureEnabled` to honor cookie overrides
  // `bind` is required here since isFeatureEnabled relies on `this`.
  const origIsFeatureEnabled = client.isFeatureEnabled.bind(client);
  client.isFeatureEnabled = (
    featureKey: FeatureFlag,
    userId: string,
    attributes?: UserAttributes,
  ): boolean => {
    const override = enabledFeatures(req.cookies)[featureKey];
    const enabled = origIsFeatureEnabled(
      featureKey.toLowerCase(),
      userId,
      attributes,
    );
    return override ?? enabled;
  };

  return client;
};
