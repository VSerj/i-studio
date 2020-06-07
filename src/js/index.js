'use strict'

document.querySelector('.menu_btn').addEventListener('click',showMenu)

function showMenu() {
  document.querySelector('.header_nav').classList.toggle('active_menu')
}

let currentElem = null;

document.addEventListener('mouseover', function(e) {
  let target = e.target.closest('.active_menu')

  if(!target) return
  
  currentElem = target
  document.body.classList.add('lock_flow')
})

document.addEventListener('mouseout', function(e) {
  if(!currentElem) return

  let relatedTarget = e.relatedTarget

  while(relatedTarget) {
    if (relatedTarget == currentElem) return
    relatedTarget = relatedTarget.parentNode
  }

  document.body.classList.remove('lock_flow')
  currentElem = null;

})