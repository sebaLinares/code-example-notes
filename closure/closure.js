// ======== //
// Closures
// """""""" //
function foo() {
  var a = 2

  function bar() {
    console.log(a)
  }

  return bar
}

var baz = foo()

baz() // 2 -- Whoa, closure was just observed, man. bar() has a lexical scpoe closure over the inner scope of foo(), which keeps the score alive for bar() to reference at any time l8r
// That reference is called closure
// console.log(bar) prints the bar function

/*
 * After foo() executed, normally we would expect that the entirety of the inner scope of foo() would go away,
 * because we know that the Engine employs a Garbage Collector that comes along and frees up memory once it's
 * no longer in use. Since it would appear that the contents of foo() are no longer in use, it would seem
 * natural that they should be considered gone.
 */

// ================== //
// Garbage Collection
// """""""""""""""""" //
var x = {
  a: {
    b: 2
  }
}
// 2 objects are created. One is referenced by the other as one of its properties.
// The other is referenced by virtue of being assigned to the 'x' variable.
// Obviously, none can be garbage-collected.

var y = x // The 'y' variable is the second thing that has a reference to the object.

x = 1 // Now, the object that was originally in 'x' has a unique reference
//   embodied by the 'y' variable
var z = y.a // Reference to 'a' property of the object.
//   This object now has 2 references: one as a property,
//   the other as the 'z' variable

y = 'mozilla' // The object that was originally in 'x' has now zero
//   references to it. It can be garbage-collected.
//   However its 'a' property is still referenced by
//   the 'z' variable, so it cannot be freed

// z = null;       // The 'a' property of the object originally in x
//   has zero references to it. It can be garbage collected.

/*
 * In this example the original object that had an 'x' and 'a' objetcs
 * was references into another objects and then started to loose references
 * to older objects by new asignments. Finally the last reference to the
 * original 'a' object was in 'z' object, and that was asigned to null.
 * Thus, there were no references left for original 'a' and it was garbage
 * collected
 */

// ====================== //
// Other Closure Examples
// """""""""""""""""""""" //

function pedro() {
  var a = 2

  function juan() {
    console.log(a) // 2
  }

  diego(juan)
}

function diego(fn) {
  fn() // look ma, I saw closure!
}

/*
 * We pass the function baz to bar as an argument. Then we call it under the name of fn(), still having scope to the inner foo()'s 'a' variable
 */

var fn

function perico() {
  var a = 2

  function lospa() {
    console.log(a)
  }

  fn = lospa // assign `baz` to global variable
}

function lotes() {
  fn() // look ma, I saw closure!
}

perico()

lotes() // 2

// Second Example
