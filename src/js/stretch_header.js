'use strict'

const stetchSelector = 'header--stretch'
const header = document.querySelector('.header')
const BREAKPOINT_SM_DESKTOP = 1000
let isHandlerExist = false

stretchHeader()
stretchHeader = establishExistHandler(stretchHeader)

window.addEventListener('scroll', stretchHeader)
window.addEventListener('resize', () => {

  if (window.innerWidth <= BREAKPOINT_SM_DESKTOP && isHandlerExist) {

    window.removeEventListener('scroll', stretchHeader)

    if (header.classList.contains(stetchSelector)) {
      header.classList.remove(stetchSelector)
    }

    isHandlerExist = false
  }

  if (window.innerWidth > BREAKPOINT_SM_DESKTOP && !isHandlerExist) {
    window.addEventListener('scroll', stretchHeader)
    isHandlerExist = true
  }

})

function establishExistHandler(handler) {

  if (!isHandlerExist) {
    isHandlerExist = true
    return handler
  }

  return handler

}

function stretchHeader() {

  (!header.classList.contains(stetchSelector) && !window.scrollY && window.innerWidth > BREAKPOINT_SM_DESKTOP)
    ? header.classList.add(stetchSelector)
    : header.classList.remove(stetchSelector)

}
