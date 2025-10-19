const box = document.getElementById('box')
const buttons = document.querySelectorAll('button')

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const color = button.dataset.color
    box.style.background = color
    box.textContent = color.toUpperCase()
  })
})
