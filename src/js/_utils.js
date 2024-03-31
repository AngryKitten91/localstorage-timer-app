export function countTime(time) {
  const hourseconds = 60 * 60;
  const minuteSeconds = 60;
  let hours = Math.floor(time / hourseconds);
  let minutes = Math.floor((time % hourseconds) / minuteSeconds);
  let sec = Math.floor((time % hourseconds) % minuteSeconds);

  return `${addZeroOrNot(hours)}:${addZeroOrNot(minutes)}:${addZeroOrNot(sec)}`;
}

function addZeroOrNot(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

export function createElementAddClasses(element, ...classes) {
  let elem = document.createElement(element);
  elem.classList.add(...classes);
  return elem;
}

export default class LOCALSTORAGE {
  static override(key, obj) {
    localStorage.setItem(key, JSON.stringify({ ...obj }));
  }
  static write(key, data, name) {
    const existingData = this.read(key);
    if (existingData === null) {
      localStorage.setItem(key, JSON.stringify({ [name]: data }));
    } else {
      localStorage.setItem(
        key,
        JSON.stringify({ ...existingData, [name]: data })
      );
    }
  }

  static read(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static readItem(key, itemName) {
    const value = JSON.parse(localStorage.getItem(key));
    return value.find(({ uuid }) => uuid === itemName);
  }
}
