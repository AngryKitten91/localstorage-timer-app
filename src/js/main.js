import Timer from "./_timerClass.js";
import LOCALSTORAGE from "./_utils.js";
import DATA_NAME from "./_data.js";

const $addBtn = document.getElementById("js-addBtn");
const $msgBox = document.querySelector(".c-box__msg");
const $input = document.querySelector(".main-input");

// var timerNames = [];
const initialValues = LOCALSTORAGE.read(DATA_NAME)
  ? LOCALSTORAGE.read(DATA_NAME)
  : [];

// console.log("initial", initialValues);
if (Object.keys(initialValues).length > 0) {
  const keys = Object.keys(initialValues);
  keys.forEach((elem) => {
    const timerValue = initialValues[elem].time;
    const status = initialValues[elem].status;
    const lastKnownRealTime = initialValues[elem].realTime;

    new Timer(elem, timerValue, status, lastKnownRealTime);
  });
} else {
  new Timer("Example Timer", 0, "start");
  // console.log("timer from initial load");
}

$addBtn.addEventListener("click", onInteract);
$input.addEventListener("keypress", onInteract);

function onInteract(e) {
  if (e.key === "Enter" || e.type == "click") {
    const names = LOCALSTORAGE.read(DATA_NAME)
      ? Object.keys(LOCALSTORAGE.read(DATA_NAME))
      : [];
    let inputValue = this.parentElement.children[0].value;
    let isNameUsed = names.some((elem) => elem === inputValue);

    if (!isNameUsed && inputValue) {
      // timerNames.push(inputValue);
      $msgBox.children[0].classList.add("u-fadeIn");
      $msgBox.children[0].innerText = "Timer added successfully :)";
      this.parentElement.children[0].value = "";
      setTimeout(() => {
        $msgBox.children[0].classList.remove("u-fadeIn");
        $msgBox.children[0].classList.add("u-fadeOut");
      }, 2000);
      LOCALSTORAGE.write(
        DATA_NAME,
        { time: 0, status: null, realTime: null },
        inputValue
      );
      return new Timer(inputValue);
    } else if (!inputValue) {
      $msgBox.children[1].classList.add("u-fadeIn");
      $msgBox.children[1].innerText = "Please enter timer name.";
      setTimeout(() => {
        $msgBox.children[1].classList.remove("u-fadeIn");
        $msgBox.children[1].classList.add("u-fadeOut");
      }, 2000);
    } else {
      $msgBox.children[1].classList.add("u-fadeIn");
      $msgBox.children[1].innerText =
        "Name already exists, please enter different name.";
      setTimeout(() => {
        $msgBox.children[1].classList.remove("u-fadeIn");
        $msgBox.children[1].classList.add("u-fadeOut");
      }, 2000);
    }
  }
}
