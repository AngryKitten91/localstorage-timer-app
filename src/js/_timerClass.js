import { createElementAddClasses, countTime } from "./_utils.js";
import LOCALSTORAGE from "./_utils.js";

export default class Timer {
  constructor(name, time = 0, running = false) {
    this.name = name;
    this.nameId = this.name.replace(" ", "_");
    this.time = time;
    this.interval = false;
    this.buttonNames = ["Start", "Stop", "Reset"];
    this.prepareDOM();
    if (running) {
      this.start();
    }
  }
  prepareDOM = function () {
    const stoperContent = document.querySelector(".js-timer");
    let stoperWrapper = createElementAddClasses("div", "c-timer");

    let stoperTop = createElementAddClasses(
      "div",
      "o-flex",
      "o-flex--spaceBetween"
    );
    let stoperName = createElementAddClasses(
      "div",
      "c-timer__name",
      "o-flex__item"
    );
    stoperName.innerText = this.name;
    let stoperShut = createElementAddClasses(
      "div",
      "c-button",
      "o-flex__item",
      "c-timer__buttons",
      "c-button--close"
    );
    stoperShut.innerText = "X";
    stoperShut.addEventListener("click", (event) => {
      this.stop();
      const getData = LOCALSTORAGE.read("data");
      delete getData[this.name];
      LOCALSTORAGE.override("data", getData);
      // let timerNameIndex = timerNames.indexOf(this.name);
      // timerNames.splice(timerNameIndex, 1);
      let toDelete = event.target.parentElement.parentElement;
      toDelete.parentElement.removeChild(toDelete);
    });
    stoperTop.append(stoperName, stoperShut);

    let stoperValue = createElementAddClasses("div", "c-timer__value");
    stoperValue.id = this.nameId;
    stoperValue.innerText = countTime(this.time);

    let stoperButtons = createElementAddClasses(
      "div",
      "o-flex",
      "c-timer__buttons",
      "o-flex--center"
    );
    this.buttonNames.forEach((buttonName) => {
      let elem = createElementAddClasses("div", "c-button", "o-flex__item");
      elem.innerText = buttonName;
      if (buttonName === "Start") {
        elem.addEventListener("click", (event) => {
          if (this.interval === false) {
            this.start();
          }
        });
      } else if (buttonName === "Stop") {
        elem.addEventListener("click", (event) => {
          this.stop();
        });
      } else if (buttonName === "Reset") {
        elem.addEventListener("click", (event) => {
          this.reset();
        });
      }

      stoperButtons.append(elem);
    });
    stoperWrapper.append(stoperTop, stoperValue, stoperButtons);
    stoperContent.append(stoperWrapper);
  };

  render = function (resetValue) {
    if (resetValue !== "reset" && resetValue === undefined) {
      this.time++;
    }
    let time = countTime(this.time);
    let timerValue = document.getElementById(this.nameId);
    timerValue.innerText = time;
    LOCALSTORAGE.write("data", this.time, this.name);
  };

  start = function () {
    this.interval = setInterval(this.render.bind(this), 1000);
  };

  stop = function () {
    clearInterval(this.interval);
    this.interval = false;
  };

  reset = function () {
    clearInterval(this.interval);
    this.interval = false;
    this.time = 0;
    this.render("reset");
  };
}
