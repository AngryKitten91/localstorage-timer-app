import Timer from "./_timerClass.js";
import LOCALSTORAGE from "./_utils.js";

// var timerNames = [];
const initialValues = LOCALSTORAGE.read("data")
  ? LOCALSTORAGE.read("data")
  : [];

if (Object.keys(initialValues).length > 0) {
  const keys = Object.keys(initialValues);
  keys.map((elem) => {
    const timerValue = initialValues[elem];
    return new Timer(elem, timerValue);
  });
}

const $addBtn = document.getElementById("js-addBtn");
$addBtn.addEventListener("click", function () {
  let $msgBox = document.querySelector(".c-box__msg");
  const names = LOCALSTORAGE.read("data")
    ? Object.keys(LOCALSTORAGE.read("data"))
    : [];
  console.log(names);
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
    LOCALSTORAGE.write("data", 0, inputValue);
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
