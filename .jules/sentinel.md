## 2024-05-24 - Missing Baseline Content Security Policy (CSP)
**Vulnerability:** The application was missing a baseline Content Security Policy (CSP) meta tag in `index.html`.
**Learning:** React/Vite applications still require CSP headers to mitigate Cross-Site Scripting (XSS) risks. The development server requires specific directives (`unsafe-inline` for scripts/styles and `ws:`/`wss:` for HMR connections) to function correctly without breaking the Vite environment.
**Prevention:** Always ensure a baseline CSP is included in `index.html` early in the development lifecycle, balancing security with development tooling requirements.
