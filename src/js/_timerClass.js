import { createElementAddClasses, countTime } from "./_utils.js";
import LOCALSTORAGE from "./_utils.js";
import DATA_NAME from "./_data.js";

export default class Timer {
  constructor(name, time = 0, running = false, lastKnownRealTime = null) {
    this.name = name;
    this.nameId = this.name.replace(" ", "_");
    this.lastKnownRealTime = lastKnownRealTime;
    this.time = time;
    this.status = null;
    this.interval = false;
    this.buttonNames = ["Start", "Stop", "Reset"];
    this.prepareDOM();
    if (running === "start" && lastKnownRealTime) {
      const diffTime = Math.floor((Date.now() - this.lastKnownRealTime) / 1000);
      // console.log("startTime", this.time);
      this.time += diffTime;
      // console.log("end time", this.time);
      this.start();
    } else if (running === "start" && !lastKnownRealTime) {
      this.start();
    }
  }
  prepareDOM = function () {
    const $stoperContent = document.querySelector(".content-wrapper");
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
      const getData = LOCALSTORAGE.read(DATA_NAME);
      delete getData[this.name];
      LOCALSTORAGE.override(DATA_NAME, getData);

      const toDelete = event.target.parentElement.parentElement;
      toDelete.parentElement.removeChild(toDelete);
    });
    stoperTop.append(stoperName, stoperShut);

    const stoperValue = createElementAddClasses("div", "c-timer__value");
    stoperValue.id = this.nameId;
    stoperValue.innerText = countTime(this.time);

    const stoperButtons = createElementAddClasses(
      "div",
      "o-flex",
      "c-timer__buttons",
      "o-flex--center",
      "controls"
    );
    this.buttonNames.forEach((buttonName) => {
      const elem = createElementAddClasses("div", "c-button", "o-flex__item");
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
    $stoperContent.append(stoperWrapper);
  };

  render = function (resetValue) {
    if (resetValue !== "reset" && resetValue === undefined) {
      this.time++;
    }
    let time = countTime(this.time);
    this.lastKnownRealTime = Date.now();
    const $timerValue = document.getElementById(this.nameId);
    $timerValue.innerText = time;
    LOCALSTORAGE.write(
      DATA_NAME,
      {
        time: this.time,
        status: this.status,
        realTime:
          resetValue !== "reset" && resetValue === undefined
            ? this.lastKnownRealTime
            : null,
      },
      this.name
    );
  };

  start = function () {
    this.status = "start";
    this.interval = setInterval(this.render.bind(this), 1000);
  };

  stop = function () {
    clearInterval(this.interval);
    this.interval = false;
    this.status = "stop";
    LOCALSTORAGE.write(
      DATA_NAME,
      {
        time: this.time,
        status: this.status,
        realTime: this.lastKnownRealTime,
      },
      this.name
    );
  };

  reset = function () {
    clearInterval(this.interval);
    this.interval = false;
    this.time = 0;
    this.render("reset");
    this.status = "null";
  };
}
