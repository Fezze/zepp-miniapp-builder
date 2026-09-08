# UI Widget Catalog and Methods

## Use this file when

Use this file when the task needs detailed widget selection, widget-family comparison, or low-level `@zos/ui` method guidance beyond the higher-level notes in `04-ui-sensors-interactions`.

## Do not use this file when

- the task can be answered from high-level UI guidance alone in `04-ui-sensors-interactions`
- the main problem is app architecture, sync ownership, or store submission rather than widget choice
- the question is only about `4.x` Flex layout internals and is better handled in `v4/02-v4-ui-and-layout`

## Decision table

| Situation | Use this file? | Next file |
|---|---|---|
| Choosing between widget families or low-level UI methods | Yes | `04-ui-sensors-interactions` |
| `4.x` Flex layout or `SYSTEM_KEYBOARD` specifics | Yes | `v4/02-v4-ui-and-layout` |
| Workout Extension widget choice | Yes | `12-workout-extension` |
| Non-UI routing problem | No | task-specific core reference |

## Required checks

- Confirm the target API level before recommending `4.0+` widgets or layout utilities.
- Check surface restrictions before proposing widgets for `SecondaryWidget`, `AppWidget`, or Workout Extension flows.
- Validate text and asset sizing with `getTextLayout(...)` or `getImageInfo(...)` when layout fit is version- or locale-sensitive.

## Basic widgets

- `TEXT`: general text rendering, alignment, wrapping, scrolling overflow, custom fonts, and `text_i18n`.
- `IMG`: static images, optional scaling, rotation, and alpha-driven display states.
- `BUTTON`: direct tap actions with built-in button semantics.
- `FILL_RECT`: filled geometric blocks for separators, backgrounds, and lightweight motion.
- `STROKE_RECT`: outlined rectangles for framed states and borders.
- `CIRCLE`: simple circular geometry without dropping to canvas.
- `ARC`: curved progress or ring-style geometry for round-screen layouts.
- `IMG_ANIM`: frame-sequence animation; prefer it over assuming GIF playback.
- `QRCODE`: device-rendered QR output without custom canvas drawing.
- `DIALOG`: older built-in dialog surface, but the docs mark it as discontinued and recommend `createModal()` instead for new work.
- `HISTOGRAM`: bar-style charting when the UI is inherently data-visual rather than freeform.
- `GRADIENT_POLYLINE`: line-based charting or path drawing without going straight to `CANVAS`.
- `CANVAS`: imperative drawing path for custom graphics when widget primitives are not enough.
- `PAGE_INDICATOR`: page index dots for paged flows.
- `PAGE_SCROLLBAR`: page progress or page-position scrollbar affordance.
- `SPORT_DATA`: workout-specific widget; prefer it over generic text/image composition in Workout Extension surfaces.

## Form widgets

- `RADIO_GROUP`: single-choice selection; each option is built with `STATE_BUTTON`.
- `CHECKBOX_GROUP`: multi-choice style grouping built around `STATE_BUTTON` items.
- `SLIDE_SWITCH`: binary on/off state.
- `KEYBOARD`: older in-page keyboard widget, available from `3.0`.
- `PICKER`: general-purpose list or numeric picker with up to five columns.
- `PICK_DATE`: older date-picker path; after `3.6`, prefer `TIME_PICKER`.
- `TIME_PICKER`: full-screen date/time selection from `3.6+`.
- `SYSTEM_KEYBOARD`: `4.0+` system-level keyboard flow; detailed notes stay in `v4/02-v4-ui-and-layout`.

Key caveats:

- `RADIO_GROUP` and `CHECKBOX_GROUP` are not standalone visual controls; they rely on `STATE_BUTTON` child items.
- `PICK_DATE` is legacy-oriented once `TIME_PICKER` is available.
- Use `PICKER` when the UX is column-based selection rather than date/time semantics.

## Layout widgets

- `GROUP`: group widgets for unified show/hide and event registration. Child widgets use positions relative to the group. `GROUP` cannot be nested.
- `SCROLL_LIST`: list surface with sliding support and per-item image/text composition.
- `VIEW_CONTAINER`: general scrollable container when the page needs a scrollable widget tree rather than a list-specific control. Its `modal` option starts at `2.0`, defaults to enabled, and can block the base layer from scrolling when the container is used as an overlay/dialog.
- `CYCLE_LIST`: cyclic list-style layout when repeated looped selection is the core interaction.
- `CYCLE_IMAGE_TEXT_LIST`: cyclic list variant for image-plus-text list items.
- `VIRTUAL_CONTAINER`: `4.0+` Flex-layout container; keep detailed usage in `v4/02-v4-ui-and-layout`.

Surface restrictions:

