# Version Routing

## Why this comes first

Zepp tasks are version-sensitive. Choose the compatibility profile before deciding on widgets, timers, layout systems, or debugging APIs.

## Required detection flow

1. Open `app.json`.
2. Read `configVersion`.
3. Read `runtime.apiVersion.target`.
4. If `target` is missing, fall back to `runtime.apiVersion.compatible`.
5. If that is missing, fall back to `runtime.apiVersion.minVersion`.
6. Parse the chosen version numerically as `major.minor`.

If the repo clearly uses `hmUI`, `hmApp`, `hmBle`, or other `1.0` globals, treat it as a legacy codebase even before proposing `@zos/*` rewrites.

## Compatibility profiles

### `legacy`

Use when the effective API level is below `4.0`.

- Avoid features marked `API_LEVEL 4.0+`.
- Prefer the older widget access pattern using `getProperty` and `setProperty`.
- Inside `legacy`, distinguish `1.0`, `2.x`, and `3.x` before choosing APIs.
- Do not assume Flex layout, `VIRTUAL_CONTAINER`, system keyboard support through `createKeyboard()`, `openInspector`, `getPerformance`, or `createSysTimer`.
- Load:
  - [legacy/01-legacy-compatibility.md](legacy/01-legacy-compatibility.md)
  - [legacy/02-migration-notes.md](legacy/02-migration-notes.md)

### `v4`

Use when the effective API level is `4.x`.

- `4.0` is the default safe baseline.
- You may use features explicitly marked `API_LEVEL 4.0+`.
- For `4.1`, `4.2`, and later `4.x`, confirm page-level support before using newer additions.

### `forward`

Use when the effective API level major version is above `4`.

- Treat `4.x` as the safe baseline.
- Confirm each newer capability in official docs before using it.
- Do not assume that a `v3+` doc page means the feature works for every runtime version.

## Critical distinction

- `configVersion` describes the manifest/config schema.
- `runtime.apiVersion` describes the runtime/API compatibility level.

This means a valid Zepp mini-app can use:

```json
{
  "configVersion": "v3",
  "runtime": {
    "apiVersion": {
      "target": "4.0"
    }
  }
}
```

Do not treat `configVersion` as the runtime version.

## What to say in your answer

When you start helping on a Zepp task, explicitly state:

- detected `configVersion`
- detected effective API level
- selected profile: `legacy`, `v4`, or `forward`
- if `legacy`, the narrower sub-range: `1.0`, `2.x`, or `3.x`
- any feature you plan to use that needs `4.0+` or newer

## Official references

- Mini Program Configuration: https://docs.zepp.com/docs/reference/app-json/
- API_LEVEL Compatibility: https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/
- API_LEVEL 4.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-40/
- API_LEVEL 4.2 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-42/
