# ZML Library Patterns

## When to use this file

Load this file when:

- the repo imports `@zeppos/zml/*`
- code wraps entrypoints with `BaseApp`, `BasePage`, or `BaseSideService`
- the user asks about `httpRequest`, `request`, `call`, `onRequest`, or `onCall`
- the project structure looks ZML-based rather than raw `messaging.peerSocket` or older MessageBuilder usage

## Source trust order

- The English and Chinese doc sets mirror each other; the Chinese files are useful, but they do not reveal a separate API surface.
- `plugin.md` is effectively a stub and should not be treated as authoritative documentation.
- Some version notes in markdown lag the actual package version.
- For precise ZML guidance, trust sources in this order:
  1. installed package version and `zml.d.ts`
  2. core implementation under `src/core/`
  3. working examples under `examples/`
  4. markdown docs for onboarding context and terminology

## Version and manifest reality

- ZML docs describe the library as `API_LEVEL 3.0+`.
- The repo package is currently `@zeppos/zml 0.0.41`, but the README and known-issues files still mention `zml 0.0.28` when warning about `API_LEVEL 3.6+`.
- Samples consistently set `runtime.apiVersion.minVersion` to `3.0`, but some still leave `target` or `compatible` at `1.0`; do not copy that manifest pattern as authoritative.
- Treat ZML as a `3.x`-era library even when sample manifests contain older-looking `target` values.
- For new work, prefer `3.6+` as the conservative default unless the repo pins an older ZML version and the codebase already proves lower `3.x` compatibility.
- Do not recommend ZML for `1.0` or `2.x` targets.

## What ZML changes

ZML wraps normal Zepp constructors instead of replacing Zepp app architecture.

- `App(BaseApp({...}))`
- `Page(BasePage({...}))`
- `AppSideService(BaseSideService({...}))`

Keep normal Zepp rules in place:

- `app.json`, `targets`, and page or service registration still control what runs.
- Standard lifecycle hooks such as `onCreate`, `onInit`, `build`, `onRun`, and `onDestroy` still define behavior.
- ZML is a helper layer over Zepp runtime surfaces, not a browser-style framework and not a substitute for `@zos/*` or `hmUI`.
- ZML composes plugins and mixins around those lifecycles; setup hooks run before the user hook, while teardown hooks run after the user hook in reverse mixin order.

## Public API by surface

### `BasePage`

- Safe-to-assume helpers from typings and source: `request`, `call`, `httpRequest`, `sendFile`
- Safe-to-assume callbacks: `onRequest`, `onCall`, `onReceivedFile`
- Typical usage: watch UI plus messaging or phone-assisted network/file flows

### `BaseSideService`

- Typing-backed helpers: `request`, `call`, `fetch`, `download`, `sendFile`
- Safe-to-assume callbacks: `onRequest`, `onCall`, `onSettingsChange`, `onReceivedFile`
- Source-backed extras: `convert(...)` is injected by the built-in convert plugin, `this.settings` is wired to `settingsStorage`, and `settingsLib` / `convertLib` are exported from `@zeppos/zml/base-side`
- Important correction: side service does not expose `httpRequest(...)` as the primary primitive; use `fetch(...)` or `download(...)`

### `BaseApp`

- Source wires messaging helpers into the app instance, but the published typings do not model the same helper surface cleanly
- Prefer page or side-service usage when writing new guidance unless the repo already uses app-level `request`, `call`, or `httpRequest` successfully

## Transport model

- `request(...)` is the reply-expected transport.
- `call(...)` is the one-way transport.
- On the device side, `httpRequest(...)` is implemented as `request({ method: 'http.request', ... })`.
- The side-service messaging plugin handles `http.request` by calling `fetch(...)` and returning the response payload.
- Practical consequence: device `httpRequest(...)` depends on the Side Service path being present and running; it is not a purely local watch-network primitive.
- Logging helpers such as `log`, `debug`, and `error` commonly appear on wrapped instances.

## Built-in plugin capabilities

- Messaging is auto-wired on device and side-service wrappers.
- Settings integration is auto-wired on Side Service through `this.settings` and `onSettingsChange(...)`.
- File transfer is auto-wired on both device and side through `sendFile(...)` and `onReceivedFile(...)`.
- Side Service also gets `download(...)` and `convert(...)` helpers through built-in plugins.
- Custom plugin extension exists through `BaseApp.use(...)`, `BasePage.use(...)`, and `BaseSideService.use(...)`, but the markdown docs barely document it, so prefer source inspection before recommending custom plugins.

## Architecture guidance

- Use ZML when device-phone messaging, phone-assisted networking, file transfer, or reusable communication helpers are central to the app.
- Keep Side Service responsible for phone-side work. ZML does not change the rule that Settings App should flow through storage and Side Service rather than talk directly to the Device App.
- If a repo already uses plain `messaging.peerSocket` successfully, do not force a migration to ZML unless the user asks for it.
- ZML does not relax native Zepp API limits. Keep version-gating `@zos/*`, `hmUI`, sensor, widget, and App Service behavior exactly as usual.
- When the docs and typings disagree, prefer the typings for the public method list and the source for behavior details.

## Sample-derived patterns

- page modules are often split into `*.page.js`, `*.layout.js`, and `*.style.js`
- size-specific layout files such as `*.s.layout.js`, `*.r.layout.js`, and `*.b.layout.js` are common
- `zosLoader:./index.[pf].layout.js` is a common import pattern for layout selection
- transport helpers often live on `this`, while rendering stays delegated to a `layout.render(this)` style function
- advanced side-service examples compose feature modules with object spread into `BaseSideService({...})`
- `helloworld2` demonstrates reply and notify flows between page and side service
- `helloworld3` demonstrates side-driven fetch, download, convert, and file-transfer workflows plus settings-triggered actions
- `syncData` demonstrates sensor collection on the watch with uploads triggered through the ZML transport layer

## Safe recommendations

- Confirm the installed `@zeppos/zml` version before promising support below `API_LEVEL 3.6`.
- Do not describe `plugin.md` as complete documentation; it is currently just a heading-level stub.
- Assume `app-side/` participation is required when a ZML flow depends on phone communication.
- Prefer the built-in base wrappers first; mention plugin extensions only if the existing repo is already using them.
- Do not recommend copying the sample manifest values blindly; normalize real project `runtime.apiVersion` fields to the validated floor you actually need.
