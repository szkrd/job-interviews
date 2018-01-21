# HortonEntry

Simple angular 5 client side application using GitHub's public API.

1. `npm i`
2. run dev: `ng serve`
3. run tests: `ng test`
4. run lint: `ng lint` (semistandard + ts default)

If the GitHub api is not available, please install the demo fixtures.
See readme [here](./fixtures/README.md).

## ng-cli 

- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4 (updated to 1.6.5).
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
- Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Task

> Create a Typescript application using A4+ that will allow a user to search
> for repository by name and display a repository's relevant information
> such as:
>
> - URL
> - description
> - forks count
> - stargazers count
> - open issues count
> - etc.
>
> Also, display the available issues of a repository in a separate section in the UI.
>
> Implement the best design possible for the user interface -
> search and search results, and issues section.
>
> - You can use Twitter Bootstrap and any JavaScript libraries to support AngularJS.
> - Use best practices in writing JavaScript / Typescript, CSS / LESS, and HTML.
> - Write clearly and use proper MVC structure to write the application.
> - Bonus #1: Write tests. (Any type of test is accepted.)
> - Bonus #2: Add another section for visualisation chart
>   (using a JavaScript charting library that you already know)
>   for the number of forks, open issues, stargazer count, watchers count,
>   or any relevant information about the repository.

## TODO

Simple jot pad or things I consider worth mentioning.

### Angular CLI

- [x] add @angular-devkit/core from deps, because of this [bug](https://github.com/angular/devkit/issues/256#issuecomment-358802110)
- [x] upgrade angular cli (patch), very carefully (see [here](https://github.com/angular/angular-cli/issues/7375) and [here](https://github.com/angular/angular-cli/issues/8798))
- [x] commonjs require to es6 import conversion doesn't work? Is this a dts thing?  
      **Answer**: yes, d.ts type definition would be needed ([example](https://medium.com/@chris_72272/migrating-to-typescript-write-a-declaration-file-for-a-third-party-npm-module-b1f75808ed2))

### Services and models

- [x] convert http response sanitizers to clOnInitasses and move them to the models folder
- [x] do I want to keep model-related logic in the smart components or
      do I want to move them into the services?  
      **Answer**: yes, for now, since this is a tiny project.
- [ ] getting the whole http request (body and header) feels wrong, what is the proper way
      of dealing with pagination and ratelimit errors?

### Search component

- [x] transclude dynamic text into label
- [x] disable button for trimmed empty text
- [x] trimming is tricky (see [here](https://github.com/angular/angular/issues/8503)), let's use 3rd party directive for now
- [x] min length, max length validator

### Cache Service

- [x] extract headers from intercepted response
- [x] never cache broken response if header has `X-RateLimit-Remaining 0`
- [x] convert it to simple service (bake in the backend type)

### Testing

- [x] how to test native commonjs-ish modules? proxyquire? karma-commonjs? object wrapping?  
      **Answer**: do NOT try to circumvent the injector system, it's going to end in tears.
- [x] can we use puppeteer instead of karma?  
      **Answer**: yes, but it's [far from trivial](https://github.com/Quramy/angular-puppeteer-demo)
      (needs eject, webpack middleware)
- [ ] is it possible to run unit tests in jsdom with mocha + sinon + chai?
      (like [here](https://kasperlewau.github.io/post/angular-without-karma/) for example - what are the caveats? will TestBed work?)
      (or [here](http://darrinholst.com/blog/2017/11/09/testing-angular-components/), this one seems to be more robust)
- [x] is it possible to use jest with jsdom instead of protractor?
      **Answer**: probably, but the migration and [setup](https://semaphoreci.com/community/tutorials/testing-angular-2-and-continuous-integration-with-jest)
      is non trivial. The price for the better performance of course is jsdom and all its quirks, it may or may not worth it for you.
- [x] explore karma for unit tests
- [ ] explore protractor for e2e
- [ ] move mocks into standalone folder?

### Housekeeping

- [x] semistandard base config for tslint
- [x] can we use `lint-staged`?  
      **Answer**: not now. `ng lint` should accept parameters ([issue](https://github.com/angular/angular-cli/issues/7612))
      installing eslint and running eslint and tslint [together](https://github.com/angular/angular-cli/blob/1300ee74f0f82b096d981446fa2bd5b2fc23af39/package.json#L25)
      is an overkill for now.
- [x] can we use `semistandard` with a babel parser (tslint stripper)?  
      **Answer**: not really. Types are imported, but type hinting gets stripped out during
      the ts-js conversion and this will generate unused import and indentation warnings.
      The proper way to do this is to replicate functionality from `ng-cli` I guess,
      adding full blown eslint and run first eslint, then tslint for a given file.
- [x] remove empty constructors and nginits (leftovers from ng cli)

## Questions

- is there a good way to auto-unsubscribe all subscribers?
  How about [a decorator](https://www.npmjs.com/package/ngx-auto-unsubscribe)?
- lint staged, precommit hooks, time to commit - isn't it going to be a bit high?
- smart component vs fat services:
  - which one is preferable? or are people using ngrx-store?
  - I have seen directly accessing service observables/subjects from the template.
    Is this a common practice? Is there a way to indicate this bridge in the
    viewmodel somehow?
- any alternatives to karma and phantomjs? both feel cumbersome to me.
- how to mock imported or required dependencies in unit tests? 3rd party can be wrapped,
  but what about Observable.of for example?
- karma is "visible" in the browser. How do you deal with complex css animations and
  responsive design? I remember having problems with selenium finding elements not visible
  in the current responsive layout (defined by browser window size).

## Unit tests

- [ ] app component
- [x] issue-item component
- [ ] issues-page component
- [x] loader component
- [x] pagination component
- [x] repo-item component
- [ ] repos-page component
- [x] search-form component
- [x] markdown directive
- [x] http-get-cache interceptor
- [x] issue service
- [x] repo service
- [x] storage-cache service
- [x] session-storage service
