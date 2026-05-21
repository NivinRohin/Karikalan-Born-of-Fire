## 2024-05-21 - Baseline Content Security Policy (CSP)
**Vulnerability:** Missing Content Security Policy (CSP), making the application more susceptible to Cross-Site Scripting (XSS) attacks.
**Learning:** React Single Page Applications (SPAs) should use CSP headers or meta tags to restrict the sources of executable scripts, stylesheets, and connections. In a Vite environment, `'unsafe-inline'` and `ws: wss:` are temporarily needed for development features like HMR, but having a baseline CSP restricts external malicious script execution.
**Prevention:** Always implement a baseline CSP in `index.html` (or via HTTP headers) early in a project's lifecycle, tailoring directives as strictly as development and production environments allow.
