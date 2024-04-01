(() => {
  "use strict";
  function e(e) {
    const s = 3600;
    let i = Math.floor(e / s),
      n = Math.floor((e % s) / 60),
      a = Math.floor((e % s) % 60);
    return `${t(i)}:${t(n)}:${t(a)}`;
  }
  function t(e) {
    return e < 10 ? "0" + e : e;
  }
  function s(e, ...t) {
    let s = document.createElement(e);
    return s.classList.add(...t), s;
  }
  class i {
    static override(e, t) {
      localStorage.setItem(e, JSON.stringify({ ...t }));
    }
    static write(e, t, s) {
      const i = this.read(e);
      null === i
        ? localStorage.setItem(e, JSON.stringify({ [s]: t }))
        : localStorage.setItem(e, JSON.stringify({ ...i, [s]: t }));
    }
    static read(e) {
      return JSON.parse(localStorage.getItem(e));
    }
    static readItem(e, t) {
      return JSON.parse(localStorage.getItem(e)).find(({ uuid: e }) => e === t);
    }
  }
  const n = "data";
  class a {
    constructor(e, t = 0, s = !1, i = null) {
      if (
        ((this.name = e),
        (this.nameId = this.name.replace(" ", "_")),
        (this.lastKnownRealTime = i),
        (this.time = t),
        (this.status = null),
        (this.interval = !1),
        (this.buttonNames = ["Start", "Stop", "Reset"]),
        this.prepareDOM(),
        "start" === s)
      ) {
        const e = Math.floor((Date.now() - this.lastKnownRealTime) / 1e3);
        (this.time += e), this.start();
      }
    }
    prepareDOM = function () {
      const t = document.querySelector(".content-wrapper");
      let a = s("div", "c-timer"),
        r = s("div", "o-flex", "o-flex--spaceBetween"),
        l = s("div", "c-timer__name", "o-flex__item");
      l.innerText = this.name;
      let c = s(
        "div",
        "c-button",
        "o-flex__item",
        "c-timer__buttons",
        "c-button--close"
      );
      (c.innerText = "X"),
        c.addEventListener("click", (e) => {
          this.stop();
          const t = i.read(n);
          delete t[this.name], i.override(n, t);
          const s = e.target.parentElement.parentElement;
          s.parentElement.removeChild(s);
        }),
        r.append(l, c);
      const d = s("div", "c-timer__value");
      (d.id = this.nameId), (d.innerText = e(this.time));
      const o = s(
        "div",
        "o-flex",
        "c-timer__buttons",
        "o-flex--center",
        "controls"
      );
      this.buttonNames.forEach((e) => {
        const t = s("div", "c-button", "o-flex__item");
        (t.innerText = e),
          "Start" === e
            ? t.addEventListener("click", (e) => {
                !1 === this.interval && this.start();
              })
            : "Stop" === e
            ? t.addEventListener("click", (e) => {
                this.stop();
              })
            : "Reset" === e &&
              t.addEventListener("click", (e) => {
                this.reset();
              }),
          o.append(t);
      }),
        a.append(r, d, o),
        t.append(a);
    };
    render = function (t) {
      "reset" !== t && void 0 === t && this.time++;
      let s = e(this.time);
      (this.lastKnownRealTime = Date.now()),
        (document.getElementById(this.nameId).innerText = s),
        i.write(
          n,
          {
            time: this.time,
            status: this.status,
            realTime:
              "reset" !== t && void 0 === t ? this.lastKnownRealTime : null,
          },
          this.name
        );
    };
    start = function () {
      (this.status = "start"),
        (this.interval = setInterval(this.render.bind(this), 1e3));
    };
    stop = function () {
      clearInterval(this.interval),
        (this.interval = !1),
        (this.status = "stop"),
        i.write(
          n,
          {
            time: this.time,
            status: this.status,
            realTime: this.lastKnownRealTime,
          },
          this.name
        );
    };
    reset = function () {
      clearInterval(this.interval),
        (this.interval = !1),
        (this.time = 0),
        this.render("reset"),
        (this.status = "null");
    };
  }
  const r = document.getElementById("js-addBtn"),
    l = document.querySelector(".c-box__msg"),
    c = document.querySelector(".main-input"),
    d = i.read(n) ? i.read(n) : [];
  function o(e) {
    if ("Enter" === e.key || "click" == e.type) {
      const e = i.read(n) ? Object.keys(i.read(n)) : [];
      let t = this.parentElement.children[0].value;
      if (!e.some((e) => e === t) && t)
        return (
          l.children[0].classList.add("u-fadeIn"),
          (l.children[0].innerText = "Timer added successfully :)"),
          (this.parentElement.children[0].value = ""),
          setTimeout(() => {
            l.children[0].classList.remove("u-fadeIn"),
              l.children[0].classList.add("u-fadeOut");
          }, 2e3),
          i.write(n, { time: 0, status: null, realTime: null }, t),
          new a(t)
        );
      t
        ? (l.children[1].classList.add("u-fadeIn"),
          (l.children[1].innerText =
            "Name already exists, please enter different name."),
          setTimeout(() => {
            l.children[1].classList.remove("u-fadeIn"),
              l.children[1].classList.add("u-fadeOut");
          }, 2e3))
        : (l.children[1].classList.add("u-fadeIn"),
          (l.children[1].innerText = "Please enter timer name."),
          setTimeout(() => {
            l.children[1].classList.remove("u-fadeIn"),
              l.children[1].classList.add("u-fadeOut");
          }, 2e3));
    }
  }
  Object.keys(d).length > 0
    ? Object.keys(d).forEach((e) => {
        const t = d[e].time,
          s = d[e].status,
          i = d[e].realTime;
        new a(e, t, s, i);
      })
    : new a("Example Timer"),
    r.addEventListener("click", o),
    c.addEventListener("keypress", o);
})();
