const expressionElement = document.querySelector('.calculator__expression')
const resultElement = document.querySelector('.calculator__result')
const buttons = document.querySelectorAll('.calculator__button')

let expression = ''
let result = 0

const infixToPostfix = (exp) => {
  const output = []
  const operatots = []
  const precedence = {
    '+': 1,
    '−': 1,
    '×': 2,
    '÷': 2
  }

  const tokens = exp.match(/\d+(?:[.,]\d+)?|\+|−|×|÷/g)

  tokens.forEach((token) => {
    if (/\d+/.test(token)) {
      output.push(token)
    } else if ('+−×÷'.includes(token)) {
      while (
        operatots.length > 0 &&
        precedence[operatots[operatots.length - 1]] >= precedence[token]) {
        output.push(operatots.pop())
      }
      operatots.push(token)
    }
  })

  while (operatots.length > 0) {
    output.push(operatots.pop())
  }

  return output.join(' ')
}

const calculatePostfix = (postfix) => {
  const stack = []
  const tokens = postfix.split(' ')

  tokens.forEach((token) => {
    if (/\d/.test(token)) {
      stack.push(parseFloat(token.replace(',', '.')))
    } else {
      const b = stack.pop()
      const a = stack.pop()
      switch (token) {
        case '+':
          stack.push(a + b)
          break;
        case '−':
          stack.push(a - b)
          break;
        case '×':
          stack.push(a * b)
          break;
        case '÷':
          stack.push(a / b)
          break;
      }
    }
  })

  return stack.pop()
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.innerText

    switch (buttonText) {
      case 'AC':
        resultElement.innerText = '0'
        expressionElement.innerText = ''
        expression = ''
        break

      case '=':
        if (expression) {
          expressionElement.innerText = expression
          const postfix = infixToPostfix(expression)
          result = calculatePostfix(postfix)
          resultElement.innerText = result.toString()
        }
        break

      default:
        if (resultElement.innerText === '0') {
          if (buttonText === ',') {
            resultElement.innerText += buttonText
          } else {
            resultElement.innerText = buttonText
          }
        } else {
          resultElement.innerText += buttonText
        }

        expression += (buttonText === ',' ? '.' : buttonText)
        // expressionElement.innerText = expression
        break
    }
  })
})