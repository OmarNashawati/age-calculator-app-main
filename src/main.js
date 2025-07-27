import "./style.css";
import { ageCalculator } from "./ageCalculator.js";

const calculateButton = document.querySelector(".js-calculate-button");
const yearsInputEle = document.querySelector(".js-year-input");
const monthsInputEle = document.querySelector(".js-month-input");
const daysInputEle = document.querySelector(".js-day-input");

const yearsResultEle = document.querySelector(".js-result-years");
const monthsResultEle = document.querySelector(".js-result-months");
const daysResultEle = document.querySelector(".js-result-days");

calculateButton.addEventListener("click", () => {
  clearElements();

  let year = getEnteredValue(yearsInputEle);
  let month = getEnteredValue(monthsInputEle);
  let day = getEnteredValue(daysInputEle);

  console.log(year, month, day);

  if (year.isValid && month.isValid && day.isValid) {
    let age = ageCalculator(day.value, month.value, year.value);

    yearsResultEle.innerText = age.year;
    monthsResultEle.innerText = age.month;
    daysResultEle.innerText = age.day;
  }
});

function getEnteredValue(ele) {
  let value = ele.querySelector("input").value;
  let isValid = checkInputValue(value, ele);
  return { value, isValid };
}

function checkInputValue(value, ele) {
  let isValid = true;
  if (value === "") {
    renderError("this field is required", ele);
    isValid = false;
  } else if (value === 0 || value === "0") {
    renderError("value can not be 0", ele);
    isValid = false;
  } else {
    if (ele.classList.contains("js-year-input")) {
      const date = new Date();
      if (value > date.getFullYear()) {
        renderError(
          `year have to be equal to or smaller than ${date.getFullYear()}`,
          ele
        );
        isValid = false;
      }
    }
    if (ele.classList.contains("js-month-input")) {
      if (value > 12) {
        renderError("year have to be equal to or smaller than 2025", ele);
        isValid = false;
      }
    }
    if (ele.classList.contains("js-day-input")) {
      if (value > 31) {
        renderError("day have to be value between 1 and 31", ele);
        isValid = false;
      }
    }
  }

  return isValid;
}

function clearElements() {
  document.querySelectorAll(".input-title").forEach((ele) => {
    ele.classList.remove("red");
  });

  document.querySelectorAll("input").forEach((ele) => {
    ele.classList.remove("red-border");
  });

  document.querySelectorAll(".error-message").forEach((ele) => {
    ele.innerHTML = "";
  });
}

function renderError(msg, ele) {
  ele.querySelector(".error-message").innerText = msg;
  ele.querySelector(".input-title").classList.add("red");
  ele.querySelector("input").classList.add("red-border");
}
