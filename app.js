const historyIcon = document.querySelector('.calculator__icon')
const historyPanel = document.querySelector('.calculator__history')
const calculations = document.querySelector('.calculator__calculations')
const display = document.querySelector('.calculator__display')
const buttons = document.querySelectorAll('.calculator__button')

let historyVisible = false
const history = []

historyIcon.addEventListener('click', () => {
  historyVisible = !historyVisible
  if (historyVisible) {
    historyPanel.style.display = 'block'
  } else {
    historyPanel.style.display = 'none'
    historyPanel.style.pointerEvents = 'none'
  }
})

const addToHistory = (expression, result) => {
  history.push({ expression, result })

  const entry = document.createElement('div')
  entry.className = 'calculator__history-entry'

  const expr = document.createElement('div')
  expr.className = 'calculator__history-expression'
  expr.innerText = expression

  const equal = document.createElement('div')
  equal.className = 'calculator__history-equal'
  equal.innerText = '='

  const res = document.createElement('div')
  res.className = 'calculator__history-result'
  res.innerText = result

  expr.addEventListener('click', () => {
    display.innerText = expression
  })

  res.addEventListener('click', () => {
    display.innerText = result
  })

  entry.appendChild(expr)
  entry.appendChild(equal)
  entry.appendChild(res)

  historyPanel.prepend(entry)
}

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    switch (button.innerText) {
      case 'AC':
        display.innerText = '0'
        calculations.innerText = ''
        break
      case '+/−':
        if (display.innerText.startsWith('-')) {
          display.innerText = display.innerText.slice(1)
        } else {
          display.innerText = '-' + display.innerText
        }
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
          calculations.innerText = display.innerText + ' ='
          display.innerText = result
          addToHistory(expression, result)
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