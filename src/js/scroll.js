"use strict"

let header = {
  elem: document.querySelector("header"),
  selectorLowerHeight: "header--lower",
  addLowerHeight: function () {
    this.elem.classList.add(this.selectorLowerHeight)
  },
  removeLowerHeight: function () {
    this.elem.classList.remove(this.selectorLowerHeight)
  },
  checkScrolling: isWindowScrolling,
  changeHeightWhenScroliing: function () {
    if (this.checkScrolling()) {
      this.addLowerHeight()
    } else {
      this.removeLowerHeight()
    }
  },
}

header.changeHeightWhenScroliing()

window.addEventListener("scroll", header.changeHeightWhenScroliing.bind(header))

function isWindowScrolling() {
  return !!window.scrollY
}
