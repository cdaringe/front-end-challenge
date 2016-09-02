/**
 * challenge 3.
 *
 * Suppose you have a task that computes a single value.  That value is obtained
 * by aggegating simple integers.  Suppose that it:
 * - gets the first value, using a function a().  the aggregate is updated via
 *   `aggregate = someAggreatorFn(a-result)`
 * - gets the second and third values, via b1() and b2(), in parallel. The
 *   aggegate value is updated by `aggregate += someAggreatorFn(a-result + b1-result)`
 *   and `aggregate += someAggreatorFn(a-result + b2-result)` in parallel.
 * - gets final value from c(), and aggregates just as above.
 *   `aggregate += someAggreatorFn(a + b1 + b2 + c)`
 *
 * in other words, the value is obtained using the following control flow:
 *   a     // tier 1,get a, aggregate
 *  / \
 * b1 b2   // tier 2 get b1, b2, aggregate
 * \  /
 *  c      // tier 3 get c, aggregate
 *
 * Each of these functions, however, is asynchronus.  Modify the `controller`
 * code to honor the control flow described above and satisfy the test.
 * The `entry` function expresses the intent of what you need to do, as if all
 * of the code was written synchronously.
 */
'use strict'

var tooling = require('./challenge-tooling')
var test = require('tape')
var jq = require('jquery')

// edits only required in the `controller`
var controller = {

  // start here. entry is written as though the other functions in controller
  // were synchronous.  however, other methods are asynchronus.  adapt `entry`
  // and the other methods as needed to pass the test!
  entry: function(cb) {
    var aggregate = 0

    this.tier = 1
    aggregate = this.getTierValue(this.a())

    this.tier = 2
    aggregate += this.getTierValue(a + this.b1()) // note how a is used w/ b1's output
    aggregate += this.getTierValue(a + this.b2())

    this.tier = 3
    aggregate += this.getTierValue(a + b1 + b2 + this.c())

    return cb(null, aggregate)
  },

  getTierValue: function(val) {
    return this.tier * val
  },

  /**
   * function `a` should use the node-style callback paradigm to callback with
   * the value 1 only after isEvenTime confirms that the current time... is even!
   */
  a: function(cb) {
    tooling.isEvenTime(cb) // calls back with whether or not we are an event count of ticks from the epoch
    return 1
  },

  /**
   * promises or callbacks OK. b1 must use getB1Value to get its value
   */
  b1: function() {
    tooling.getB1Value() // returns a Promise. will resolve to b1's value
  },

  /**
   * no rules! must pass 5 to its caller though any means desired
   */
  b2: function() {
    return 5 // not an async function :)
  },

  /**
   * promises or callbacks OK. c must use getCValues to get its value
   */
  c: function() {
    tooling.getCValues() // returns an array of Promises. sum the results results on resolution
  }
}

// NO EDITS BELOW
test('async-things', function(t) {
  // REMOVE the following two statements to begin!
  t.fail('please open test/challenge-3.js and follow comment prompts.')
  return t.end()
  // END REMOVE
  t.plan(1)
  var end = function(err, r) {
    if (err) return t.fail(err)
    t.equals(r, 84, 'async thingies == 84')
    t.end()
  }
  controller.entry(end)
})
