## $(date +%Y-%m-%d) - Adding baseline CSP headers
**Vulnerability:** Missing Content-Security-Policy rules
**Learning:** Application was lacking a foundational defense-in-depth mechanism against Cross-Site Scripting (XSS) and unauthorized resource loading. The meta tag approach was used as a baseline to secure static files.
**Prevention:** Include a CSP meta tag in index.html for Vite/React applications early in development to establish secure baseline policies while allowing necessary development features like 'unsafe-inline' and websockets for HMR.
