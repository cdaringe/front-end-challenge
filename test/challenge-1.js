/**
 * Greetings.  You are an engineer and you want to test a form's
 * submission behavior.  You've written your test (below!), but for some reason
 * the page keeps reloading rapidly while your test runs!  Oh no!
 *
 * Your job is to:
 *   - fix the defect you encounter when you run the test. specifically,
 *     identify the root cause && remove the page reloading bug.  you will
 *     find that the page reloads constantly in a seemingly infinite loop.
 *   - get the assertion to pass, maintaining the test intent.
 */

 // BEGIN NO-EDIT
'use strict'

var tooling = require('./challenge-tooling')
var test = require('tape')
var jq = require('jquery')
// END NO-EDIT

// edits only required in the `controller`
var controller = {
  post: function(value) {
    /* will be overridden in the test below */
  },
  handleSubmit: function(evt) {
    this.post(evt.target.value)
  }
}

test('CHALLENGE 1 - form bugs', function(t) {
  // REMOVE THE FOLLOWING TWO STATEMENTS TO BEGIN
  t.fail('please open test/challenge-1.js and follow comment prompts.')
  return t.end()
  // END REMOVE

  var testInput = 'test-input'
  tooling.challenge1Setup(controller)
  t.plan(1)
  controller.post = function(posted) {
    t.equals(testInput, posted, 'submitted form input value POST\'ed')
    tooling.challenge1Teardown()
    t.end()
  }
  jq('#challenge_1_text').val(testInput)
  jq('#submit_challenge_1').click() // submits <form />
})
