# front-end-challenge

a small set of exercises pertinent to front end programming!

## requirements

- your computer
- [nodejs](http://www.nodejs.org)
- a web browser

## how

- clone & `cd [this-directory!]`
- create a new branch, `git checkout -b challenge-answers`
- `npm install`
- `npm test`
  - this will open up a browser.  **please follow the onscreen instructions.  your objective is to make all tests pass.**
    - by default we will use `chrome`. if you want to use `firefox` or `safari`, please edit `testem.json` accordingly for the exercise.
    - disregard any security warnings at the top of the chrome browser--these are expected.
  - to complete the tasks, it's highly recommended to use the debug utilities included in your browser.  make use of `debugger` statements in your code, as your code will be bundled before it is shipped to your browser.
  - lastly, the test suite will automatically re-compile and run in the browser every time you make a change. be aware of this _convenience_ :smile:.

## submitting

Please submit your answers as a patch for e-mail instead of a (public) pull request

- git commit -a -m "challenge answers"
- git format-patch master

submit the patch output.
