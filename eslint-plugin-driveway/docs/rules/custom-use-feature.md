# custom-use-feature

Enforces the usage of the global `hooks/useFeature` hook over the one provided
from the Optimizely ReactSDK which allows for setting a local cookie starting
with `TesterEnabled_` to control a given feature flag as being enabled or not.

## Rule Details

This rule aims to prevent developers from accidentally auto-importing the
incorrect hook, which would make it impossible for testers to override for local
testing.

Examples of **incorrect** code for this rule:

```js
import { useFeature } from "@optimizely/react-sdk";
```

Examples of **correct** code for this rule:

```js
import useFeature from "hooks/useFeature";
```

## When Not To Use It

The only reason not to use this rule is when used in the custom hook and unit
tests directly - as the custom hook depends directly on the one provided from
the SDK.
