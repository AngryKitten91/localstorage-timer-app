import Timer from "./_timerClass.js";
import LOCALSTORAGE from "./_utils.js";

const $addBtn = document.getElementById("js-addBtn");
const $msgBox = document.querySelector(".c-box__msg");

// var timerNames = [];
const initialValues = LOCALSTORAGE.read("data")
  ? LOCALSTORAGE.read("data")
  : [];

if (Object.keys(initialValues).length > 0) {
  const keys = Object.keys(initialValues);
  keys.forEach((elem) => {
    const timerValue = initialValues[elem].time;
    const status = initialValues[elem].status;
    const lastKnownRealTime = initialValues[elem].realTime;

    return new Timer(elem, timerValue, status, lastKnownRealTime);
  });
}

$addBtn.addEventListener("click", function () {
  const names = LOCALSTORAGE.read("data")
    ? Object.keys(LOCALSTORAGE.read("data"))
    : [];
  let inputValue = this.parentElement.children[0].value;
  let isNameUsed = names.some((elem) => elem === inputValue);

  if (!isNameUsed && inputValue) {
    // timerNames.push(inputValue);
    $msgBox.children[0].classList.add("u-fadeIn");
    $msgBox.children[0].innerText = "Timer added successfully :)";
    setTimeout(() => {
      $msgBox.children[0].classList.remove("u-fadeIn");
      $msgBox.children[0].classList.add("u-fadeOut");
    }, 2000);
    LOCALSTORAGE.write(
      "data",
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
});
