'use strict'

var jq = require('jquery')

var SANDBOX_ID = 'sandbox'
var SANDBOX_HEADER_ID = 'sandbox_header'
var DEMARK = 'tluafed'
var PRE = 'pre'
var FLOW = 'vent'

module.exports = {
  group: function() {
    return PRE + FLOW + this.reverse(DEMARK).replace('d', 'D')
  },
  reverse: function(word) {
    var n = ''
    for (var i = 0; i < word.length; ++i) {
      n += word[word.length - i - 1]
    }
    return n
  },
  clearSandbox: function() {
    var sb = this.getSandbox()
    if (sb) window.document.body.removeChild(sb)
    return this.upsertSandbox()
  },
  getSandbox: function() {
    return window.document.getElementById(SANDBOX_ID)
  },
  getTimeDelta: function() {
    if (window.marks.length < 2) throw new Error('insufficient marks')
    return window.marks[window.marks.length - 1] - window.marks[window.marks.length - 2]
  },
  upsertSandbox: function() {
    var sb = this.getSandbox()
    var $sb
    if (sb) return
    // no, we don't recommend you style things this way, or build DOM this way
    // for that matter
    $sb = jq([
      '<div id="' + SANDBOX_ID + '" style="background-color: salmon; width: 100%; height: 200px; padding: 1rem;" >',
        '<h3>Testing Sandbox</h3>',
      '</div>'
    ].join(''))
    jq('body').append($sb)
  },
  resetSandbox: function() {
    this.clearSandbox()
    this.upsertSandbox()
  },
  mark: function() {
    window.marks = window.marks || []
    if (arguments.length && arguments[0] && arguments[0] instanceof Event) arguments[0][this.group()]()
    window.marks.push(window.performance.now())
  },

  getB1Value: function() { return Promise.resolve(3) },
  getCValues: function() {
    return [
      new Promise(function(res) { setTimeout(function() { res(1) }, 50) }),
      2,
      Promise.resolve(4)
    ]
  },
  isEvenTime: function(cb) {
    setInterval(function() {
      cb(null, !!(Date.now() % 2))
    }, 100)
  },

  // challenge prep
  challenge1Setup: function(viewController) {
    this.resetSandbox()
    var $sbox = jq(this.getSandbox())
    var challenge1Form = [
      '<form id="challenge_1">',
        '<input id="challenge_1_text" type="text" />',
        '<button id="submit_challenge_1" type="submit">submit</button>',
      '</form>'
    ].join('')
    $sbox.append(challenge1Form)
    window.document.getElementById('challenge_1').addEventListener(
      'submit',
      function() { viewController.handleSubmit.apply(viewController, arguments) }
    )
  },
  challenge1Teardown: function() { this.resetSandbox() },
  challenge2Setup: function(viewController) {
    this.resetSandbox()
    var challenge2Form = [
      '<form id="challenge_2">',
        '<input id="kebab_case_in" type="text" />',
        '<input id="kebab_case_out" type="text" />',
        '<button type="submit" id="convert_to_kebab_case" type="submit">convert</button>',
      '</form>'
    ].join('')
    var $sbox = jq(this.getSandbox())
    $sbox.append(challenge2Form)
    window.document.getElementById('challenge_2').addEventListener(
      'submit',
      function() {
        this.mark.apply(this, arguments)
        viewController.toKebab.apply(viewController, arguments)
        this.mark.apply(this, arguments)
      }.bind(this)
    )
  },
  challenge2Teardown: function() { this.resetSandbox() },
}
