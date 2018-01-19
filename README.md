# HortonEntry

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Task

Create a Typescript application using A4+ that will allow a user to search
for repository by name and display a repository's relevant information
such as:

- URL
- description
- forks count
- stargazers count
- open issues count
- etc.

Also, display the available issues of a repository in a separate section in the UI.

Implement the best design possible for the user interface -
search and search results, and issues section.

- You can use Twitter Bootstrap and any JavaScript libraries to support AngularJS.
- Use best practices in writing JavaScript / Typescript, CSS / LESS, and HTML.
- Write clearly and use proper MVC structure to write the application.
- Bonus #1: Write tests. (Any type of test is accepted.)
- Bonus #2: Add another section for visualisation chart
  (using a JavaScript charting library that you already know)
  for the number of forks, open issues, stargazer count, watchers count,
  or any relevant information about the repository.

---

## TODO

### Angular CLI

- [x] add @angular-devkit/core from deps, because of this [bug](https://github.com/angular/devkit/issues/256#issuecomment-358802110)
- [ ] check internal webpack config, commonjs require to es6 import conversion doesn't work? Is this a dts thing?

### Search component

- [x] transclude dynamic text into label
- [ ] disable button for trimmed empty text
- [ ] min length, max length validator

### Cache Service

- [x] extract headers from intercepted response
- [ ] never cache broken response if header has `X-RateLimit-Remaining 0`
- [x] convert it to simple service (bake in the backend type)

### Testing

- [ ] explore karma, protractor
- [ ] is it possible to use jest (with jsdom) instead of protractor?

### Housekeeping

- [x] semistandard base config for tslint
- [ ] can we use lint-staged?
- [ ] remove empty constructors and nginits (leftovers from ng cli)
