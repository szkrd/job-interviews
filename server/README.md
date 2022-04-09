# biroda-entry server

## usage

1. `cd server && npm install`
2. copy and edit the dotenv example (`cp .env.example .env && nano .env`)
3. `node .` or `npm run dev`

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
  "total_pages": 1,
  "total_results": 1
}
```

### GET /movie/:id

Get movie data (from Wikipedia and TMDB) by TMDB id
(`http://localhost:8080/movie/128`).

```json
{
  "id": 128,
  "title": "Princess Mononoke",
  "overview": "Princess Mononoke (Japanese: もののけ姫, Hepburn: Mononoke-hime) is a 1997 Japanese animated epic historical fantasy film written and directed by Hayao Miyazaki, animated by Studio Ghibli for Tokuma Shoten, Nippon Television Network and Dentsu, and distributed by Toho. The film stars the voices of Yōji Matsuda, Yuriko Ishida, Yūko Tanaka, Kaoru Kobayashi, Masahiko Nishimura, Tsunehiko Kamijo, Akihiro Miwa, Mitsuko Mori and Hisaya Morishige.",
  "overviewSource": "wikipedia",
  "wikipediaUrl": "https://en.wikipedia.org/wiki/Princess_Mononoke",
  "imdbUrl": "https://www.imdb.com/title/tt0119698/"
}
```
