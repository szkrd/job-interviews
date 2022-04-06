require('dotenv').config();
const express = require('express');
const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;
const host = process.env.HOST ?? '127.0.0.1';
const tmdbAccessToken = process.env.TMDB_ACCESS_TOKEN ?? '';

// quick check to see if we have the tmdb auth token (and that's not for the v3 access)
if (tmdbAccessToken.length < 128) {
  throw new Error('Invalid or missing tmdb access token!');
}

app.get('/health', (req, res) => {
  res.send({ ok: true });
});

app.listen(port, host, () => {
  console.info(`Express listening on ${host}:${port}`);
});
