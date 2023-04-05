# eslint-plugin-driveway

Driveway Recommended Lints

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-driveway`:

```sh
npm install eslint-plugin-driveway --save-dev
```

## Usage

Add `driveway` to the plugins section of your `.eslintrc` configuration
file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["driveway"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "driveway/custom-use-feature": "error",
    "driveway/react-fc": "warn"
  }
}
```

## Supported Rules

- `custom-use-feature`: Enforces the usage of the global `hooks/useFeature` hook
  over the one provided from the Optimizely ReactSDK which allows for setting a
  local cookie starting with `TesterEnabled_` to control a given feature flag as
  being enabled or not.
