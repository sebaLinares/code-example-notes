let foo = function() {
  let a = 'a from foo'
  console.log('foo executed')
}

function bar() {
  let b = 'b from bar'
  console.log('bar executed')
}
var math = {
  factit: function factorial(n) {
    console.log(n)
    if (n <= 1) {
      return 1
    }
    return n * factorial(n - 1)
  }
}

// math.factit(3) //3;2;1;

var namedFunction = function() {
  // console.log('hey')
}
// console.log(namedFunction.name)

let namedFunction2 = namedFunction

// console.log(namedFunction2.name)

function baz(){console.log('hi')}()
