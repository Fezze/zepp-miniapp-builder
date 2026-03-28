# I18n, Config, and Assets

## Device and settings text

- Use `getText` from `@zos/i18n` for device-side/widget i18n in modern Zepp projects.
- Keep translatable strings in language resources where practical.
- Prefer English as the design fallback when no language match is available.
- If the repo uses `@silver-zepp/polyglot`, load `17-polyglot-library-patterns` instead of treating it like plain static `@zos/i18n`; Polyglot adds a generated-assets workflow, runtime switching, and its own storage-backed language state.
- If the task starts from official Zepp Figma libraries, widget templates, or design-export constraints, also load `19-design-system-and-figma-patterns`.

## `app.json` i18n

Review:

- `i18n`
- `defaultLanguage`

Locale keys must match the documented language mapping for Zepp mini-program configuration.

## Locale guidance

- use documented locale codes exactly
- do not invent variants
- note that the documented mapping still uses `iw-IL` for Hebrew

## Localization architecture pattern

- keep browser-safe or Node-safe phone locale helpers separate from Zepp-only watch locale helpers
- if shared storage, seed, or normalization helpers must run in Node tests or a browser harness, do not let them import Zepp-only locale modules transitively
- for localized starter content, prefer separate per-locale modules plus a small composition layer instead of one giant multi-language seed file
- if starter content is localized on the phone side, persist the chosen starter-content locale in sync metadata so later additive seed migrations stay consistent for existing installs

## Asset guidance

- keep app names localized in `app.json`
- keep static assets in `assets/`
- when a repo uses Polyglot, generated runtime translations normally live under `assets/raw/polyglot/translations/`
- validate icon files against the Zepp icon design spec
- for small closed catalogs rendered on watch, explicit per-item image assets can be simpler and more maintainable than switching on ids deep in UI code
- keep localized text layered separately from exported images instead of baking copy into PNG assets
- when the design depends on official Zepp font assets, prefer the resources linked from the design downloads page over arbitrary desktop substitutions
- use frame-sequence assets with `IMG_ANIM` for GIF-like animation

## Icon guidance

For v3+ app icon design, the official spec describes:

- circular final asset
- `248x248` final size
- transparent safe area inside the circular icon bounds

## Design guidance

- default font and language fallback choices should not assume one locale
- localize punctuation, units, and capitalization patterns where relevant
- reserve enough space for longer localized strings and choose overflow handling deliberately: ellipsis, scrolling, limited wrapping, or full wrapping
- mirror directional icons and controls for RTL layouts, but do not mirror digits or untranslated text
- avoid italics and underlines in ordinary UI text
- check text contrast and avoid using color alone to communicate required status changes

## Official references

- I18n best practice: https://docs.zepp.com/docs/guides/best-practice/i18n/
- `getText`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/i18n/getText/
- Migration guide: https://docs.zepp.com/docs/v2/guides/version-info/migration-guide/
- Multilingual Mapping: https://docs.zepp.com/docs/v2/reference/related-resources/language-list/
- Design specifications index: https://docs.zepp.com/docs/designs/
- Resource downloads: https://docs.zepp.com/docs/designs/download/
- Interface layouts: https://docs.zepp.com/docs/designs/internationalization/interface-layouts/
- Languages design guide: https://docs.zepp.com/docs/designs/internationalization/languages/
- Contrast ratio: https://docs.zepp.com/docs/designs/accessibility/contrast-ratio/
- App icon design spec: https://docs.zepp.com/docs/designs/visual/icons/
- App icon FAQ: https://docs.zepp.com/docs/guides/faq/icon-faq/
- IMG_ANIM: https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/
