import "simplebar/src/simplebar.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import "global.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { OptimizelyProvider } from "@optimizely/react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { msalConfig } from "authConfig";
import MotionLazyContainer from "component-lib/animate/MotionLazyContainer";
import NotistackProvider from "component-lib/NotistackProvider";
import Page from "component-lib/Page";
import { ProgressBarStyle } from "component-lib/ProgressBar";
import Settings from "component-lib/settings";
import ThemeColorPresets from "component-lib/ThemeColorPresets";
import Config from "config";
import DashboardLayout from "core/components/dashboard/DashboardLayout";
import { NextPage } from "next";
import { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import AppsProvider from "providers/AppsProvider";
import AuthProvider from "providers/AuthProvider";
import CollapseDrawerProvider from "providers/CollapseDrawerProvider";
import SettingsProvider from "providers/SettingsProvider";
import { ReactElement, ReactNode, useState } from "react";
import ThemeProvider from "theme";
import createEmotionCache from "util/createEmotionCache";
import { optimizelyClient } from "util/optimizely/client";
// ----------------------------------------------------------------------

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // Provide optional custom layout wrapper component around your page for
  // persisting state across page-transitions.
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

// Print web vitals performance metrics to the console during development.
export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (
    process.env.NODE_ENV !== "production" &&
    ["custom", "web-vital"].includes(metric.label)
  ) {
    const { name, value, label } = metric;
    console.info(`${name} (${label}): ${value.toFixed(2)} ms`);
  }
};

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const [msalInstance] = useState(() => {
    let redirectUri = new URL(msalConfig.auth.redirectUri || "");
    if (Config.environment === "local") {
      redirectUri.protocol = "http";
      redirectUri.hostname = "localhost";
      redirectUri.port = process.env.PORT ?? "8080";
    }
    return new PublicClientApplication({
      ...msalConfig,
      auth: {
        ...msalConfig.auth,
        redirectUri: redirectUri.toString(),
      },
    });
  });

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SettingsProvider>
        <CollapseDrawerProvider>
          <AuthProvider>
            <AppsProvider>
              <Page title="Home">
                <MsalProvider instance={msalInstance}>
                  <QueryClientProvider client={queryClient}>
                    <ThemeProvider>
                      <ThemeColorPresets>
                        <OptimizelyProvider
                          optimizely={optimizelyClient}
                          isServerSide={Config.isServerSide}
                          timeout={500}
                        >
                          <NotistackProvider>
                            <MotionLazyContainer>
                              <ProgressBarStyle />
                              <Settings />
                              <DashboardLayout>
                                {getLayout(<Component {...pageProps} />)}
                              </DashboardLayout>
                            </MotionLazyContainer>
                          </NotistackProvider>
                        </OptimizelyProvider>
                      </ThemeColorPresets>
                    </ThemeProvider>
                  </QueryClientProvider>
                </MsalProvider>
              </Page>
            </AppsProvider>
          </AuthProvider>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </CacheProvider>
  );
}
