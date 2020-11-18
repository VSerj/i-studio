import { runBurger } from './menu_btn.js';
import { rollOut } from './rollout_fade_effect.js';
import { stretchHeader } from './stretch_header.js';
import { runButtonUp } from './button_up.js';
import { Slider } from './slider';
import { selectNavLink } from './select-nav-link.js';

window.addEventListener('load', () => {
  stretchHeader();
  rollOut(
    document.querySelectorAll('.fade, .counter__number'),
    `${document.querySelector('.header').offsetHeight + 'px'} 0px 0px 30px`
  );
  runBurger();
  runButtonUp();
  selectNavLink(document.querySelector('.nav'));
  new Slider(
    {
      slider: document.querySelector('.slider__slideList'),
      slides: document.querySelectorAll('.slider__item'),
      prevBtn: document.querySelector('.slider-btn__previous'),
      nextBtn: document.querySelector('.slider-btn__next'),
      toggles: document.querySelectorAll('.slider__toggle'),
      activeSlide: document.querySelector('.slider__item.slide--isActive'),
      activeToggle: document.querySelector('.slider__toggle.slide--isActive'),
    },
    {
      inVisibleArea: 2,
      slideWidth: 70,
      activeSelector: 'slide--isActive',
      transitionSelector: 'slider__slideList--moveTransition',
      delayTrottled: 500,
    }
  ).run();
});
