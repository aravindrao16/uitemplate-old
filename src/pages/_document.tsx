import createEmotionServer from "@emotion/server/create-instance";
import tracer from "dd-trace";
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import createEmotionCache from "util/createEmotionCache";
import { httpLogger } from "util/logger";

tracer.init();

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <!-- Favicon --> */}
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-57.png"
            sizes="57x57"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-76.png"
            sizes="76x76"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-120.png"
            sizes="120x120"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-128.png"
            sizes="128x128"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-144.png"
            sizes="144x144"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-152.png"
            sizes="152x152"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-167.png"
            sizes="167x167"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-180.png"
            sizes="180x180"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-192.png"
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-195.png"
            sizes="195x195"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-196.png"
            sizes="196x196"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-228.png"
            sizes="228x228"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-256.png"
            sizes="256x256"
          />

          {/* <!-- Android --> */}
          <link
            rel="shortcut icon"
            sizes="196x196"
            href="/favicons/favicon-196.png"
          />

          {/* <!-- iOS --> */}
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/favicons/favicon-120.png"
            sizes="120x120"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/favicons/favicon-152.png"
            sizes="152x152"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/favicons/favicon-167.png"
            sizes="167x167"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/favicons/favicon-180.png"
            sizes="180x180"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/favicons/favicon-256.png"
            sizes="256x256"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/favicons/favicon.png"
          />

          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <meta name="release" content={process.env.NEXT_PUBLIC_VERSION} />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
          />

          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}

          <link rel="manifest" href="/manifest.json" />
        </Head>

        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` is allowed in `_document.tsx` (and not `_app.tsx`),
// as it's compatible with automatic static-site generation (SSG).
Document.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // This is required to get MUI styles injected before any makeStyles
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const { req, res } = ctx;
  // `on` is supposedly required, but `next run build` doesn't define it
  if (req && res && typeof res.on !== "undefined") {
    httpLogger(req, res);
  }

  const initialProps = await NextDocument.getInitialProps(ctx);

  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

export default Document;
