"use strict";
let btnBurger = document.querySelector(".btn-burger");
// let header = document.querySelector(".header");
// let isAddedListener;

btnBurger.addEventListener("click", useNavigation);

function useNavigation() {
  useAnimationForBurger();
  showHideNavigation();
}

function useAnimationForBurger() {
  btnBurger.classList.toggle("is_active_menu");
}

function showHideNavigation() {
  document.querySelector(".nav").classList.toggle("is_active_menu");
}