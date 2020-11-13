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
      this.isSwipe = true;
      //swipe
      this.swipe = {
        startX: 0,
        deltaX: 0,
        startTime: 0,
        maxTime: 300,
        minDistance: 40,
        maxDistance: 220,
        prevBoundary: -36,
        nextBoundary: 36,
        widthSlider: this.slider.getBoundingClientRect().width,
      };
    }

    setTranslateX(element, value) {
      element.style.transform = `translateX(${value}%)`;
    }

    moveSliderOneStep() {
      const CURRENT_STEP = this.counterShiftSlider * this.step;
      this.setTranslateX(this.slider, CURRENT_STEP);
    }

    removeTransitionSlider() {
      //для непомітного зміщення слайдера в інший кінець
      this.slider.classList.remove('slider__slideList--moveTransition');
    }
    addTransitionSlider() {
      if (this.slider.closest('.slider__slideList--moveTransition')) return;
      this.slider.classList.add('slider__slideList--moveTransition');
    }

    getOpossiteBoundary(moveDirection) {
      return moveDirection === undefined
        ? undefined
        : this.counterShiftSlider === this.startBoudarySlider &&
          moveDirection === 'next'
        ? this.endBoundarySlider
        : this.counterShiftSlider === this.endBoundarySlider &&
          moveDirection === 'prev'
        ? this.startBoudarySlider
        : undefined;
    }

    moveToOpossiteBoundary(moveDirection) {
      const boundary = this.getOpossiteBoundary(moveDirection);
      if (boundary === undefined) return;

      this.removeTransitionSlider();
      this.counterShiftSlider = boundary;
      this.setTranslateX(this.slider, this.counterShiftSlider * this.step);
      this.helperCaruselSlides.forEach((slide) => {
        slide.style.transform = `translateX(${boundary * -100}%)`;
      });
    }

    moveHelperCaruselSlides(moveDirection) {
      if (
        this.counterShiftSlider < this.helperBoundary ||
        this.counterShiftSlider === this.startBoudarySlider
      ) {
        return;
      }

      const TRANSLATEX_VALUE =
        moveDirection === 'next' ? 0 : 100 * this.amountSlides;
      const INDEX = Math.abs(this.counterShiftSlider) - 1;
      this.setTranslateX(this.helperCaruselSlides[INDEX], TRANSLATEX_VALUE);
    }

    carusel(moveDirection) {
      this.moveToOpossiteBoundary(moveDirection);
      this.moveHelperCaruselSlides(moveDirection);
    }

    calcIndexActiveSlide() {
      return this.counterShiftSlider === this.endBoundarySlider
        ? 0
        : Math.abs(this.counterShiftSlider);
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
      this.addTransitionSlider();
      setTimeout(() => {
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
          // this.inVisibleArea = 1;
          // this.helperBoundary = -this.inVisibleArea;
          // this.helperCaruselSlides = [...this.slides].splice(
          //   0,
          //   this.inVisibleArea
          // );
        }

        e.preventDefault();
        this.swipe.slideWidth = this.slider.getBoundingClientRect().width;
        this.swipe.startX = e.changedTouches[0].clientX;
        this.removeTransitionSlider();
        // this.swipe.startTime = Date.now();
      });

      this.slider.addEventListener('touchmove', (e) => {
        e.preventDefault();
        // Різниця між поточним дотиком і стартовим дотиком;
        this.swipe.deltaX = e.changedTouches[0].clientX - this.swipe.startX;
        // Значення різниці з пікселів в проценти;
        this.swipe.deltaXPersentage = parseInt(
          (this.swipe.deltaX / this.swipe.widthSlider) * 100
        );
        // Якщо відстань свайпу більше певної області слайдера вліво
        if (this.swipe.deltaXPersentage < this.swipe.prevBoundary) {
          // змінюємо слайд;
          this.trottledSlideSwitch.call(this, this.previousSlide, 500);
          // Моментально повертаємо слайдер і слайди в початкову позицію;
          // Затримка необхіна для синхронизації, щоб не було "перескакувань";
          if (this.counterShiftSlider === this.endBoundarySlider) {
            setTimeout(() => this.carusel('prev'), 500);
          }
        }

        // Рухаємо слайдер із слайдами при утримуванні дотику;
        if (this.swipe.deltaXPersentage > this.swipe.prevBoundary) {
          const step =
            this.step * this.counterShiftSlider + this.swipe.deltaXPersentage;
          this.setTranslateX(this.slider, step);
        }

        console.log(this.counterShiftSlider);
      });

      this.slider.addEventListener('touchend', (e) => {
        e.preventDefault();
        // При свайпі не було зміни слайду,
        // повертаємо поточний слайд в початкове положення;
        if (Math.abs(this.swipe.deltaXPersentage) < this.swipe.nextBoundary) {
          this.addTransitionSlider();
          this.setTranslateX(this.slider, this.step * this.counterShiftSlider);
        }
        // const duration = Date.now() - this.swipe.startTime;
        // const distance = Math.abs(this.swipe.deltaX);
        // if (
        //   distance < this.swipe.minDistance ||
        //   distance > this.swipe.maxDistance ||
        //   duration > this.swipe.maxTime
        // ) {
        //   return;
        // }

        // if (this.swipe.deltaX < 0) {
        //   this.trottledSlideSwitch.call(this, this.previousSlide, 500);
        // } else {
        //   this.trottledSlideSwitch.call(this, this.nextSlide, 500);
        // }

        // this.swipe.deltaX = 0
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
