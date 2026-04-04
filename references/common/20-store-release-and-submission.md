# Store Release and Submission

## When to use

Use this reference when the task is about:

- publishing a Zepp app to the store
- preparing a release checklist
- checking what is missing before first submission
- mapping a repo to Zepp Console submission fields
- preparing store icon, screenshots, privacy text, or release metadata

## Core submission workflow

From the official Zepp submission flow:

1. Register the app in Zepp Console.
2. Set the registered `appId` in `app.json`.
3. Build a fresh ZAB package.
4. Open the app release page in Zepp Console.
5. Fill the submission fields.
6. Submit for review.
7. If approved, use version upgrade for later releases.

Review time is documented as generally `1-5` working days.

## Fields to verify against the repo

Always compare the repo against the Zepp Console form:

- `appId`
- country or region
- service category when applicable
- app classification
- uploaded ZAB package
- supported devices detected from the package
- version
- languages
- app name, app profile, app details
- app introduction screenshots
- application icon used in the store
- privacy statement
- calling permissions
- whether the installation package includes SDK

## Repo-to-store checklist pattern

When auditing a repo for release readiness:

1. Read `app.json`.
2. Record `appId`, version, targets, permissions, locales, default language, vendor name, and description.
3. Check whether the repo already contains store-ready assets or only runtime assets.
4. Check whether the repo already contains privacy-policy text or only technical comments.
5. Produce a release checklist file inside the repo with:
   - items already satisfied
   - items clearly missing
   - inferred items that need human confirmation
6. Be explicit when a conclusion is an inference from the repo instead of a confirmed Console setting.

## Store assets

Documented requirements from the Zepp submission page:

- app introduction screenshots: `360x360 PNG`
- screenshot background: transparent, no fill
- screenshot content: app UI should be maximized in the image area
- provide `3` or more screenshots
- store icon: `240x240 PNG`
- store icon background: transparent

Important distinction:

- runtime app icons in `app.json` and `assets/<target>/icon.png` are not automatically the same thing as the store-upload icon
- browser-preview or simulator screenshots are good review artifacts, but they are not store assets unless they are exported to the documented `360x360 transparent` format
- round-device store screenshots should fill the `360x360` square with no margins
- rectangular-device store screenshots should keep equal left and right margins with no top or bottom margin
- if only a tested subset of devices should appear in Zepp Console, prefer explicit `deviceSource` targets over broad class-style targets

## Privacy and permissions

The Zepp submission flow requires a privacy statement text.

Practical rule:

- compare the privacy text against the actual repo behavior, not only against intended behavior
- explain how the app collects, uses, stores, and shares user data or device data
- if the app is device-local only, state that clearly
- keep the selected Console permissions aligned with `app.json`

For a release audit, map each manifest permission to a human-readable explanation.

Practical submission-pack pattern:

- keep a stable repo-root `submission/` folder with the latest release-ready materials for that one app
- include copy-ready form text, structured JSON, localized listing text, localized privacy text, store icon, screenshot manifest, and the current release ZAB
- refresh `submission/artifacts/` when release scope changes, but do not assume the repo wants store screenshots or icons regenerated on every normal dev task

## SDK disclosure

The Zepp Console asks whether the installation package includes SDK.

Practical rule:

- do not answer from package manager metadata alone
- answer from what is actually bundled or intentionally shipped in the app package
- if SDK is included, record its name and purpose

## Service category caveat

The English Zepp submission page documents the main release fields.

The Chinese submission page currently documents additional service-category attachment rules such as:

- normal: no attachment
- medical
- insurance
- general goods sales
- food, drug, health-product, and medical-device sales

Only use these regulated-category rules when the app actually falls into one of those categories.

## Recommended output for release-readiness tasks

Prefer output that includes:

- detected app profile and version
- current release blockers
- missing store assets
- missing legal or privacy text
- missing hardware-validation evidence
- direct mapping from repo facts to Console fields
- a clear next action list in submission order

## Official references

- App submission: https://docs.zepp.com/docs/distribute/
- App submission (Chinese page with service categories): https://docs.zepp.com/zh-cn/docs/distribute/
- App icon design spec: https://docs.zepp.com/docs/designs/visual/icons/
- Mini Program Configuration: https://docs.zepp.com/docs/reference/app-json/
