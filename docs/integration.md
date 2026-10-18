# Use a component

1. Start the library with `npm start` and choose a category.
2. Open a component, try its states and read Usage.
3. Download its ZIP, or use the agent CLI to copy a complete variant.
4. Choose the vanilla HTML/CSS/JavaScript example, React adapter or Next.js client entry. Keep supporting modules, fonts and `OFL.txt` together.
5. Serve vanilla examples over HTTP, or use the complete exported package in your React/Next.js application. Adapt CSS variables and connect real action callbacks.

Every package retains its independent HTML, CSS and JavaScript example and additionally includes React and Next.js exports. The vanilla controller remains usable without a framework. Inspect the package's actual API; controllers are not all interchangeable.

## React and Next.js

For React, import `Component.jsx` and inspect `react-example.jsx`. For Next.js, use `NextClient.jsx` and the callback-owning `next-page.jsx` example. These files require `react-controller.mjs`, `react-font.mjs`, the bundled font and documented supporting resources. Keep the complete package together; copying a single JSX file is insufficient.

Both exports are source-preserving client-widget adapters with isolated Shadow DOM. They are not native React-state rewrites and do not provide meaningful widget SSR; initial server output is a stable placeholder. Connect application actions and form values through the documented callbacks/ref API, rather than assuming outer forms can serialize controls across a Shadow DOM boundary.

Read `framework-usage.md` in the package and the [framework integration guide](frameworks.md) for lifecycle, examples, CSP and integration constraints. For another framework such as Vue, mount the vanilla controller after its DOM exists and call `destroy()` when removing it.

## Example: project dialog

The `modal-overlay` package includes `index.html`, `buttons.css`, the entry scripts, `overlays.js`, `genie.js`, `pin.js`, preview support and the local font/license. `example.js` exposes the controller as `SLOverlayInstance`.

Use its `open()`, `close()`, `reset()` and `destroy()` methods. Listen for `overlaycommit` and read `event.detail`. Do not treat the demo's local confirmation as evidence of a successful server request. Connect your actual operation and show success only after it succeeds.

## Before shipping an integration

- Keep semantic controls, keyboard focus, labels and reduced-motion behavior.
- Verify repeat activation, cancellation and cleanup rather than just the first click.
- Render user-entered text as text, not HTML.
- Keep SVG icons and supporting modules; removing them can break motion or layout.
- Test your target viewport and browser. The release's automated browser evidence is from Chrome; it is not a cross-browser certification.
- Read the component's usage notes for clipboard, sharing, file and permission behavior.

The preview runtime (`preview-runtime.js`) is for the catalog showcase. You usually want the standalone package controller in an application, not the entire catalog renderer.
