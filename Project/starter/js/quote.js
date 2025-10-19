const quotes = []
let nextId = 1
function addQuote(content, author) {
  const prevLength = quotes.length
  const newQuote = { id: nextId++, content, author }

  if (quotes.push(newQuote) === prevLength + 1) {
    return newQuote
  }
  return undefined
}

function updateQuote(id, content, author) {
  const quote = quotes.find((q) => q.id === id)
  if (quote) {
    quote.content = content
    quote.author = author
  }

  return quote
}

function deleteQuote(id) {
  const index = quotes.findIndex((q) => q.id === id)
  if (index !== -1) {
    quotes.splice(index, 1)
  }
  return index
}

function getQuoteById(id) {
  return quotes.find((q) => q.id === parseInt(id))
}

function getAllQuotes() {
  const currentQuotes = [...quotes]
  return currentQuotes
}

function loadQuotesFromStorage(loadedQuotes) {
  quotes.length = 0

  if (Array.isArray(loadedQuotes) && loadedQuotes.length > 0) {
    let maxId = 0
    loadedQuotes.forEach((q) => {
      const id = Number(q.id)
      const content = typeof q.content === 'string' ? q.content : ''
      const author = typeof q.author === 'string' ? q.author : ''
      if (!Number.isNaN(id)) {
        quotes.push({ id, content, author })
        if (id > maxId) maxId = id
      }
    })
    nextId = maxId + 1
  } else {
    nextId = 1
  }
}
export { addQuote, deleteQuote, updateQuote, getAllQuotes, getQuoteById, loadQuotesFromStorage}