- `SCROLL_LIST` and `VIEW_CONTAINER` are not allowed in widgets or shortcut cards.
- `GROUP` is not available in shortcut cards.
- Prefer `SCROLL_LIST` for list semantics and `VIEW_CONTAINER` for general scrollable composition.

## General UI methods

### Creation and cleanup

- `createWidget(...)`: create widget instances.
- `deleteWidget(...)`: remove dynamic widgets explicitly.
- `redraw()`: force a repaint in boundary cases after `deleteWidget(...)` when the view does not update immediately.

### Widget state and interaction

- `getProperty(...)` and `setProperty(...)`: compatibility-safe widget reads and writes, especially below `4.0`.
- `setEnable(...)`: disable hit-testing on top-layer widgets so lower stacked widgets can receive click or gesture events.
- `getType()`: inspect a widget instance type when debugging dynamic widget trees.

### Measurement and assets

- `getTextLayout(...)`: measure text before fixing widget height for wrapped or localized copy.
- `getImageInfo(...)`: inspect asset dimensions from `/assets` before hard-coding image sizing assumptions.

### Square-screen status bar

- `setStatusBarVisible(...)`: square-screen-only status-bar visibility control.
- `updateStatusBarTitle(...)`: square-screen-only status-bar title text update.

### RTL handling

- `getRtlLayout()`: detect whether the current system language is RTL.
- `relayoutRtl()`: apply RTL flipping to the current page; call it carefully because it affects all widgets on the page and some widgets may need to be created before or after the flip step deliberately.

### V4 layout utilities

- `setLayoutParent(...)`, `addLayoutChild(...)`, `removeLayoutChild(...)`, `updateLayoutStyle(...)`, `updateLayout()`, and `openInspector()` belong to the `4.x` layout workflow and stay documented in `v4/02-v4-ui-and-layout`.

## Practical routing

- For quick UI implementation guidance, start with `04-ui-sensors-interactions`.
- For detailed widget or low-level UI API choice, load this file too.
- For `4.x` Flex layout, `SYSTEM_KEYBOARD`, or direct property getters/setters, also load `v4/02-v4-ui-and-layout`.
- For widget/card surfaces, also load `10-secondary-widgets-and-shortcuts`.
- For Workout Extension UI, also load `12-workout-extension`.

## Official sources

- UI createWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/createWidget/
- TEXT: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/TEXT/
- IMG: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/IMG/
- BUTTON: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/BUTTON/
- FILL_RECT: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/FILL_RECT/
- STROKE_RECT: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/STROKE_RECT/
- CIRCLE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CIRCLE/
- ARC: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/ARC/
- IMG_ANIM: https://docs.zepp.com/docs/v2/reference/device-app-api/newAPI/ui/widget/IMG_ANIM/
- QRCODE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/QRCODE/
- DIALOG: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/DIALOG/
- HISTOGRAM: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/HISTOGRAM/
- GRADIENT_POLYLINE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/GRADIENT_POLYLINE/
- CANVAS: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CANVAS/
- PAGE_INDICATOR: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/PAGE_INDICATOR/
- PAGE_SCROLLBAR: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/PAGE_SCROLLBAR/
- SPORT_DATA: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SPORT_DATA/
- RADIO_GROUP: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/RADIO_GROUP/
- CHECKBOX_GROUP: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CHECKBOX_GROUP/
- SLIDE_SWITCH: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SLIDE_SWITCH/
- PICK_DATE: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/PICK_DATE/
- KEYBOARD: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/KEYBOARD/
- PICKER: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/PICKER/
- TIME_PICKER: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/TIME_PICKER/
- SYSTEM_KEYBOARD: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SYSTEM_KEYBOARD/
- GROUP: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/GROUP/
- SCROLL_LIST: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SCROLL_LIST/
- VIEW_CONTAINER: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/VIEW_CONTAINER/
- CYCLE_LIST: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CYCLE_LIST/
- CYCLE_IMAGE_TEXT_LIST: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/CYCLE_IMAGE_TEXT_LIST/
- VIRTUAL_CONTAINER: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/VIRTUAL_CONTAINER/
- getTextLayout: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/getTextLayout/
- getImageInfo: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/getImageInfo/
- redraw: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/redraw/
- setEnable: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/setEnable/
- getType: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/getType/
- getProperty: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/getProperty/
- setProperty: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/setProperty/
- setStatusBarVisible: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/setStatusBarVisible/
- updateStatusBarTitle: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/updateStatusBarTitle/
- getRtlLayout: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/getRtlLayout/
- relayoutRtl: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/relayoutRtl/
- createModal: https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/createModal/
- showToast: https://docs.zepp.com/docs/reference/device-app-api/newAPI/interaction/showToast/
