# vivid-entry

Angular based interview entry task.

Client generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5. and so on.

- client: `cd client`, then `npm start` for a [dev server](http://localhost:4200/).
- server: `cd server`, then `ACCESS_TOKEN=token npm start`, you can also use `server/.env` for the env var.
  The client expects the server to be at PORT **5050**.
- branches: *master* is stable, though I might modify things in *development*, depending on my mood and my freetime

## caveats

- I don't consider this a lightweight task (at least with me not being an angular magician),
  so this is the bare minimum
- bare minimum meaning: css naked day (mostly), no real services (ajax crammed into the component),
  no progress indicators, no proper store, no backend (apart from the proxy),
  no infinite scroll, no pagination, no tests and zero bonus features
- with bonus features, proper backend and auth, material UI or bootstrap, unit and integration tests
  I would say this can take roughly a week to finish

## demo

[screen-recording](./docs/demo-20200808_121421-lowres.mp4)

---

Original description:

## Film DB App

Az applikációval kereshetsz filmeket és összeállíthatod a saját watch list-edet.
A filmekhez sok hasznos információt is megjelenít a felhasználónak.

Használható a [MoviesDB API](https://developers.themoviedb.org/3).

### User Story-k

1. [x] A felhasználó a főoldalon látja az összes új filmet
2. [x] A felhasználó a főoldalon lefelé görgetve release date alapján látja a filmeket
3. [x] A felhasználó el tud menteni “watch list”-et azokból a filmekből amelyeket meg szeretne nézni
4. [x] A felhasználó rákattinthat bármelyik filmre és tovább navigál a film oldalára (details page)
5. [x] Egy adott film oldalán a felhasználó látja a film részletes adatait: film leírás, rating, színészek, review-k.

### Bónusz feature-ök

1. [ ] A felhasználó létre tud hozni saját fiókot
2. [ ] A felhasználó saját watch list-et tud létrehozni
3. [ ] A felhasználó tud filmhez review-t létrehozni
