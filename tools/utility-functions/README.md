# utils

Small **utility functions** that I end up writing multiple times.
The project uses `ts-jest`; most of these should not need the DOM.

- These code fragments are meant to be edited.
- Console calls should be replaced with a log implementation.
- Not all functions have tests.

## list of files

Files are in TS, but they may not be implicit any safe.
If a file has a spec, then it is marked with ✨ (sparkles), if it has **disabled** `no-explicit-any`
then it is marked with a ⚠️ (warning).

- array / **arrayToMapObjectById** ✨
- array / **chunkArray** ✨
- array / **cloneArray** ✨
- array / **createPaginationRange** ✨
- array / **getArrayIndexById** ✨ ⚠️
- array / **getRandomItem**
- array / **groupBy** ✨
- array / **range** ✨
- array / **shuffle**
- array / **uniq** ✨
- array / **uniqBy** ✨ ⚠️
- async / **sleepAsync**
- boolean / **asBoolean** ✨ ⚠️
- browser / **geoLocation**
- browser / **getEnvironment**
- currency / **formatMoney** ✨
- datetime / **formatDate** ✨
- datetime / **formatDuration** ✨
- datetime / **secondsToHms** ✨
- datetime / **utcToLocal** ✨
- fetch / **request** ⚠️
- function / **debounce** ⚠️
- function / **isGeneratorFunction** ✨ ⚠️
- function / **nullFunc** ⚠️
- function / **throttle** ⚠️
- html / **bbHtml** ✨
- html / **escapeHtml** ✨
- html / **linkify** ✨
- i18n / **humanize** ✨
- log / **logWithLevels** ⚠️
- navigation / **getLocationHash**
- navigation / **triggerInitialHashChange**
- navigation / **updateLocationHashParams**
- number / **isFractional**
- number / **limit**
- number / **random**
- number / **truncateDecimals**
- object / **freezeErrorObject** ✨ ⚠️
- object / **objectGet** ✨ ⚠️
- object / **renameProp** ✨ ⚠️
- object / **safeStringify** ✨ ⚠️
- object / **withoutEmpties** ✨ ⚠️
- storage / **simpleSessionStorage** ⚠️
- string / **capitalize** ✨
- string / **decapitalize** ✨
- string / **escapeRegExp** ✨
- string / **insertAt** ✨
- string / **kebabCase** ✨
- string / **parseLabel** ✨
- string / **replaceAt** ✨
- string / **truncateText** ✨
- token / **parseJwt** ✨
- typescript / **objectKeys**
- url / **addQueryStringToUrl** ✨
- url / **queryString** ✨ ⚠️
- url / **queryStringArr** ✨ ⚠️
- url / **stripProto** ✨
- validation / **isKeyValueObject** ✨ ⚠️
- validation / **isMongoId** ✨ ⚠️
- validation / **isNullOrUndefined** ✨ ⚠️
- validation / **isValueInEnum** ✨ ⚠️
- vue / **apiCall** ⚠️
