## 2026-05-28 - Baseline Content Security Policy for Vite Apps
**Vulnerability:** Missing Content Security Policy (CSP) headers/meta tags, leaving the application vulnerable to basic Cross-Site Scripting (XSS) and unauthorized resource loading.
**Learning:** Vite applications require specific CSP directives (`'unsafe-inline'` for scripts/styles and `ws: wss:` for connections) to allow Hot Module Replacement (HMR) to function during development, while still restricting external malicious sources.
**Prevention:** Always include a baseline CSP meta tag in `index.html` (or via server headers) from the start of the project to establish a defense-in-depth posture against XSS.
