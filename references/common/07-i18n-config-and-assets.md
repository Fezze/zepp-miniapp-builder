# I18n, Config, and Assets

## Device and settings text

- Use `getText` from `@zos/i18n` for device-side/widget i18n in modern Zepp projects.
- Keep translatable strings in language resources where practical.
- Prefer English as the design fallback when no language match is available.
- If the repo uses `@silver-zepp/polyglot`, load `17-polyglot-library-patterns` instead of treating it like plain static `@zos/i18n`; Polyglot adds a generated-assets workflow, runtime switching, and its own storage-backed language state.

## `app.json` i18n

Review:

- `i18n`
- `defaultLanguage`

Locale keys must match the documented language mapping for Zepp mini-program configuration.

## Locale guidance

- use documented locale codes exactly
- do not invent variants
- note that the documented mapping still uses `iw-IL` for Hebrew

## Asset guidance

- keep app names localized in `app.json`
- keep static assets in `assets/`
- when a repo uses Polyglot, generated runtime translations normally live under `assets/raw/polyglot/translations/`
- validate icon files against the Zepp icon design spec
- use frame-sequence assets with `IMG_ANIM` for GIF-like animation

## Icon guidance

For v3+ app icon design, the official spec describes:

- circular final asset
- `248x248` final size
- transparent safe area inside the circular icon bounds

## Design guidance

- default font and language fallback choices should not assume one locale
- localize punctuation, units, and capitalization patterns where relevant

## Official references

- I18n best practice: https://docs.zepp.com/docs/guides/best-practice/i18n/
- `getText`: https://docs.zepp.com/docs/reference/device-app-api/newAPI/i18n/getText/
- Migration guide: https://docs.zepp.com/docs/v2/guides/version-info/migration-guide/
- Multilingual Mapping: https://docs.zepp.com/docs/v2/reference/related-resources/language-list/
- Languages design guide: https://docs.zepp.com/docs/designs/internationalization/languages/
- App icon design spec: https://docs.zepp.com/docs/designs/visual/icons/
- App icon FAQ: https://docs.zepp.com/docs/guides/faq/icon-faq/
- IMG_ANIM: https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/
