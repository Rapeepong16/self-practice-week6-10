import { addQuote, deleteQuote, updateQuote, getAllQuotes } from './quote.js'

const quoteList = document.getElementById('quote-list')
const form = document.getElementById('quoteForm')
const contentInput = document.getElementById('content')
const authorInput = document.getElementById('author')
const idInput = document.getElementById('quoteId')
const randomBtn = document.getElementById('randomBtn')
const randomDisplay = document.getElementById('randomQuoteDisplay')

let quotes = getAllQuotes()

function createQuoteElement(quote) {
  const divElement = document.createElement('div')
  divElement.setAttribute('data-id', quote.id)
  divElement.innerHTML = `<p>${quote.content}</p>
  <p>${quote.author}</p>`
  addEditDeleteButton(divElement, quote.id)
  return divElement
}
function addEditDeleteButton(quoteElement, quoteId) {
  const editButton = document.createElement('button')
  editButton.classList.add('edit-btn')
  editButton.dataset.id = quoteId
  editButton.textContent = 'Edit'
  quoteElement.appendChild(editButton)
  editButton.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id)
    const divElement = e.target.parentElement
    const quoteContent = divElement.firstElementChild
    const quoteAuthor = quoteContent.nextElementSibling
    idInput.value = id
    contentInput.value = quoteContent.textContent
    authorInput.value = quoteAuthor.textContent
  })

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-btn')
  deleteButton.dataset.id = quoteId
  deleteButton.textContent = 'Delete'
  quoteElement.appendChild(deleteButton)
  deleteButton.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id)
    deleteQuote(id)
    quotes = getAllQuotes()
    deleteQuoteFromDOM(id)
    saveQuotes()
  })
}

function addQuoteToDOM(quote) {
  const el = createQuoteElement(quote)
  quoteList.appendChild(el)
}

function updateQuoteInDOM(quote) {
  const el = quoteList.querySelector(`div[data-id="${quote.id}"]`)
  if (el) {
    const pQuote = el.firstElementChild
    const pAuthor = pQuote.nextElementSibling
    pQuote.innerHTML = `${quote.content}`
    pAuthor.innerHTML = `${quote.author}`
  }
}

function deleteQuoteFromDOM(id) {
  const el = quoteList.querySelector(`div[data-id="${id}"]`)
  if (el) {
    quoteList.removeChild(el)
  }
}

function renderQuotes() {
  quoteList.innerHTML = ''
  if (quotes.length > 0) quotes.forEach((q) => addQuoteToDOM(q))
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  const content = contentInput.value.trim()
  const author = authorInput.value.trim()
  const id = Number(idInput.value)

  if (!content || !author) return

  if (id) {
    const updatedQuote = updateQuote(id, content, author)
    quotes = getAllQuotes()
    updateQuoteInDOM(updatedQuote)
    saveQuotes()
  } else {
    const newQuote = addQuote(content, author)
    quotes = getAllQuotes()
    addQuoteToDOM(newQuote)
    saveQuotes()
  }

  contentInput.value = ''
  authorInput.value = ''
  idInput.value = ''
})

randomBtn.addEventListener('click', showRandomQuote)

function showRandomQuote() {
  if (quotes.length === 0) {
    randomDisplay.textContent = '-- No quotes to show --'
  } else {
    const random = quotes[Math.floor(Math.random() * quotes.length)]
    randomDisplay.textContent = `"${random.content}" — ${random.author}`
  }
}

// ==============================
// Write your code here
// ==============================
function loadQuotes() {}
function saveQuotes() {}

loadQuotes()
renderQuotes()
