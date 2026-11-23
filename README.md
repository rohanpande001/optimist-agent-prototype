# Optimist Agent prototype

Exact static UI source for the private Optimist prototype. No installation or build is required.

## Run locally

Requires Python 3. From the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000 in a modern browser. Keep this terminal running. On Windows, use `py -m http.server 8000`.

## Files

- `index.html`: application shell
- `styles.css`: all styling and responsive layout
- `app.js`: sample projects, local state and interactions
- PNG files in the root: bundled icons and logo

The UI runs entirely in the browser. Changes persist in this browser's localStorage. Clear site data to reset the demo. Browser data from the hosted version is not copied to localhost.

This is an interactive prototype: agent replies, computer view, connectors, community invitations and vault flows are simulated, not connections to production services. No API keys or backend are required. The ChatGPT sign-in gate is supplied by the hosting platform and is not part of the local app.

## Sizing audit

- Composer: 58px to 46px minimum height; text 18px to 16px.
- Attachment control: 56px to 44px.
- Composer maximum width: 920px to 800px (including outer padding).
- Message text: 17px to 16px; padding 11px/18px to 9px/15px.
- Mini sidebar: 64px to 51px (approximately 20% narrower), with 44px controls.
- Side panes: 40% background opacity with 24px backdrop blur; text remains fully opaque.
- Active project name appears at top left; long names truncate with a full-name tooltip.
