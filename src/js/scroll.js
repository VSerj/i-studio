"use strict"

let header = {
  elem: document.querySelector("header"),
  selectorLowHeight: "header--lower",
  addLowHeight: function () {
    this.elem.classList.add(this.selectorLowHeight)
  },
  removeLowHeight: function () {
    this.elem.classList.remove(this.selectorLowHeight)
  },
  checkScrolling: isWindowScrolling,
  changeHeightWhenScroliing: function () {
    if (this.checkScrolling()) {
      this.addLowHeight()
    } else {
      this.removeLowHeight()
    }
  },
}

header.changeHeightWhenScroliing()

window.addEventListener("scroll", header.changeHeightWhenScroliing.bind(header))

function isWindowScrolling() {
  return !!window.scrollY
}
