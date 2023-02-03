# utils

Small **utility functions** that I end up writing multiple times.
The project uses `ts-jest`; most of these should not need the DOM.

- These code fragments are meant to be edited.
- Console calls should be replaced with a log implementation.
- Not all functions may have tests.

## list of files

Files are in TS, but they may not be implicit any safe.
If a file has a spec, then it is marked with ✨ (sparkles), if it has **disabled** `no-explicit-any`
then it is marked with a ⚠️ (warning). Very old or incomplete / now broken scripts are marked
with a 🛑 (stop sign).

- array / [arrayDifference](src/array/arrayDifference.ts) ✨
- array / [arrayEquals](src/array/arrayEquals.ts) ✨⚠️
- array / [arrayToMapObjectById](src/array/arrayToMapObjectById.ts) ✨
- array / [arrayWithout](src/array/arrayWithout.ts) ✨
- array / [chunkArray](src/array/chunkArray.ts) ✨
- array / [cloneArray](src/array/cloneArray.ts) ✨
- array / [createPaginationRange](src/array/createPaginationRange.ts) ✨
- array / [getArrayIndexById](src/array/getArrayIndexById.ts) ✨⚠️
- array / [getRandomItem](src/array/getRandomItem.ts) 
- array / [groupBy](src/array/groupBy.ts) ✨
- array / [range](src/array/range.ts) ✨
- array / [shuffle](src/array/shuffle.ts) 
- array / [uniq](src/array/uniq.ts) ✨
- array / [uniqBy](src/array/uniqBy.ts) ✨⚠️
- async / [sleepAsync](src/async/sleepAsync.ts) 
- boolean / [asBoolean](src/boolean/asBoolean.ts) ✨⚠️
- browser / [bodyScrollLock](src/browser/bodyScrollLock.ts) 
- browser / [fullScreen](src/browser/fullScreen.ts) ⚠️
- browser / [geoLocation](src/browser/geoLocation.ts) 
- browser / [getEnvironment](src/browser/getEnvironment.ts) 
- browser / [getViewportRespoType](src/browser/getViewportRespoType.ts) 
- browser / [isEdge](src/browser/isEdge.ts) 
- browser / [isIos](src/browser/isIos.ts) 
- browser / [isSafari](src/browser/isSafari.ts) 
- browser / [isTouch](src/browser/isTouch.ts) 
- browser / [loadResource](src/browser/loadResource.ts) 
- browser / [triggerDownload](src/browser/triggerDownload.ts) ⚠️
- currency / [formatMoney](src/currency/formatMoney.ts) ✨
- datetime / [formatDate](src/datetime/formatDate.ts) ✨
- datetime / [formatDuration](src/datetime/formatDuration.ts) ✨
- datetime / [parseTimestamp](src/datetime/parseTimestamp.ts) ✨
- datetime / [secondsToHms](src/datetime/secondsToHms.ts) ✨
- datetime / [utcToLocal](src/datetime/utcToLocal.ts) ✨
- dom / [createHeadTag](src/dom/createHeadTag.ts) 
- fetch / [getApiHeaders](src/fetch/getApiHeaders.ts) 
- fetch / [request](src/fetch/request.ts) ⚠️
- function / [debounce](src/function/debounce.ts) ⚠️
- function / [isGeneratorFunction](src/function/isGeneratorFunction.ts) ✨⚠️
- function / [nullFunc](src/function/nullFunc.ts) ⚠️
- function / [throttle](src/function/throttle.ts) ⚠️
- html / [bbHtml](src/html/bbHtml.ts) ✨
- html / [escapeHtml](src/html/escapeHtml.ts) ✨
- html / [linkify](src/html/linkify.ts) ✨
- i18n / [humanize](src/i18n/humanize.ts) ✨
- log / [logWithLevels](src/log/logWithLevels.ts) ⚠️
- log / [oldClassLog](src/log/oldClassLog.ts) ⚠️🛑
- log / [oldRemoteImgLog](src/log/oldRemoteImgLog.ts) ⚠️🛑
- log / [oldVideoLog](src/log/oldVideoLog.ts) 🛑
- moment / [createInternalDayTransactions](src/moment/createInternalDayTransactions.ts) 
- moment / [getCalendarDays](src/moment/getCalendarDays.ts) ✨
- moment / [getLocaleDateFormat](src/moment/getLocaleDateFormat.ts) 
- moment / [getShortDayNames](src/moment/getShortDayNames.ts) ✨
- moment / [getSwitchableShortDate](src/moment/getSwitchableShortDate.ts) 
- moment / [getYearRange](src/moment/getYearRange.ts) ✨
- moment / [prettyPrintFromDate](src/moment/prettyPrintFromDate.ts) ⚠️🛑
- navigation / [getLocationHash](src/navigation/getLocationHash.ts) 
- navigation / [triggerInitialHashChange](src/navigation/triggerInitialHashChange.ts) 
- navigation / [updateLocationHashParams](src/navigation/updateLocationHashParams.ts) 
- number / [isFractional](src/number/isFractional.ts) 
- number / [limit](src/number/limit.ts) 
- number / [random](src/number/random.ts) 
- number / [truncateDecimals](src/number/truncateDecimals.ts) 
- object / [freezeErrorObject](src/object/freezeErrorObject.ts) ✨⚠️
- object / [objectGet](src/object/objectGet.ts) ✨⚠️
- object / [renameProp](src/object/renameProp.ts) ✨⚠️
- object / [safeStringify](src/object/safeStringify.ts) ✨⚠️
- object / [withoutEmpties](src/object/withoutEmpties.ts) ✨⚠️
- storage / [simpleSessionStorage](src/storage/simpleSessionStorage.ts) ⚠️
- string / [capitalize](src/string/capitalize.ts) ✨
- string / [decapitalize](src/string/decapitalize.ts) ✨
- string / [escapeRegExp](src/string/escapeRegExp.ts) ✨
- string / [insertAt](src/string/insertAt.ts) ✨
- string / [kebabCase](src/string/kebabCase.ts) ✨
- string / [parseLabel](src/string/parseLabel.ts) ✨
- string / [replaceAt](src/string/replaceAt.ts) ✨
- string / [truncateText](src/string/truncateText.ts) ✨
- token / [parseJwt](src/token/parseJwt.ts) ✨
- typescript / [objectKeys](src/typescript/objectKeys.ts) 
- url / [addQueryStringToUrl](src/url/addQueryStringToUrl.ts) ✨
- url / [queryString](src/url/queryString.ts) ✨⚠️
- url / [queryStringArr](src/url/queryStringArr.ts) ✨⚠️
- url / [stripProto](src/url/stripProto.ts) ✨
- validation / [isKeyValueObject](src/validation/isKeyValueObject.ts) ✨⚠️
- validation / [isMongoId](src/validation/isMongoId.ts) ✨⚠️
- validation / [isNullOrUndefined](src/validation/isNullOrUndefined.ts) ✨⚠️
- validation / [isValueInEnum](src/validation/isValueInEnum.ts) ✨⚠️
- react / [handleFakeInputKeyDownEvent.xts](src/react/handleFakeInputKeyDownEvent.xts) ⚠️🛑
- vue / [apiCall.xts](src/vue/apiCall.xts) ⚠️🛑

