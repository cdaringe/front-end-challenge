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
}
