const box = document.getElementById('box')

document.getElementById('add').addEventListener('click', () => {
  box.classList.add('bordered')
})

document.getElementById('remove').addEventListener('click', () => {
  box.classList.remove('bordered')
})

document.getElementById('toggle').addEventListener('click', () => {
  box.classList.toggle('bordered')
})
