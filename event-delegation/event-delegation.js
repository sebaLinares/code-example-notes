const list = document.querySelector('.list')
const listItems = document.querySelector('.li')
let selectedEl

list.addEventListener('click', event => highlight(event.target))

function highlight(el) {
  if (selectedEl) {
    selectedEl.classList.remove('highlight')
  }
  selectedEl = el
  el.classList.add('highlight')
}
