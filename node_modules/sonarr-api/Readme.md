# sonarr-api

Small module which helps you query the Sonarr HTTP API.

Please refer to the [Sonarr API documentation](https://github.com/Sonarr/Sonarr/wiki/API) for futher explainations and endpoints, most if not all are cover below.

## Usage

**SonarrAPI(options)**

Instantiate a SonarrAPI client.

Options:

-   **hostname**: hostname where Sonarr runs (required)
-   **apiKey**: Your API to access Sonarr (required)
-   **port**: port number Sonarr is listening on (optional, default: 8989)
-   **urlBase**: URL Base of Sonarr (optional, default: null)
-   **ssl**: Set to true if you are connecting via SSL (default: false)
-   **username**: HTTP Auth username (default: null)
-   **password**: HTTP Auth password (default: null)

## Methods

```js
get - send a GET request to the Sonarr API - if available returns json
post - send a POST request to the Sonarr API - if available returns json
put - send a PUT request to the Sonarr API - if available returns json
```

## Examples

```js
var SonarrAPI = require('./lib/sonarr-api');

var sonarr = new SonarrAPI({
		hostname: 'localhost',
		apiKey: '(insert your API key here)',
		port: 9000,
		urlBase: '/sonarr'
});

// get Sonarr Status
sonarr.get("system/status").then(function (result) {
 	// result will be json a response
}).catch(function (err) {
	throw new Error("There was a error processing the request: " + err);
});
```

## More examples

```js
/*
 * Calendar example
 */

var today = new Date();
var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

sonarr.get("calendar", { "start": yesterday.toISOString(), "end": tomorrow.toISOString() }).then(function (result) {
	console.log(result);
}, function (err) {
    throw new Error("There was a error processing the request: " + err);
});

/*
 * Command example - * note use of POST method *
 */
sonarr.post("command", { "name": "RefreshSeries", "seriesId": 1 }).then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

/*
 * Diskspace example
 */
sonarr.get("diskspace").then(function (result) {
	console.log(result);
}, function (err) {
    throw new Error("There was a error processing the request: " + err);
});

/*
 * Episode example
 */
sonarr.get("episode", { "seriesId": 1 }).then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

sonarr.get("episode/23", { "seriesId": 1 }).then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

/*
 * EpisodeFile example
 */
sonarr.get("episodefile", { "seriesId": 1 }).then(function (result) {
	console.log(result);
}, function (err) {
    throw new Error("There was a error processing the request: " + err);
});

sonarr.get("episodefile/23", { "seriesId": 1 }).then(function (result) {
 	console.log(result);
}, function (err) {
 	throw new Error("There was a error processing the request: " + err);
});

/*
 * History example
 */
sonarr.get("history", { "page": 1, "pageSize": 20, "sortkey": "series.title", "sortDir": "desc" }).then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

/*
 * Wanted example
 */
sonarr.get("wanted/missing", { "page": 1, "pageSize": 20, "sortkey": "series.title", "sortDir": "desc" }).then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

/*
 * Queue example
 */
sonarr.get("queue").then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

/*
 * Profile example
 */
sonarr.get("profile").then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

/*
 * Release example
 */
sonarr.get("release", { "episodeId": 23 }).then(function (result) {
  	console.log(result);
}, function (err) {
  	throw new Error("There was a error processing the request: " + err);
});

/*
 * Root folder example
 */
sonarr.get("rootfolder").then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

/*
 * Series example
 */
sonarr.get("series").then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

sonarr.get("series/1").then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});

sonarr.get("series/lookup", { "term": "america" }).then(function (result) {
	console.log(result);
}, function (err) {
	throw new Error("There was a error processing the request: " + err);
});
```

## Changelog

### v0.2.0

-   Rewrote module to utilize ES6 classes / promises

### v0.1.1

-   Minor code clean up

### v0.1.0

-   Initial release

## License

(The MIT License)

Copyright (c) 2015 Devin Buhl <mailto:devin.kray@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
