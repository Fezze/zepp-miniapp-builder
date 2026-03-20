# Polyglot Library Patterns

## When to use this file

Load this file when:

- the repo imports `@silver-zepp/polyglot`
- the project contains a `polyglot/` folder with `translations.xlsx`, backups, or generated translation assets
- code creates `new Polyglot()` or calls `poly init`, `poly gen`, or `poly parse`
- the user wants runtime language switching, generated translation JSON assets, or migration from older `.po`-based `i18n`

## Source trust order

- Use `polyglot-mini/ts/polyglot.d.ts` for the public runtime API.
- Use `polyglot-mini/dist/polyglot.src.js` for actual runtime behavior, storage use, fallback logic, and UI caveats.
- Use `polyglot-node/poly.js` and `polygenerator.js` for the CLI workflow and generated-asset contract.
- Use example apps to confirm what works on `page`, `SecondaryWidget`, and `AppWidget` surfaces.
- Use the README for onboarding and intended workflow, but correct it when the examples drift from the actual runtime API.

## Version and workflow reality

- The runtime library source marks itself as `@min_zeppos 2.0`.
- Example apps run on `2.0+`; one uses `configVersion: "v3"` with a `3.0` target while another stays on `v2` and `2.0`.
- `polyglot` is both a global CLI workflow and a watch runtime library.
- The normal workflow is:
  1. install the global package
  2. run `poly init` in the mini-app root
  3. edit `polyglot/translations.xlsx`
  4. run `poly gen`
  5. use `new Polyglot()` at runtime
- A repo may only need the runtime part if the generated assets already exist and no one is changing translations.

## Runtime requirements

- Runtime translation assets are expected under `assets/raw/polyglot/translations/*.json`.
- The language switcher icons are expected under `assets/raw/polyglot/poly-selector.png` and `poly-selector-press.png`.
- `device:os.local_storage` is effectively required because Polyglot persists language and cache metadata in `poly_config.json`.
- `data:os.device.info` appears in examples because the library adapts icon placement to screen data.
- `Polyglot` is page-friendly and can also supply texts to `SecondaryWidget` and `AppWidget` code.
- The README explicitly says App Side translations are not supported.

## What Polyglot changes

- Polyglot is not a replacement for Zepp app architecture; it is a generated-assets plus runtime-localization layer.
- It adds runtime language switching, language detection, related-language fallback, a built-in picker UI, and a CLI for generating translation JSON files from `translations.xlsx`.
- It does not replace official `app.json` `i18n` metadata; app names and baseline manifest localization still belong in normal Zepp configuration.
- It is stronger than plain `@zos/i18n` when the repo needs live language switching or a generated translation workflow across many locales.

## Public runtime API

### Main methods

- `getText`, `getAllTexts`
- `getLanguage`, `setLanguage`
- `getSupportedLanguages`, `isLanguageSupported`
- `getRelatedLangCode`, `getLangDisplayName`, `getSysLangName`, `getSysLangCode`
- `getAvailableTranslationsForKey`
- `onLanguageChange`

### Bubble and picker helpers

- `showPolyBubble(options?)`
- `hidePolyBubble()`
- `showLangPicker(options?)`
- `getIconResolution()`
- `setIconPath(...)`

## Runtime behavior and guardrails

- On startup, Polyglot scans available translation files, caches the language list, and remembers the selected language in local storage.
- It reacts to system-language changes and can fall back to a related language such as `zh-CN` <-> `zh-TW` or `pt-PT` <-> `pt-BR`.
- `setLanguage(language, false)` updates texts in memory and notifies subscribers through `onLanguageChange(...)`.
- `setLanguage(language, true)` restarts the app by routing to the first page, which is useful when the app is easier to rebuild than to patch live.
- Missing keys return a visible `"key" not found` style fallback, not an empty string.
- The runtime includes a fallback path for older asset-loading issues by reading `raw/polyglot/...` assets directly when `assets://` listing fails.

## Bubble and surface caveats

- The language switcher bubble should be drawn after the rest of the page UI or it may end up hidden behind other widgets.
- The built-in bubble and picker are page UI features; widget surfaces usually consume translated text but do not host the same interactive picker pattern.
- `showLangPicker()` uses gesture interception for right-swipe exit and cleans up that gesture handler on close.
- The README shows `poly.showPolyBubble("top-right")`, but the runtime API actually expects an options object such as `{ location: "top-right" }`.
- `setIconPath(...)` exists in the public API, but the current runtime still hardcodes the default `raw/polyglot/poly-selector*.png` sources when drawing the bubble, so custom icon-path guidance should be treated cautiously unless the repo proves it works.

## CLI and generation workflow

- `poly init` creates `polyglot/translations.xlsx`, injects `@silver-zepp/polyglot` into project dependencies, and copies the runtime files into the local project module path.
- `poly gen` backs up `translations.xlsx`, optionally auto-translates empty cells, and regenerates JSON files under `assets/raw/polyglot/translations`.
- `poly gen` also generates the selector icon pair when enabled in the spreadsheet settings.
- `poly parse` converts older `.po` files from a page `i18n/` folder into an Excel workbook to help with migration.
- Filled translation cells are intentionally preserved; auto-generation does not overwrite them unless the cells are empty.

## Source-level cautions

- Version signals are inconsistent across the package, runtime source header, and internal `POLY_VERSION` constant; trust behavior more than the version strings.
- The CLI comments say it injects `devDependencies`, but it actually writes to `dependencies`.
- `poly parse` assumes a specific project shape based on the first target page folder; treat it as a migration helper, not as a universal parser for every repo layout.
- Auto-translation depends on Google services or API access; it is a tooling convenience, not a guaranteed offline workflow.

## Safe recommendations

- Use Polyglot when the repo already depends on it or when the user explicitly wants runtime language switching and a generated translation pipeline.
- If a repo already uses official Zepp `i18n` cleanly and does not need live switching, do not force a migration to Polyglot.
- Keep App Side out of Polyglot guidance unless the repo has its own custom transport, because the library itself does not support App Side translations.
- For page UIs, prefer `onLanguageChange(...)` when widgets can be updated in place and `restart_app: true` when the screen is expensive to patch correctly.
- For widgets and cards, treat Polyglot mainly as a text source, not as a place to add the page-style language bubble UI.
