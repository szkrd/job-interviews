# Data fixtures

In order to test the fronted without GitHub, either directly inject
the contents of [session-storage.json](session-storage.json) to the
browser's sessionStorage, or use an interim proxy server.

Valid searches:

- "vue"
- "angular"
- "bootstrap"

The first two page is available for both repos and issues
(issues of the first repo in the list). 

## Session storage

```js
const temp = JSON.stringify(PASTED_TEXT);
sessionStorage.setItem('horton-entry-http-get-cache', temp);
```
