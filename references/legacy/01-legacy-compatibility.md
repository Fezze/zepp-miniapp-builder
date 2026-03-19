# Legacy Compatibility

## When to use this file

Load this when the effective runtime API level is below `4.0`.

## Core rule

Assume `4.0+` features are unavailable unless the project deliberately raises the runtime target.

## Safe default posture

- use older widget accessors such as `getProperty` and `setProperty`
- prefer fixed-coordinate widget layout over `VIRTUAL_CONTAINER`
- avoid `SMART_KEYBOARD`, `openInspector`, `getPerformance`, and `createSysTimer`
- verify every API page against the project's target API level

## Legacy-friendly implementation strategy

1. inspect `app.json`
2. identify current runtime API level
3. list any desired features that appear to require `4.0+`
4. replace them with older patterns or propose a compatibility bump
5. keep the change set explicit about what was chosen and why

## When to recommend upgrading

Recommend a runtime upgrade when:

- the requested UX depends on a `4.0+` feature
- the app would become much simpler or safer with v4 APIs
- the target device fleet allows it

When recommending an upgrade, say so explicitly instead of silently using a newer API.

## Official references

- API_LEVEL Compatibility: https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/
- API version selection: https://docs.zepp.com/docs/v2/guides/version-info/version-choose/
- Mini Program Configuration: https://docs.zepp.com/docs/reference/app-json/
