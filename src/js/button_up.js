'use strict'

export function runButtonUp() {
  const buttonUp = document.querySelector('.button-up')

  buttonUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  })

  showHideButtonUp()
  window.addEventListener('scroll', showHideButtonUp)

  //провера. избавляет от дальнейших действий основной функции при скроле
  function checkOptimizeAdding() {
    return (buttonUp.classList.contains('button-up--isActive') && window.scrollY > window.innerHeight)
  }

  function showHideButtonUp() {
    if (checkOptimizeAdding()) return

    (window.scrollY > window.innerHeight)
      ? buttonUp.classList.add('button-up--isActive')
      : buttonUp.classList.remove('button-up--isActive')
  }
}


