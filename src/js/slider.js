'use strict';

export const runSlider = () => {
  const setting = {
    loop: true, //зацикленный
    inVisibleArea: 2, //колисество слайдов в области просмотра
    slideWidth: 70, //проценты от области слайдера
    activeSelector: 'slide--isActive',
  };

  const sliderElems = {
    slider: document.querySelector('.slider__slideList'),
    slides: document.querySelectorAll('.slider__item'),
    prevBtn: document.querySelector('.slider-btn__previous'),
    nextBtn: document.querySelector('.slider-btn__next'),
    toggles: document.querySelectorAll('.slider-toggle'),
    activeSlide: document.querySelector('.slider__item.slide--isActive'),
    activeToggle: document.querySelector('.slider-toggle.slide--isActive'),
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
      this.toggles = sliderElems.toggles;
      this.activeSlide = sliderElems.activeSlide;
      this.activeToggle = sliderElems.activeToggle;
      this.helperCaruselSlides = [...this.slides].splice(0, this.inVisibleArea);
      //Counters and boundary
      this.amountSlides = sliderElems.slides.length;
      this.counterShiftSlider = 0;
      this.startBoudarySlider = 0;
      this.endBoundarySlider = -this.amountSlides;
      this.helperBoundary = -this.inVisibleArea;
      //state
      this.isTrottled = false;
      //swipe
      this.swipe = {
        startX: 0,
        currentX: 0,
        deltaX: 0,
        startTime: 0,
        maxTime: 270,
        minDistance: 40,
        maxDistance: 140,
      };
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

    setActiveSlideAndToggle() {
      this.removeActiveSlideAndToggle();
      const index = this.calcIndexActiveSlide();
      this.activeSlide = this.slides[index];
      this.activeSlide.classList.add(this.activeSelector);
      this.activeToggle = this.toggles[index];
      this.activeToggle.classList.add(this.activeSelector);
    }

    removeActiveSlideAndToggle() {
      this.activeToggle.classList.remove(this.activeSelector);
      this.activeSlide.classList.remove(this.activeSelector);
    }

    nextSlide() {
      this.carusel('next');
      this.counterShiftSlider++;
      this.setActiveSlideAndToggle();
      //затримка - для непомітного виконання зміщеннь при carusel
      setTimeout(() => {
        this.addTransitionSlider();
        this.moveSliderOneStep();
      }, 50);
    }

    previousSlide() {
      this.carusel('prev');
      this.counterShiftSlider--;
      this.setActiveSlideAndToggle();
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
      this.slider.addEventListener('touchstart', (e) => {
        //для мобільки
        if (window.innerWidth <= 768 && this.step !== 100) {
          this.step = 100;
        }

        e.preventDefault();
        
        this.swipe.startX = e.changedTouches[0].clientX;
        this.swipe.startTime = Date.now();
      });

      this.slider.addEventListener('touchmove', (e) => {
        e.preventDefault();

        this.swipe.currentX = e.changedTouches[0].clientX;
        this.swipe.deltaX = this.swipe.currentX - this.swipe.startX;
      });

      this.slider.addEventListener('touchend', (e) => {
        e.preventDefault();

        const duration = Date.now() - this.swipe.startTime;
        const distance = Math.abs(this.swipe.deltaX);
        if (
          distance < this.swipe.minDistance ||
          distance > this.swipe.maxDistance ||
          duration > this.swipe.maxTime
        ) {
          return;
        }

        if (this.swipe.deltaX < 0) {
          this.trottledSlideSwitch.call(this, this.previousSlide, 500);
        } else {
          this.trottledSlideSwitch.call(this, this.nextSlide, 500);
        }
      });

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
