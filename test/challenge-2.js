/**
 * Welcome to challenge 2.  Pretend that a user can type text into your <form>.
 * However, you would like to format the text before submitting it to your server.
 * You love kebab-case (or lisp-case) formatted text.  If you're unfamiliar with
 * kebab-case, it's an all lower-case format, where all words are seperated by hyphens.
 * _'s and all continuous whitespace characters are replaced by -.  Strings
 * always start and end with the word components, and thus never whitespace.
 *
 * Therefore, you shall:
 *   - onsubmit (of form), convert the user input into kebab-case. set
 *     the resulting kebabed text value into <input id="kebab_case_out" />
 */

 // BEGIN NO EDIT
'use strict'

var tooling = require('./challenge-tooling')
var test = require('tape')
var jq = require('jquery')

var TEST_INPUTS = [
  '',
  '-^-',
  ' ',
  '  are you_my  Friend ',
  'ILIKETURTLES',
  '____',
  '_ a _ b _',
  '---ab c--',
  'A Cantankerous Walrus eats BIG_FISHIES!'
]
var TEST_OUTPUTS = [
  '',
  '^',
  '',
  'are-you-my-friend',
  'iliketurtles',
  '',
  'a-b',
  'ab-c',
  'a-cantankerous-walrus-eats-big-fishies!'
]
// END NO EDIT

// edits only required in the `controller`
var controller = {
  toKebab: function() {
    var input = jq('#kebab_case_in').val()
    return input
  }
}

test('conversions', function(t) {
  // REMOVE the following two statements to begin!
  t.skip('please open test/challenge-2.js and follow comment prompts.')
  return t.end();
  // END REMOVE
  tooling.challenge2Setup(controller)
  var $inputField = jq('#kebab_case_in')
  var $outputField = jq('#kebab_case_out')
  var $submit = jq('#convert_to_kebab_case')
  t.plan(TEST_INPUTS.length)
  TEST_INPUTS.forEach(function testInputStr(str, ndx) {
    $inputField.val(str)
    $submit.click()
    t.equals(TEST_OUTPUTS[ndx], $outputField.val(), 'kebab cased "' + str + '"')
  })
  tooling.challenge2Teardown()
  t.end()
})
