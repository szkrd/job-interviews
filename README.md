API Test
========

My entry test for the job interview at RS, a wonderful node company at Budapest. The test's been
written in the late 2015, so it's probably not terribly relevant anymore.

## What would I do differently in 2016?

* koa instead of hapi
* joi for validation
* native await/async
* no more babel
* spec files next to their source code counterpart
* pure mongo, which now has promise support
* apiary/apib docs
* create another project for a simple client
* better cross-platform compatibility

## Specification

Write a [JSON HTTP API](http://jsonapi.org/) that has the following endpoints:

* **POST** `/registration`
  * name: String
  * email: String (bonus: validation)
* **GET** `/users`
  * token: String
  
The `/registration` endpoint creates a new user in a database with a token, and sends an email to the user. The email contains
a link with the token to the `/users` endpoint, where it lists all the registered users. The `/users` endpoint is only accessible with the token.

### Techs to be used

Node.js - apart from this, it is your call. Just be sure that you can answer the *Why?* question.

### Test cases

Unit/integration, you name it - the more, the merrier.
