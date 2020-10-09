'use strict'

let burger = document.querySelector('.btn-burger')
let nav = document.querySelector('.nav')

document.addEventListener('click', function (e) {

  if (e.target.closest('.btn-burger')) {

    burger.classList.toggle('is_active_menu')
    nav.classList.toggle('is_active_menu')

  }

  if (!e.target.closest('.nav-panel-mobile') && !e.target.closest('.nav')) {

    burger.classList.remove('is_active_menu')
    nav.classList.remove('is_active_menu')

  }
  
})

