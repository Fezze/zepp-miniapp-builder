# Vendor Library Confidence Matrix

Use this file when deciding whether to inspect, keep, migrate, or propose Zepp-adjacent npm packages.

Never introduce a community package into an app unless the user explicitly accepts it or the repo already depends on it.

| Library | Source type | Last verified | Minimum API level | Confidence | Notes |
|---|---|---:|---|---|---|
| `@zeppos/zml` | Official Zepp npm package | 2026-04-26 | `3.0+`; verify installed package version before promising `< 3.6` behavior | High | Official Zepp package, but still verify local typings, bundled source, and repo-pinned version before proposing migrations. |
| `@silver-zepp/easy-storage` | Community / third-party package | 2026-04-26 | verify package docs and local installed version | Medium | Filesystem wrapper over `@zos/fs`; safe to inspect when already installed, but do not add without explicit user approval. |
| `@silver-zepp/vis-log` | Community / third-party package | 2026-04-26 | verify package docs and local installed version | Medium | Debug overlay and relay helper, not an official Zepp logging surface. Treat device-layout behavior as real-device-sensitive. |
| `@silver-zepp/easy-ble` | Community / third-party package | 2026-04-26 | verify package docs and local installed version | Medium | Wrapper over watch-side BLE master APIs; callback and queue behavior can drift with package version or Zepp backend behavior. |
| `@silver-zepp/polyglot` | Community / third-party package | 2026-04-26 | verify package docs and local installed version | Medium | Runtime plus CLI localization layer; generated assets, local storage usage, and tooling behavior must be checked locally. |
| `@silver-zepp/easy-media` | Community / third-party package | 2026-04-26 | verify package docs and local installed version | Low to medium | Playback wrapper is better verified than recording; recorder behavior and device support still require local and real-device validation. |

## Required rules

- Read this matrix before proposing installation, migration, or new dependency usage for `@zeppos/zml` or any `@silver-zepp/*` package.
- If the repo already depends on one of these packages, it is safe to inspect the installed version and use that local evidence.
- If the repo does not already depend on one of these packages, do not add it without explicit user approval.
- Always verify installed package version, local typings, local docs, and bundled source files when they are available.
- Treat community-package behavior as lower-confidence than official Zepp platform APIs, and mark uncertainty explicitly as `verify locally`, `requires real-device validation`, `community package behavior`, or `source-level API drift possible` when needed.