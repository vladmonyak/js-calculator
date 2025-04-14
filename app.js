const display = document.querySelector('.calculator__display')
const historyDisplay = document.querySelector('.calculator__history')
const buttons = document.querySelectorAll('.calculator__button')

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    switch (button.innerText) {
      case 'AC':
        display.innerText = '0'
        historyDisplay.innerText = ''
        break
      case '+/−':
        display.innerText = '−'
        break
      case '%':
        const passedText = display.innerText + '/ 100'
        display.innerText = eval(passedText)
        break
      case '=':
        try {
          const expression = display.innerText
            .replace(/−/g, '-')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
          const result = eval(expression)
          historyDisplay.innerText = display.innerText + ' ='
          display.innerText = result
        } catch (error) {
          display.innerText = 'Ошибка'
        }
        break
      default:
        if (display.innerText === '0') {
          if (button.innerText === '.') {
            display.innerText += button.innerText 
          } else {
            display.innerText = button.innerText
          }
        } else {
          display.innerText += button.innerText
        }
        break
    }
  })
})