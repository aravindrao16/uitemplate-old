// @ts-check

const { PHASE_PRODUCTION_SERVER } = require("next/constants");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @typedef { import('next').NextConfig } NextConfig
 */

/**
 * @param {string} phase
 * @returns {Promise<NextConfig>}
 */
module.exports = async (phase) => {
  /**
   * @type {NextConfig}
   */
  const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    poweredByHeader: false,
    swcMinify: true,
    compiler: {
      // Removes any errant console.log/console.info uses from production builds
      ...(phase === PHASE_PRODUCTION_SERVER && {
        removeConsole: {
          exclude: ["warn", "error"],
        },
      }),
    },
    // TODO:  Enable once stabilized
    // experimental: {
    //   // Disables polyfills on the browser to reduce bundle size
    //   fallbackNodePolyfills: false,
    // },
    productionBrowserSourceMaps: true,
    async rewrites() {
      return {
        // Checked after headers/redirects but before all files including
        // _next/public
        beforeFiles: [
          { source: "/liveness", destination: "/api/liveness" },
          {
            source: "/readiness",
            destination: "/api/readiness",
          },
          {
            source: "/robots.txt",
            destination: "/robots-canary.txt",
            has: [
              {
                type: "host",
                value: "(canary.*.com|(canary.)?prod.*.cloud)",
              },
            ],
          },
        ],
        // Checked after pages/public but before dynamic routes
        afterFiles: [],
        // Checked after pages/public and dynamic routes
        fallback: [],
      };
    },    
    webpack: (config) => {
      //config.resolve.fallback = { fs: false,dns: false,tls:false,'pg-native':false };
      //net: false,
      // next will automatically ignore .svg if a custom rule is defined
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: { not: /\.css$/i },
        use: [
          // For use as an inline ReactComponent:
          {
            loader: "@svgr/webpack",
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
              exportType: "named",
              jsxRuntime: "classic",
            },
          },
          // For use as an img `src`:
          // FIXME: These are deprecated for webpack5: https://webpack.js.org/guides/asset-modules/
          // [ext] here does not include the leading `.` unlike `asset/resource` above
          {
            loader: "file-loader",
            options: {
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      });

      return config;
    },
  };

  return withBundleAnalyzer(nextConfig);
};
