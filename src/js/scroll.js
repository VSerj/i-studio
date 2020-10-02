'use strict'

const header = document.querySelector('header')
const headerStretch = 'header--stretch'
const listMovingItems = document.querySelectorAll('[data-move-side]')

window.addEventListener('DOMContentLoaded', throttleScroll)
window.addEventListener('scroll', throttleScroll)

function throttleScroll() {

  window.requestAnimationFrame(function() {
    changeHeaderHeight()
    moveItems()
  })

}

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

function moveItems() {

  function isPartiallyVisible(el) {

    let elementBoundary = el.getBoundingClientRect()

    let top = elementBoundary.top
    let bottom = elementBoundary.bottom

    return top + 10 < document.documentElement.clientHeight && bottom - header.clientHeight - 10 > 0

  }

  listMovingItems.forEach(el => {

    if (isPartiallyVisible(el)) {

      switch (el.dataset.moveSide) {

        case 'right':
          el.classList.add('move-to-right')
          break

        case 'left':
          el.classList.add('move-to-left')
          break

        case 'top':
          el.classList.add('move-to-top')
          break

      }
    }

  });
}

