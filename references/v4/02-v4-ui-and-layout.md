# V4 UI and Layout

## Main V4 UI upgrades

API level `4.0` adds a more expressive UI workflow, but these features are version-gated.

## Flex layout with `VIRTUAL_CONTAINER`

Use `VIRTUAL_CONTAINER` as the root container for Flex layout when the app targets `4.0+`.

When it fits the task:

- complex responsive layouts
- grouping widgets in flexible rows or columns
- layouts that would be awkward with only fixed coordinates

Do not use it in `legacy` mode unless the project deliberately upgrades runtime compatibility.

Important support details:

- Flex layout is configured through the `layout` property.
- After modifying the widget tree, call `updateLayout()`.
- Use `updateLayoutStyle(...)` for dynamic layout-style changes.
- Layout trees can be manipulated with `setLayoutParent`, `addLayoutChild`, and `removeLayoutChild`.
- Use `deleteWidget(...)` for cleanup of removed widgets when needed.

## Getter/setter widget properties

From `4.0`, widgets can expose direct property access.

Examples of the idea:

- old style: `getProperty(...)` and `setProperty(...)`
- v4 style: direct `widget.text`, `widget.x`, `widget.color`, and similar properties where supported

Guidance:

- prefer direct property access in clean v4 codebases
- fall back to older accessors when maintaining compatibility below `4.0`
- verify page-level support because not every widget property behaves identically

## `openInspector`

Use `openInspector()` in the simulator after `build()` to visualize widget layout bounds when working with Flex layout or debugging placement issues.

Use it for:

- unexpected spacing
- overlap in Flex containers
- debugging container geometry

## `SMART_KEYBOARD`

`SMART_KEYBOARD` is a `4.0+` system-level input path.

Use it when:

- the app needs structured text input
- a full-screen system keyboard is preferable to custom tap-grid input

Check the project's UX and target devices before making text input a required path.

## V4 layout workflow

1. confirm API level is `4.x`
2. decide whether Flex layout actually improves the screen
3. use `VIRTUAL_CONTAINER` when container layout is clearer than manual coordinates
4. use `openInspector()` in simulator to debug layout bounds
5. call `updateLayout()` after dynamic tree edits
6. keep a fixed-coordinate fallback in mind when maintaining cross-version compatibility

## Official references

- API_LEVEL 4.0 New Features: https://docs.zepp.com/docs/guides/version-info/new-features-40/
- VIRTUAL_CONTAINER: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/VIRTUAL_CONTAINER/
- Widget layout properties for Flex layout: https://docs.zepp.com/docs/guides/framework/device/layout/
- Widget Getter/Setter Features: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/gettersetter/
- updateLayout: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/updateLayout/
- updateLayoutStyle: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/updateLayoutStyle/
- deleteWidget: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/deleteWidget/
- openInspector: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/openInspector/
- SMART_KEYBOARD: https://docs.zepp.com/docs/reference/device-app-api/newAPI/ui/widget/SMART_KEYBOARD/
