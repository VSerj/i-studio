'use strict';

export const runSlider = () => {
  const setting = {
    loop: true, //зацикленный
    inVisibleArea: 2, //колисество слайдов в области просмотра
    slideWidth: 70, //проценты от области слайдера
    activeSelector: 'slider__item--active',
  };

  const sliderElems = {
    slider: document.querySelector('.slider__slideList'),
    slides: document.querySelectorAll('.slider__item'),
    prevBtn: document.querySelector('.slider-btn__previous'),
    nextBtn: document.querySelector('.slider-btn__next'),
    activeSlide: document.querySelector('.slider__item--active'),
  };

  class Slider {
    constructor(sliderElems, options) {
      //Options
      this.options = options;
      this.inVisibleArea = this.options.inVisibleArea;
      this.step = this.options.slideWidth;
      this.activeSelector = this.options.activeSelector;
      //DOM elements
      this.sliderElems = sliderElems;
      this.slider = sliderElems.slider;
      this.slides = sliderElems.slides;
      this.nextBtn = sliderElems.nextBtn;
      this.prevBtn = sliderElems.prevBtn;
      this.activeSlide = sliderElems.activeSlide;
      this.helperCaruselSlides = [...this.slides].splice(0, this.inVisibleArea);
      //Counters and boundary
      this.amountSlides = sliderElems.slides.length;
      this.counterShiftSlider = 0;
      this.startBoudarySlider = 0;
      this.endBoundarySlider = -this.amountSlides;
      this.helperBoundary = -this.inVisibleArea;
      //state
      this.isTrottled = false;
    }

    setTranslateX(element, value) {
      element.style.transform = `translateX(${value}%)`;
    }

    moveSliderOneStep() {
      const CURRENT_STEP = this.counterShiftSlider * this.step;
      this.setTranslateX(this.slider, CURRENT_STEP);
    }

    clearTransitionSlider() {
      //для непомітного зміщення слайдера в інший кінець
      this.slider.classList.remove('slider__slideList--moveTransition');
    }

    addTransitionSlider() {
      if (this.slider.closest('.slider__slideList--moveTransition')) return;
      this.slider.classList.add('slider__slideList--moveTransition');
    }

    setPositionWithAnotherBoundary(boundary) {
      this.counterShiftSlider = boundary;

      this.setTranslateX(this.slider, boundary * this.step);
      this.helperCaruselSlides.forEach((slide) => {
        slide.style.transform = `translateX(${boundary * -100}%)`;
      });
    }

    moveToAnotherBoundary(caruselDirection) {
      const boundary =
        this.counterShiftSlider === this.startBoudarySlider &&
        caruselDirection === 'next'
          ? this.endBoundarySlider
          : this.counterShiftSlider === this.endBoundarySlider &&
            caruselDirection === 'prev'
          ? this.startBoudarySlider
          : undefined;

      if (boundary === undefined) return;

      this.clearTransitionSlider();
      this.setPositionWithAnotherBoundary(boundary);
    }

    moveHelperCaruselSlides(direction) {
      if (
        this.counterShiftSlider < this.helperBoundary ||
        this.counterShiftSlider === this.startBoudarySlider
      ) {
        return;
      }

      const TRANSLATEX_VALUE =
        direction === 'next' ? 0 : 100 * this.amountSlides;
      const INDEX = this.counterShiftSlider * -1 - 1;
      this.setTranslateX(this.helperCaruselSlides[INDEX], TRANSLATEX_VALUE);
    }

    carusel(direction) {
      this.moveToAnotherBoundary(direction);
      this.moveHelperCaruselSlides(direction);
    }

    calcIndexActiveSlide() {
      return this.counterShiftSlider === this.endBoundarySlider
        ? 0
        : this.counterShiftSlider * -1;
    }

    setActiveSlide() {
      this.removePrevActiveSlide();

      this.activeSlide = this.slides[this.calcIndexActiveSlide()];
      this.activeSlide.classList.add(this.activeSelector);
    }

    removePrevActiveSlide() {
      this.activeSlide.classList.remove(this.activeSelector);
    }

    nextSlide() {
      this.carusel('next');
      this.counterShiftSlider++;
      this.setActiveSlide();
      //затримка - для непомітного виконання зміщеннь при carusel
      setTimeout(() => {
        this.addTransitionSlider();
        this.moveSliderOneStep();
      }, 50);
    }

    previousSlide() {
      this.carusel('prev');
      this.counterShiftSlider--;
      this.setActiveSlide();
      setTimeout(() => {
        this.addTransitionSlider();
        this.moveSliderOneStep();
      }, 50);
    }

    //trottledSlideSwitch - затримка зміни слайда для уникнення дефектів.
    //delayMs = duration в .slider__slideList--moveTransition.
    trottledSlideSwitch(func, delayMs) {
      if (this.isTrottled) return;

      func.call(this);

      setTimeout(() => (this.isTrottled = false), delayMs);
      this.isTrottled = true;
    }

    run() {
      this.nextBtn.addEventListener(
        'click',
        this.trottledSlideSwitch.bind(this, this.nextSlide, 500)
      );

      this.prevBtn.addEventListener(
        'click',
        this.trottledSlideSwitch.bind(this, this.previousSlide, 500)
      );
    }
  }

  const projectSlider = new Slider(sliderElems, setting);
  projectSlider.run();
};
