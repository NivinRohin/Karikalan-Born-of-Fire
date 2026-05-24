## 2026-05-24 - Content Security Policy for Vite Applications
**Vulnerability:** Missing Content Security Policy (CSP) allowed potentially unmitigated Cross-Site Scripting (XSS) and overly permissive resource loading.
**Learning:** Vite relies heavily on inline scripts/styles and WebSocket connections (`ws:`, `wss:`) for Hot Module Replacement (HMR) during development. A strict standard CSP blocks these features.
**Prevention:** Include `'unsafe-inline'` for both `script-src` and `style-src`, and explicitly allow `ws: wss:` in `connect-src` to balance development requirements with baseline CSP security in Vite web applications.
