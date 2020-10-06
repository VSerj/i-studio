'use strict'

const header = document.querySelector('header')
const headerStretch = 'header--stretch'
const observerElems = document.querySelectorAll('.fade')

window.addEventListener('load', () => {

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

      observer.unobserve(entry.target)

    }

  })

}, optionsObs)

function addObserver(observerList) {

  observerList.forEach(el => {

    observer.observe(el)

  });

}


