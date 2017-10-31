/**
 * Greetings.  You are an engineer and you want to test a form's
 * submission behavior.  You've written your test (see below!), but for some reason
 * the page keeps reloading rapidly while your test runs!  Oh no!
 *
 * Your job is to:
 *   - fix the defect you encounter when you run the test. specifically,
 *     identify the root cause and remove the page reloading bug.  you will
 *     find that the page reloads constantly in an infinite loop.
 *   - get the assertion to pass, maintaining the test intent.
 *
 * To get started, you can jump down to the `'CHALLENGE 1 - form bugs'` text and
 * read on from there.
 */

 // BEGIN NO-EDIT
'use strict'

var tooling = require('./challenge-tooling')
var test = require('tape')
var jq = require('jquery')
// END NO-EDIT

test('CHALLENGE 1 - form bugs', function (t) {
  // REMOVE THE FOLLOWING TWO STATEMENTS TO BEGIN
  // AFTER REMOVED, EDITS ARE ONLY REQUIRED IN THE `controller` object
  t.fail('==> 🚨 👀 please open test/challenge-1.js and follow comment prompts. 👀 🚨 <==')
  return t.end()
  // END REMOVE

  var testInput = 'TEST-INPUT'
  view.setup()
  controller.t = t
  controller.testInput = testInput
  t.plan(1) // note, our test assertion happens in the `controller` object
  jq('#challenge_1_text').val(testInput)
  jq('#submit_challenge_1').click() // submits <form />
})

// edits ONLY required in the `controller` object below
var controller = {
  handleSubmit: function (evt) {
    var value = evt.target.testInput
    this.t.equals(value, this.testInput, 'testInput value found in form input control')
    this.t.end()
  }
}

var view = {
  setup: function () {
    tooling.resetSandbox()
    var $sandbox = jq(tooling.getSandbox())
    var form = [
      '<form id="challenge_1">',
        '<input name="testInput" id="challenge_1_text" type="text" />',
        '<button id="submit_challenge_1" type="submit">submit</button>',
      '</form>'
    ].join('')
    $sandbox.append(form)
    window.document.getElementById('challenge_1').addEventListener(
      'submit',
      function onFormSubmit () {
        controller.handleSubmit.apply(controller, arguments)
      }
    )
  }
}
