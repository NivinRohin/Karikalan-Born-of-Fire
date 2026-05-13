## 2024-05-13 - Add Content Security Policy

**Vulnerability:** Missing Content Security Policy (CSP) headers in `index.html`, leaving the application open to potential Cross-Site Scripting (XSS) and unauthorized resource loading.
**Learning:** Adding a restrictive CSP directly into a Vite development environment breaks Hot Module Replacement (HMR) and inline injected scripts unless specific directives (`'unsafe-inline'` for scripts/styles and `ws: wss:` for connections) are explicitly allowed.
**Prevention:** Include these essential Vite-specific CSP directives in the baseline policy to balance security improvements with development usability.
