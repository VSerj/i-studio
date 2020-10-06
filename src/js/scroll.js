'use strict'

const header = document.querySelector('header')
const headerStretch = 'header--stretch'
const observerElems = document.querySelectorAll('.fade')

window.addEventListener('load', () => {
  console.log('ready');
  addObserver(observerElems)
  
})

let optionsObs = {

  root: null,
  rootMargin: '-100px 0px -30px 0px',
  threshold: 0

}

let observer = new IntersectionObserver( (entries, observer) => {

  entries.forEach( (entry) => {

    if (entry.isIntersecting) {
      
      entry.target.classList.add('rollUp')
      // entry.target.classList.contains('[data-t-delay]') ? 

      observer.unobserve(entry.target)

    }


  })

}, optionsObs)

function addObserver(observerList) {

  observerList.forEach(el => {

    observer.observe(el)

  });

}

// // window.addEventListener('DOMContentLoaded', throttleScroll)
// // window.addEventListener('scroll', throttleScroll)

// // function throttleScroll() {

// //   window.requestAnimationFrame(function() {
// //     changeHeaderHeight()
// //     moveItems()
// //   })

// // }

// // function changeHeaderHeight() {

// //   if (!window.scrollY && !checkStretch()) {
// //     header.classList.add(headerStretch)
// //   }

// //   if (window.scrollY && checkStretch()) {
// //     header.classList.remove(headerStretch)
// //   }

// //   function checkStretch() {
// //     return header.classList.contains(headerStretch)
// //   }

// // }

// // function moveItems() {

// //   function isPartiallyVisible(el) {

// //     let elementBoundary = el.getBoundingClientRect()

// //     let top = elementBoundary.top
// //     let bottom = elementBoundary.bottom

// //     return top + 10 < document.documentElement.clientHeight && bottom - header.clientHeight - 10 > 0

// //   }

// //   listMovingItems.forEach(el => {

// //     if (isPartiallyVisible(el)) {

// //       switch (el.dataset.moveSide) {

// //         case 'right':
// //           el.classList.add('move-to-right')
// //           break

// //         case 'left':
// //           el.classList.add('move-to-left')
// //           break

// //         case 'top':
// //           el.classList.add('move-to-top')
// //           break

// //       }
// //     }

// //   });
// // }

