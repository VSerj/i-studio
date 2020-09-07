'use strict'

const header = document.querySelector('header')
const headerStretch = 'header--stretch'

window.addEventListener('scroll', changeHeaderHeight)

function changeHeaderHeight() {
  if (!window.scrollY && !checkStretch()) {
    header.classList.add(headerStretch)
  } 
  if (window.scrollY && checkStretch()) {
    header.classList.remove(headerStretch)
  }

  function checkStretch() {
    return header.classList.contains(headerStretch)
  }
}

