## 2024-05-24 - Missing Content Security Policy (CSP)
**Vulnerability:** The application was missing a baseline Content Security Policy (CSP), which is a crucial defense-in-depth mechanism against Cross-Site Scripting (XSS) attacks.
**Learning:** In Vite applications with React, setting a strict CSP requires allowing `'unsafe-inline'` for scripts and styles to support Hot Module Replacement (HMR) and injected styles during development. Additionally, `ws:` and `wss:` protocols must be allowed in `connect-src` for HMR WebSocket connections.
**Prevention:** Always include a baseline CSP via a `<meta>` tag in `index.html` or HTTP headers for new Vite/React projects, balancing strictness with development workflow requirements.
