# CORS proxies

This is a backend that proxies local http CORS requests to remote APIs.

The currently supported apis are:

1. [TMDB](https://www.themoviedb.org/documentation/api) (The Movie Database)
   - after login head to the [settings / api](https://www.themoviedb.org/settings/api) page
   - copy paste **API Read Access Token (v4 auth)** from there to your `.env` file (to **TMDB_ACCESS_TOKEN**)
2. [OWM](https://openweathermap.org/api) (Open Weather Map)
   - after login go to user [settings / api keys](https://home.openweathermap.org/api_keys) and generate one
   - api key must be enabled on the web UI (there is an active/inactive switch; set status to active)
   - copy paste **Key** from there to your `.env` file (to **OWM_ACCESS_TOKEN**)
   - we have only GET calls, this is pretty simple API
   - history and bulk data are not supported in the free plan (will return 401 only, this is in the [faq](https://openweathermap.org/faq#error401))
3. [GITHUB]()
   - first create a [personal token](https://github.com/settings/tokens)
   - use the new fine-grained PAT
   - copy paste **PAT** from there to your `.env` file (to **GITHUB_ACCESS_TOKEN**)

TODO: add support for more
(here's a curated list of free APIs: https://github.com/public-apis/public-apis)

## Usage

1. copy [.env.example](./.env.example) to `.env`
2. edit the env vars for the proxy you need (you will have to add your own api key / token)
3. launch the server (`npm start` or `npm run dev`)

Tokens are checked for approx length in [validators.mjs](./src/validators.mjs), checking is lazy,
happens only on route match (not on startup).

## Demo (plain frontend)

- start static server: `cd frontend-example` && `npm i` && `npm start`
- open page in browser (by default http://localhost:3000/)

## Demo (VSCode REST client)

Use the following vscode extension to execute the **.rest** files in the [rest-client](./rest-client) dir:

- **Name**: REST Client
- **Id**: humao.rest-client
- **Description**: REST Client for Visual Studio Code
- **Version**: 0.25.1
- **Publisher**: Huachao Mao
- **VS Marketplace Link**: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
