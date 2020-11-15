import { runBurger } from './menu_btn.js';
import { rollOut } from './rollout_fade_effect.js';
import { stretchHeader } from './stretch_header.js';
import { runButtonUp } from './button_up.js';
import { Slider } from './slider';

window.addEventListener('load', () => {
  // stretchHeader()
  // rollOut(
  //   document.querySelectorAll('.fade'),
  //   `${document.querySelector('.header').offsetHeight + 'px'} 0px 0px 30px`
  // )
  // runBurger()
  // runButtonUp()
  new Slider(
    {
      slider: document.querySelector('.slider__slideList'),
      slides: document.querySelectorAll('.slider__item'),
      prevBtn: document.querySelector('.slider-btn__previous'),
      nextBtn: document.querySelector('.slider-btn__next'),
      toggles: document.querySelectorAll('.slider-toggle'),
      activeSlide: document.querySelector('.slider__item.slide--isActive'),
      activeToggle: document.querySelector('.slider-toggle.slide--isActive'),
    },
    {
      inVisibleArea: 2,
      slideWidth: 70, //проценты от области слайдера
      activeSelector: 'slide--isActive',
    }
  )
  .run();
});
