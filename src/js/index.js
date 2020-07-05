"use strict";
let menuButton = document.querySelector(".menu_btn");
let header = document.getElementById("header");
let isAddedListener;

menuButton.addEventListener("click", useNavigation);
window.addEventListener("scroll", changeHeightHeader);
window.addEventListener("resize", adaptiveHeaderForDesktop);

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

function changeHeightHeader() {
  if (window.scrollY) {
    header.classList.add("is_scrolling");
  } else {
    header.classList.remove("is_scrolling");
  }

  isAddedListener = true;
}

function adaptiveHeaderForDesktop() {
  const minDesktopWidth = 1200;
  const currentDesktopWidth = () => document.documentElement.clientWidth;
  const isDesktopWidth = () => currentDesktopWidth() >= minDesktopWidth;

  if (!isDesktopWidth()) {
    window.removeEventListener("scroll", changeHeightHeader);
    isAddedListener = false;
    
    if (!header.classList.contains("is_scrolling")) return;
    header.classList.remove("is_scrolling");
    
  } else if (!isAddedListener) {
    window.addEventListener("scroll", changeHeightHeader);

    isAddedListener = true;
  }
}
