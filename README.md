# HortonEntry

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## TODO

### Angular CLI

- [x] add @angular-devkit/core from deps (https://github.com/angular/devkit/issues/256#issuecomment-358802110)
- [ ] check internal webpack config, commonjs require to es6 import conversion doesn't work? Is this a dts thing?

### Search component

- [ ] transclude dynamic text into label
- [ ] disable button for trimmed empty text
- [ ] min length, max length validator

### Cache Service

- [x] extract headers from intercepted response
- [ ] never cache if header has `X-RateLimit-Remaining 0`
- [x] convert it to simple service (bake in the backend type)
- [x] ~~or create a proper factory provider~~
- [x] ~~or create a static singleton and test with proxyquire (but it's not exactly angularish feels out of place here)~~

