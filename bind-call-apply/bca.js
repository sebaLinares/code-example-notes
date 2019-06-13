/*
 * The `this` keyword inside a function refers to different objects depending on how the function is called. Sometimes accidentally we lose reference to the `this` variable. To prevent this we use bind, call & apply
 */
const counter = {
  count: 0,
  incrementCounter: function() {
    console.log(this)
    this.count++
  }
}
// Here the this will print the .btn DOM element, not the counter, were it was written.
document
  .querySelector('.btn')
  .addEventListener('click', counter.incrementCounter.bind(counter))

// console.log('counter', counter)
// console.log(counter.incrementCounter)
// console.log('bind', counter.incrementCounter.bind(counter))
// console.log(counter.incrementCounter === counter.incrementCounter.bind(counter))
const increment2 = counter.incrementCounter.bind(counter)
counter.incrementCounter()
increment2()
console.log(counter.incrementCounter === increment2)

/*
 * Bind(): It created a new function and sets the this keyword to the specified object
 */

const john = {
  name: 'John',
  age: 24
}

const jane = {
  name: 'Jane',
  age: 22
}

function greeting() {
  console.log(`Hi, I am ${this.name} and I am ${this.age} years old`)
}

// We can use the bind() to bind the `this` keyword to john & jane objects.
const greetingJohn = greeting.bind(john)
const greetingJane = greeting.bind(jane)

// greetingJohn()
// greetingJane()

// .bind() also accepts arguments
function greeting2(lang) {
  console.log(`Hi, I speak ${lang} and my name is ${this.name}`)
}

const greetingJohn2 = greeting2.bind(john, 'es')
// greetingJohn2()

/*
 * .call(): Does the same .bind() does but it executes immediately
 */

greeting.call(john)

/*
 * .apply(): Does the same as .call() but it receives an array of arguments instead of comma separated ones.
 */

function greeting3(lang, msg) {
  console.log(`name: ${this.name}, speaks ${lang} like ${msg}`)
}

greeting3.apply(john, ['es', 'paralelepipedo'])
