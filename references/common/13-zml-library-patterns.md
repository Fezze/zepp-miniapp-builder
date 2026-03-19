# ZML Library Patterns

## When to use this file

Load this file when:

- the repo imports `@zeppos/zml/*`
- code wraps entrypoints with `BaseApp`, `BasePage`, or `BaseSideService`
- the user asks about `httpRequest`, `request`, `call`, `onRequest`, or `onCall`
- the project structure looks ZML-based rather than raw `messaging.peerSocket` or older MessageBuilder usage

## Version floor

- ZML docs describe the library as `API_LEVEL 3.0+`.
- The current documented requirement for `zml 0.0.28` is `API_LEVEL 3.6+`.
- For new work, treat `3.6` as the safe minimum unless the repo pins an older ZML version and the codebase already proves lower-level compatibility.
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

## High-value capabilities

- `httpRequest(...)` for network requests from wrapped app, page, or side-service contexts
- `request(...)` for message flows that expect a reply
- `call(...)` for one-way message flows
- `onRequest(req, res)` for handling reply-required requests
- `onCall(req)` for handling fire-and-forget messages
- logging helpers such as `log`, `debug`, and `error` commonly appear on wrapped instances

## Architecture guidance

- Use ZML when device-phone messaging, phone-assisted networking, file transfer, or reusable communication helpers are central to the app.
- Keep Side Service responsible for phone-side work. ZML does not change the rule that Settings App should flow through storage and Side Service rather than talk directly to the Device App.
- If a repo already uses plain `messaging.peerSocket` successfully, do not force a migration to ZML unless the user asks for it.
- ZML does not relax native Zepp API limits. Keep version-gating `@zos/*`, `hmUI`, sensor, widget, and App Service behavior exactly as usual.

## Common code shape in ZML repos

- page modules are often split into `*.page.js`, `*.layout.js`, and `*.style.js`
- size-specific layout files such as `*.s.layout.js`, `*.r.layout.js`, and `*.b.layout.js` are common
- `zosLoader:./index.[pf].layout.js` is a common import pattern for layout selection
- transport helpers often live on `this`, while rendering stays delegated to a `layout.render(this)` style function

## Safe recommendations

- Confirm the installed `@zeppos/zml` version before promising support below `API_LEVEL 3.6`.
- Assume `app-side/` participation is required when a ZML flow depends on phone communication.
- Prefer the built-in base wrappers first; mention plugin extensions only if the existing repo is already using them.
