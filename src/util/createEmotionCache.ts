import createCache from "@emotion/cache";
import Config from "config";

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  let insertionPoint;

  if (!Config.isServerSide) {
    insertionPoint =
      document.querySelector<HTMLMetaElement>(
        "meta[name='emotion-insertion-point']",
      ) ?? undefined;
  }

  return createCache({ key: "mui-style", insertionPoint });
}
