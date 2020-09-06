'use strict'

const header = document.querySelector('header')
const headerStretch = 'header--stretch'

function changeHeaderHeight() {
  if (!window.scrollY && !checkStretch()) {
    header.classList.add(headerStretch)
  } 
  else if (checkStretch()) {
    header.classList.remove(headerStretch)
  }

  function checkStretch() {
    return header.classList.contains(headerStretch)
  }
}

window.addEventListener('scroll', changeHeaderHeight)
