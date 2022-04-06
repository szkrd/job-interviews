# biroda-entry

## user story

I, as a movie goer person, would like to be able to search for movies (using a free - as in beer - API)
and have a small description of the movie (from Wikipedia) along with links to my favorite sites,
which are IDMB and Wikipedia. I want these links to open in my browser, no apps please.

### definition of done

Project restraints:

1. have a **react frontend** that communicates with a **node backend**
2. source code shall be publicly available (use **github** or gitlab)
3. code, descriptions, UI, all of them shall be **in English**, additional localization is not needed
4. you can use 3rd party libraries (but NOT for masking away the API endpoints themselves)
5. design should be **clear, easily readable** (placement, paddings, margins, headings etc.)

Technical details:

1. must have a **search** field (for movie names), on button/key press it downloads
   search results from [TMDB](https://developers.themoviedb.org/3/getting-started/introduction)
2. results are shown in a **list** (name, category, score etc.), list **items are clickable**
3. on item click it opens/shows a **details panel**
   1. with the Wikipedia short description (using the Wikipedia API)
   2. with link to the Wikipedia article (target: blank)
   3. with link to the IMDB movie page (target: blank)

### optional improvements

1. add a third link called **"related movies"** (aka. similar movies) which changes
   the search result view to a related movies list
2. add tests

---

## implementation

WIP
