/*
 * If it's an object's method it refers to the object
 */
const video = {
  title: 'a',
  play() {
    console.log(this)
    // Because play() is a method inside an object
    // `this` references to the object
  }
}
// We can create a method outside the object and get the same result
video.stop = function() {
  console.log(this)
}
// video.play();
// video.stop();

/*
 * If apply(), call() or bing() are used to call a function, this inside the
 * functions is the object that is passed in as the argument
 */
function fn() {
  console.log(this)
}
const obj = {
  value: 5
}
const boundFn = fn.bind(obj)
// boundFn() // -> { value: 5 }
// fn.call(obj) // -> { value: 5 }
// fn.apply(obj) // -> { value: 5 }

/*
 * If it's a global function it refers to the global object which is
 * 'window' in browsers and 'global' in node
 */
function playVideo() {
  console.log(this)
}

// playVideo()

/*
 * If it's a constructor function and you use the 'new' operator
 * it reference the new object
 */
function Video(title) {
  this.title = title
  console.log(this)
}

// const v = new Video('b'); // Video {title: "b"}

/*
 * If it's an anonymous function inside an object it will reference
 * the global object
 */
const video2 = {
  title: 'a',
  tags: ['a', 'b', 'c'],
  showTags() {
    this.tags.forEach(function(tag) {
      // This is the anonymous function that's being executed
      // by the global object, thus 'this'
      // reference to the global object
      console.log(this.title, tag)
    })
  }
}

const video3 = {
  title: 'a',
  tags: ['a', 'b', 'c'],
  showTags() {
    // The forEach method has a second argument that can be
    // set to `this` so now it references this same object
    this.tags.forEach(function(tag) {
      console.log(this.title, tag)
    }, this)
  }
}

// video3.showTags()

const counter = {
  count: 0,
  incrementCounter: function() {
    this.count++
    console.log(this)
  }
}

const counterFn = counter.incrementCounter
counterFn()

// counter.incrementCounter()
document
  .querySelector('.btn')
  .addEventListener('click', counter.incrementCounter)

/*
 * if the function is an ES2015 arrow function, it ignores all the rules and `this`
 * receives the `this` value of its surrounding scopre at the time it's created
 */
const objArrow = {
  value: 'abc',
  createArrowFn: function() {
    return () => console.log(this)
  }
}
const arrowFn = objArrow.createArrowFn()
// arrowFn() // -> { value: 'abc', createArrowFn: ƒ }
