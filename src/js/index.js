'use strict'

document.querySelector('.menu_btn').addEventListener('click',showMenu);

function showMenu() {
  document.querySelector('.header_nav').classList.toggle('active_menu');
}