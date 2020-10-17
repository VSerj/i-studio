'use strict'

export const runBurger = () => {
  const burger = document.querySelector('.btn-burger')
  const nav = document.querySelector('.nav')

  document.addEventListener('click', function (e) {
    const { target } = e

    if (target.closest('.btn-burger')) {
      burger.classList.toggle('is_active_menu')
      nav.classList.toggle('is_active_menu')
    }

    if (!target.closest('.nav-panel-mobile') && !target.closest('.nav')) {
      burger.classList.remove('is_active_menu')
      nav.classList.remove('is_active_menu')
    }
  })
}
