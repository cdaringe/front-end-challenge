/**
 * Welcome to challenge 2.  Pretend that a user can type text into your <form>.
 * However, you would like to format the text before submitting it to your server.
 * You love kebab-case (or lisp-case) formatted text.  If you're unfamiliar with
 * kebab-case, it's an all lowercase format, where all words are seperated by hyphens.
 * _'s and all continuous whitespace characters are replaced by -.  Strings
 * always start and end with the word components, and thus never whitespace.
 *
 * Your objective is to:
 *   - write the logic to convert the user input into kebab-case.
 *   - set the resulting kebabed text value into <input id="kebab_case_out" />.
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

// edits only required in the `controller`, after removing the `t.fail` below
var controller = {
  toKebab: function () {
    var input = jq('#kebab_case_in').val()
    return input
  }
}

var view = {
  setup: function (viewController) {
    tooling.resetSandbox()
    var challenge2Form = [
      '<form id="challenge_2">',
      '<input id="kebab_case_in" type="text" />',
      '<input id="kebab_case_out" type="text" />',
      '<button type="submit" id="convert_to_kebab_case" type="submit">convert</button>',
      '</form>'
    ].join('')
    var $sbox = jq(tooling.getSandbox())
    $sbox.append(challenge2Form)
    window.document.getElementById('challenge_2').addEventListener(
      'submit',
      function () {
        this.mark.apply(this, arguments)
        viewController.toKebab.apply(viewController, arguments)
        this.mark.apply(this, arguments)
      }.bind(tooling)
    )
  },
  teardown: function () { tooling.resetSandbox() }
}

test('CHALLENGE 2 - kebab conversions', function (t) {
  // REMOVE the following two statements to begin!
  t.fail('please open test/challenge-2.js and follow comment prompts.')
  return t.end()
  // END REMOVE
  view.setup(controller)
  var $inputField = jq('#kebab_case_in')
  var $outputField = jq('#kebab_case_out')
  var $submit = jq('#convert_to_kebab_case')
  t.plan(TEST_INPUTS.length)
  TEST_INPUTS.forEach(function testInputStr (str, ndx) {
    $inputField.val(str)
    $submit.click()
    t.equals($outputField.val(), TEST_OUTPUTS[ndx], 'kebab cased "' + str + '"')
  })
  view.teardown()
  t.end()
})
