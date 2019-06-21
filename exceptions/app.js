try {
  foo++
} catch (exception) {
  var message = exception.message
  console.log(message)
  console.log(exception.name)
}
