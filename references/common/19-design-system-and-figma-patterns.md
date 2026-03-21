# Design System and Figma Patterns

## When to load this file

Load this file when a Zepp task involves:

- official Zepp Figma libraries or Zepp design-template links
- design handoff from Zepp OS component libraries into code
- widget or shortcut-card styling reviews
- icon export, font choice, safe-area, or contrast questions
- checking whether a UI follows Zepp system patterns instead of ad hoc mockups

## Official design resources

Use the official Zepp design downloads page as the entry point for:

- circular-screen component library
- rectangular-screen component library
- icon library
- widget templates
- shortcut-card templates
- official font downloads such as `Noto Sans` and `Zepp OS Number`

Direct official Figma resources currently linked from Zepp docs:

- Circular library: https://www.figma.com/community/file/1281820938249055059/Zepp-OS-3.0-Library-Circular
- Rectangular library: https://www.figma.com/community/file/1281826684139757402/Zepp-OS-3.0-Library-Rectangular
- Icon library: https://www.figma.com/community/file/1326839111646627664/icon-library-zepp-os
- Widget templates: https://www.figma.com/community/file/1372844899307211702
- Shortcut Cards templates: https://www.figma.com/community/file/1372844485569677237

## Routing the right template

- Choose the circular library for round-screen targets and the rectangular library for square or rectangular targets.
- Reconcile the Figma frame with real runtime data from `app.json`, the device list, and `getDeviceInfo()` before locking coordinates.
- If a repo supports multiple target shapes, compare both official libraries before committing to one set of spacing or icon assumptions.
- Treat Figma as a design-system starting point, not as permission to ignore runtime constraints for widgets, cards, gesture limits, or text overflow.

## Design-to-code guardrails

- Keep text separate from images; do not bake localized copy into PNG assets unless the asset is inherently graphical.
- Leave a `2px` safe margin around the central area and keep important information out of the top and bottom reserved display areas.
- Prefer component-library colors and font sizes when the UI is meant to feel system-native.
- Verify text contrast using accessibility guidance: aim for `4.5:1` for normal text and `3:1` for large text, and do not rely on color alone to convey required status.
- Use the design self-checklist as a review tool instead of arguing from taste alone.

## Widget patterns

- Widgets should stay single-purpose and glanceable rather than reproduce a full app page.
- Widget content should fit within one screen height; do not design around vertical scrolling or notification/control-center pulls.
- Widget tap behavior should be explicit: either click through into the main app or complete a direct quick action without opening the app.
- For blank, no-data, or loading states, prefer the documented icon-plus-text patterns; use `--` as the empty-data placeholder where that state is expected.
- Preview images must match screen resolution, and square-screen previews need rounded corners for edit mode.

## Shortcut-card patterns

- Shortcut cards should focus on core information or quick actions, not secondary flows or marketing content.
- The default card background should usually stay on the system color `color_sys_item_bg` unless a custom background carries meaningful context.
- Keep shortcut-card content within one screen, avoid heights below `120px`, and preserve a `16px` internal safety margin.
- When text is too long, tighten the copy first; then use ellipsis or scrolling only where the scenario still requires full text visibility.
- Use the official card templates to choose the right content-layout family instead of inventing arbitrary mixed layouts.

## Localization and layout checks

- Design from the English fallback first and reserve enough space for longer English, Russian, or German strings.
- Choose overflow behavior deliberately per surface: ellipsis, scrolling, limited wrapping, or full wrapping.
- Mirror directional controls and icons for RTL layouts, but do not mirror digits or untranslated text.
- Localize punctuation and units, and avoid italics or underlines for ordinary UI text.

## Review checklist

When reviewing a Zepp UI against the official design system, check:

- right-swipe return is still preserved
- list spacing and right-side control placement stay consistent with system patterns
- card and widget safe margins are preserved
- important text is still readable after localization expansion
- icon exports keep their transparent safe area and correct PNG output shape

## Official references

- Design specifications index: https://docs.zepp.com/docs/designs/
- Resource downloads: https://docs.zepp.com/docs/designs/download/
- Designer's self-checklist: https://docs.zepp.com/docs/designs/self-checklist/
- Safe area: https://docs.zepp.com/docs/designs/specifications/safe-area/
- Contrast ratio: https://docs.zepp.com/docs/designs/accessibility/contrast-ratio/
- Interface layouts: https://docs.zepp.com/docs/designs/internationalization/interface-layouts/
- Languages design guide: https://docs.zepp.com/docs/designs/internationalization/languages/
- Widget design guide: https://docs.zepp.com/docs/designs/customization/widget/
- Shortcut Cards design guide: https://docs.zepp.com/docs/designs/customization/shortcut-cards/
- App icon design spec: https://docs.zepp.com/docs/designs/visual/icons/
