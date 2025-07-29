import './style.css'
import { ageCalculator } from './ageCalculator.js'

const form = document.querySelector('form')

const yearsInputEle = document.querySelector('.js-input-item-year')
const monthsInputEle = document.querySelector('.js-input-item-month')
const daysInputEle = document.querySelector('.js-input-item-day')

const yearsResultEle = document.querySelector('.js-result-item-years')
const monthsResultEle = document.querySelector('.js-result-item-months')
const daysResultEle = document.querySelector('.js-result-item-days')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  clearElements()

  let year = getEnteredValue(yearsInputEle)
  let month = getEnteredValue(monthsInputEle)
  let day = getEnteredValue(daysInputEle)

  if (year.isValid && month.isValid && day.isValid) {
    let age = ageCalculator(day.value, month.value, year.value)

    yearsResultEle.innerText = age.years
    monthsResultEle.innerText = age.months
    daysResultEle.innerText = age.days
  }
})

function getEnteredValue(ele) {
  let value = Math.abs(ele.querySelector('input').value)
  let isValid = checkInputValue(value, ele)
  return { value, isValid }
}

function checkInputValue(value, ele) {
  let isValid = true
  if (!value) {
    renderError('this field is required', ele)
    isValid = false
  } else {
    const date = new Date()
    if (ele.classList.contains('js-input-item-year') && value > date.getFullYear()) {
      renderError(`Year must be ${date.getFullYear()} or earlier.`, ele)
      isValid = false
    }
    if (ele.classList.contains('js-input-item-month') && value > 12) {
      renderError('Month must be between 1 and 12.', ele)
      isValid = false
    }
    if (ele.classList.contains('js-input-item-day') && value > 31) {
      renderError('Day must be between 1 and 31.', ele)
      isValid = false
    }
  }

  return isValid
}

function renderError(msg, ele) {
  ele.querySelector('.error-message').innerText = msg
  ele.querySelector('.input-title').classList.add('red')
  ele.querySelector('input').classList.add('red-border')
}

function clearElements() {
  document.querySelectorAll('.input-title').forEach((ele) => {
    ele.classList.remove('red')
  })

  document.querySelectorAll('input').forEach((ele) => {
    ele.classList.remove('red-border')
  })

  document.querySelectorAll('.error-message').forEach((ele) => {
    ele.innerHTML = ''
  })
}
