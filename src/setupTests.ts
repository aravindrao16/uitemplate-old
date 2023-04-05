// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect";
import mediaQuery from "css-mediaquery";
import failOnConsole from "jest-fail-on-console";
import fetchMock from "jest-fetch-mock";

// https://material-ui.com/components/use-media-query/#testing
const createMatchMedia = (width: number) => {
  return (query: string): MediaQueryList => ({
    media: "",
    matches: mediaQuery.match(query, { width }),
    addListener: jest.fn(),
    addEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    onchange: jest.fn(),
    removeListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
};

global.crypto = require("crypto");
window.matchMedia = createMatchMedia(window.innerWidth);
window.scrollTo = jest.fn();

fetchMock.enableMocks();

// Suppress warnings from specific messages.
// NOTE: You should have very good reasons for adding to this list.
const allowed_warnings: string[] = [];

// Throw errors when a `console.error` or `console.warn` happens to avoid
// unintended failing or incorrect tests.
failOnConsole({
  silenceMessage: (message: string) => allowed_warnings.includes(message),
});
