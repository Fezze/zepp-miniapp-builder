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

## Optional live design access

If the environment offers a design connector, MCP server, or similar live design-inspection path, it is worth using for design-specific tasks.

Use a live connector when:

- the user provides a design URL or a copied link to a specific selection
- the task depends on a concrete page, component, or node rather than general Zepp design rules
- you need to verify whether a Figma file adds details that are not yet captured in the skill

Keep this generic:

- suggest connecting a live design source when it would materially improve accuracy
- do not teach one exact MCP or connector setup inside the skill, because that integration can change over time
- prefer asking for a specific page or node link instead of browsing an entire library blindly

If no live connector is available, fall back to:

- the rules already stored in this skill
- official Zepp design docs
- exported screenshots
- copied measurements or text from the user

## Routing the right template

- Choose the circular library for round-screen targets and the rectangular library for square or rectangular targets.
- Reconcile the Figma frame with real runtime data from `app.json`, the device list, and `getDeviceInfo()` before locking coordinates.
- If a repo supports multiple target shapes, compare both official libraries before committing to one set of spacing or icon assumptions.
- Treat Figma as a design-system starting point, not as permission to ignore runtime constraints for widgets, cards, gesture limits, or text overflow.

## Design handoff workflow

Use this order when turning Zepp design input into implementation guidance:

1. Start from the target surface:
   - page
   - settings page
   - widget
   - shortcut card
   - picker, slider, keypad, or other system-tool control
2. Confirm the target screen shape and supported devices.
3. If a live design connector is available, inspect the exact page or node the user cares about.
4. Extract the nearest official component family, spacing rhythm, text-overflow behavior, and trailing affordance type.
5. Map the design to Zepp runtime constructs such as widgets, list rows, title shells, and state blocks.
6. Record assumptions whenever the design source is partial, screenshot-only, or not accessible live.

## Circular library patterns observed in Figma

The official circular library's `Library Overview` page exposes a useful component vocabulary for list-heavy and settings-like Zepp pages.

Common families include:

- `List/source/Title`
- `List/source/Footer`
- `List/source/Usually`
- `List/source/Text`
- `List/source/Switch`
- `List/source/Subtitle`
- `Title/Icon_Next`
- `Title/Switch`
- `Title/Checkbox`
- `Title/Radiobtn`
- `Multiline/Icon`
- `Multiline/Next`
- `Multiline/Switch`
- `Multiline/Checkbox`
- `Multiline/Radiobtn`
- `Multiline/right_text`

Use these families as a routing hint:

- `Title/*` patterns are the starting point for compact single-line rows.
- `Multiline/*` patterns are the safer default when subtitle text, richer labels, or right-side state text makes a compact row too tight.
- `List/source/Title` and `List/source/Footer` act as shell blocks around list groups and settings sections rather than ordinary rows.
- `Next`, `Switch`, `Checkbox`, `Radiobtn`, `Drag`, and `right_text` are recurring right-side affordance types; prefer one of these system-like row shapes before inventing a custom trailing control layout.

## Circular list rhythm

The official circular library also shows repeatable sizing rhythm for list-like pages:

- compact single-line rows commonly sit around `104px`
- multiline rows commonly sit around `121px`
- title or footer shells commonly sit around `184px`
- stacked list items often use an `8px` gap between rows

Treat these values as good starting points for circular layouts, not as universal constants. Adjust only when the content, device shape, or component family clearly requires it.

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

## System-tool controls

The circular library does not only cover plain rows. It also provides recurring system-style families for:

- loading states
- regular page title bars
- list page title bars
- circular buttons
- sliders and continuous sliders
- digit selectors and combination selectors
- keypad-like controls such as unlock, dial, and calculator screens

If a Zepp task resembles one of these surfaces, prefer matching the existing library family instead of building a bespoke circular control from scratch.

## Review checklist

When reviewing a Zepp UI against the official design system, check:

- right-swipe return is still preserved
- list spacing and right-side control placement stay consistent with system patterns
- row family choice matches the content density: compact `Title/*` versus richer `Multiline/*`
- card and widget safe margins are preserved
- important text is still readable after localization expansion
- icon exports keep their transparent safe area and correct PNG output shape
- assumptions are clearly stated if the work was based on screenshots or stored guidance rather than live design access

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
