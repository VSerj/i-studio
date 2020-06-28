"use strict";
let menuButton = document.querySelector(".menu_btn");

menuButton.addEventListener("click", useNavigation);

function useNavigation() {
  useAnimationForBurger();
  showHideNavigation();
}

function useAnimationForBurger() {
  menuButton.classList.toggle("is_active_menu");
}

function showHideNavigation() {
  document.querySelector(".header_nav").classList.toggle("is_active_menu");
}

let header = document.getElementById("header");

window.addEventListener("scroll", changeHeightHeader);
window.addEventListener("resize", adaptiveHeaderForDesktop);

function changeHeightHeader() {
  if (window.scrollY) {
    header.classList.add("is_scrolling");
  } else {
    header.classList.remove("is_scrolling");
  }
}

function adaptiveHeaderForDesktop() {
  const minDesktopWidth = 1200;
  const currentDesktopWidth = () => document.documentElement.clientWidth;
  const isDesktopWidth = () => currentDesktopWidth() >= minDesktopWidth;
  
  if (!isDesktopWidth()) {
    window.removeEventListener("scroll", changeHeightHeader);

    if (!header.classList.contains("is_scrolling")) return;
    header.classList.remove("is_scrolling")

  } else {
    window.addEventListener("scroll", changeHeightHeader);
  }

}
