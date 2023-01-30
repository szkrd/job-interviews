# biroda-entry server

## usage

1. `cd server && npm install`
2. create a [tmdb access **token**](https://developers.themoviedb.org/3/getting-started/authentication#bearer-token)
3. set the **env vars**: copy and edit the dotenv example (`cp .env.example .env && nano .env`)
4. `node .` or `npm run dev`

## api

### GET /health

Returns status of the server
(`http://localhost:8080/health`).

```json
{ "status": "ok" }
```

### GET /movies

Search for movies with query params
(`http://localhost:8080/movies?query=Umi%20ga%20Kikoeru`).

```json
{
  "page": 1,
  "results": [
    {
      "id": 21057,
      "title": "Ocean Waves",
      "score": 63,
      "genres": [
        { "id": 10749, "name": "Romance" },
        { "id": 16, "name": "Animation" },
        { "id": 18, "name": "Drama" }
      ],
      "releaseDate": "1993-05-05",
      "poster": "https://www.themoviedb.org/t/p/w220_and_h330_face//hVw2DULeNpnpvDvRwuX4HaXMDMv.jpg"
    }
  ],
  "totalPages": 1,
  "totalResults": 1
}
```

If no query is set then the endpoint returns the most popular movies.

### GET /movie/:id

Get movie data (from Wikipedia and TMDB) by TMDB id
(`http://localhost:8080/movie/128`).

```json
{
  "backdrop": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/mpNd0rTVrp6vHJ9Je7wSa3zC8JS.jpg",
  "id": 128,
  "imdbUrl": "https://www.imdb.com/title/tt0119698/",
  "overview": "Princess Mononoke is a 1997 Japanese animated epic historical fantasy film written and directed by Hayao Miyazaki...",
  "overviewSource": "wikipedia",
  "poster": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/pdtzEreKvKAlqa2YEBaGwiA45V8.jpg",
  "releaseDate": "1997-07-12",
  "title": "Princess Mononoke",
  "wikipediaUrl": "https://en.wikipedia.org/wiki/Princess_Mononoke"
}
```

Detailed info with `?detailed=1` returns all of the above and the following extra fields:

```json
{
  "adult": false,
  "budget": 26500000,
  "genres": [{ "id": 12, "name": "Adventure" }],
  "homepage": "",
  "productionCompanies": [{ "id": 1778, "logo": "", "name": "dentsu" }],
  "revenue": 159414369,
  "runTime": 134,
  "score": 83.45,
  "status": "Released",
  "tagLine": "The Fate Of The World Rests On The Courage Of One Warrior.",
  "video": false
}
```

### POST /login

Post `{ username, password }`, returns `{ token }`.
