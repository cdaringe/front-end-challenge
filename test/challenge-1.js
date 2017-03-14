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

// edits only required in the `controller`, after removing the `t.fail` below
var controller = {
  post: function (value) {
    /* will be overridden in the test below */
  },
  handleSubmit: function (evt) {
    this.post(evt.target.value)
  }
}

var view = {
  setup: function (viewController) {
    tooling.resetSandbox()
    var $sbox = jq(tooling.getSandbox())
    var challenge1Form = [
      '<form id="challenge_1">',
      '<input id="challenge_1_text" type="text" />',
      '<button id="submit_challenge_1" type="submit">submit</button>',
      '</form>'
    ].join('')
    $sbox.append(challenge1Form)
    window.document.getElementById('challenge_1').addEventListener(
      'submit',
      function () { viewController.handleSubmit.apply(viewController, arguments) }
    )
  },
  teardown: function () { tooling.resetSandbox() }
}

test('CHALLENGE 1 - form bugs', function (t) {
  // REMOVE THE FOLLOWING TWO STATEMENTS TO BEGIN
  t.fail('please open test/challenge-1.js and follow comment prompts.')
  return t.end()
  // END REMOVE
arst
  var testInput = 'test-input'
  view.setup(controller)
  t.plan(1)
  controller.post = function (posted) {
    t.equals(posted, testInput, 'submitted form input value POST\'ed')
    view.teardown()
    t.end()
  }
  jq('#challenge_1_text').val(testInput)
  jq('#submit_challenge_1').click() // submits <form />
})
