'use strict'

// Использвал API window.matchMedia : https://www.w3schools.com/jsref/met_win_matchmedia.asp

export const stretchHeader = () => {
  const STRETCH_SELECTOR = 'header--stretch' //меняет высоту header`а
  const header = document.querySelector('.header')
  //обьект медиазапроса (API window.matchMedia)
  const BREAKPOINT_SM_DESKTOP = window.matchMedia('(max-width: 1000px)') 
  let isHandlerStretch = false //указывает на существование слушателя скрола
  
  stretch()

  window.addEventListener('scroll', stretch)
  
  // "Включает" прослушку на изменение ширины экрана используя метод API window.matchMedia
  BREAKPOINT_SM_DESKTOP.addListener(changesExistenceListener)
  
  // Обработчик,который убирает/добавляет слушатель и STRETCH_SELECTOR
  // при изменениии ширины экрана. 
  // При ширины экрана 1000 и меньше, нам не нужно "растягивать" хеадер
  function changesExistenceListener() {
    if (BREAKPOINT_SM_DESKTOP.matches && isHandlerStretch) {
      window.removeEventListener('scroll', stretch)
  
      if (header.classList.contains(STRETCH_SELECTOR)) {
        header.classList.remove(STRETCH_SELECTOR)
      }

      isHandlerStretch = false
    }
  
    if (!BREAKPOINT_SM_DESKTOP.matches && !isHandlerStretch) {
      stretch()
      window.addEventListener('scroll', stretch)
      isHandlerStretch = true
    }
  }

  // меняет высоту header`а добавляя STRETCH_SELECTOR в зависимости от уловий
  function stretch() {
    (
      !header.classList.contains(STRETCH_SELECTOR) &&
      !window.scrollY &&
      !BREAKPOINT_SM_DESKTOP.matches
    )
    ? header.classList.add(STRETCH_SELECTOR)
    : header.classList.remove(STRETCH_SELECTOR)
  }
}
