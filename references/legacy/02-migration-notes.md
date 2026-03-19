# Legacy Migration Notes

## Purpose

Use this file when a repo is older than the desired target or when a user asks to migrate toward newer APIs.

## Important documented migration point

The Zepp migration guide for `1.0 -> 2.0` states that the main API upgrade scope is the Device App side, while Settings App and Side Service development remain largely unchanged in that migration path.

That makes migration planning easier:

- inspect Device App code first
- treat Settings App and Side Service as separate compatibility surfaces
- avoid assuming all surfaces need the same refactor depth

## Migration workflow

1. inspect `app.json` runtime target
2. identify which app surfaces actually use runtime-sensitive device APIs
3. list APIs or patterns that need migration
4. decide whether to keep compatibility or bump the runtime target
5. verify each replacement API against official docs

## Practical migration questions

- Is the project only using pre-v4 patterns and should it stay that way?
- Is the user explicitly asking for v4 features?
- Does the device fleet require support for older API levels?
- Is the requested change impossible without raising `runtime.apiVersion`?

## When moving toward `4.x`

- keep `configVersion` and runtime API version separate in your reasoning
- move one feature family at a time
- note each v4-only dependency explicitly

## Official references

- Migration from version 1.0: https://docs.zepp.com/docs/v2/guides/version-info/migration-guide/
- API version selection: https://docs.zepp.com/docs/v2/guides/version-info/version-choose/
- API_LEVEL Compatibility: https://docs.zepp.com/docs/v2/guides/framework/device/compatibility/
