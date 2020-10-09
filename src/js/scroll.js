'use strict'

const header = document.querySelector('header')
const headerStretch = 'header--stretch'
const checkHeaderStretch = () => header.classList.contains(headerStretch)
let isListenerStretchHeader

const fadeElems = document.querySelectorAll('.fade')

window.addEventListener('load', () => {

  rollIn(fadeElems)
  stretchHeader()

  isListenerStretchHeader = true

  window.addEventListener('scroll', stretchHeader)
  window.addEventListener('resize', optimazeHeader)

})

function optimazeHeader() {

  let checkSmallScreen = () => window.innerWidth <= 1000

  let removeListenerStretchHeader = () => {

    window.removeEventListener('scroll', stretchHeader)

    if (checkHeaderStretch()) {

      header.classList.remove(headerStretch)

    }

    isListenerStretchHeader = false

  }

  let addListenerStretchHeader = () => {
    
    stretchHeader()
    window.addEventListener('scroll', stretchHeader)

    isListenerStretchHeader = true

  }

  if (checkSmallScreen() && isListenerStretchHeader) {

    removeListenerStretchHeader()

  }

  if (!checkSmallScreen() && !isListenerStretchHeader)
    addListenerStretchHeader()
}

function stretchHeader() {

  (!checkHeaderStretch() && !window.scrollY) ?
    header.classList.add(headerStretch) :
    header.classList.remove(headerStretch)

}

let optionsObs = {

  root: null,
  rootMargin: '-100px 0px -30px 0px',
  threshold: 0

}

let observerRollIn = new IntersectionObserver((entries, observer) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add('rollUp')
      observer.unobserve(entry.target)

    }

  })

}, optionsObs)

function rollIn(elemsList) {

  elemsList.forEach(el => {

    observerRollIn.observe(el)

  });

}
