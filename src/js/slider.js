'use strict';

export class Slider {
  constructor(sliderElems, options) {
    //Options
    this.options = options;
    this.inVisibleArea = this.options.inVisibleArea;
    this.step = this.options.slideWidth;
    this.activeSelector = this.options.activeSelector;
    this.transitionSelector = this.options.transitionSelector;
    this.delayTrottled = this.options.delayTrottled;
    //DOM elements
    this.sliderElems = sliderElems;
    this.slider = sliderElems.slider;
    this.slides = sliderElems.slides;
    this.nextBtn = sliderElems.nextBtn;
    this.prevBtn = sliderElems.prevBtn;
    this.toggles = sliderElems.toggles;
    this.activeSlide = sliderElems.activeSlide;
    this.activeToggle = sliderElems.activeToggle;
    this.helperLoopSlides = [...this.slides].splice(0, this.inVisibleArea);
    this.activeToggleID = 1;
    //Counters and boundary
    this.amountSlides = sliderElems.slides.length;
    this.counterShiftSlider = 0;
    this.startBoundarySlider = 0;
    this.endBoundarySlider = -this.amountSlides;
    this.helperBoundary = -this.inVisibleArea;
    //state
    this.isTrottled = false;
    this.isClickOnToggle = false;
    //swipe
    this.swipe = {
      startX: 0,
      deltaX: 0,
      startTime: 0,
      maxTime: 700,
      minDistance: 40,
      maxDistance: 420,
    };
  }

  setTranslateX(element, value) {
    element.style.transform = `translateX(${value}%)`;
  }

  moveSliderOneStep() {
    const currentStep = this.counterShiftSlider * this.step;
    this.setTranslateX(this.slider, currentStep);
  }

  removeTransitionSlider() {
    //для непомітного зміщення слайдера в інший кінець
    this.slider.classList.remove(this.transitionSelector);
  }

  addTransitionSlider() {
    if (this.slider.closest(`.${this.transitionSelector}`)) {
      return;
    }
    this.slider.classList.add(this.transitionSelector);
  }

  // якщо слайдер досягає заданих границі, то зміщуємо його до протилежної
  // для зацикленності
  loopMovingToOpositeBoundary(moveDirection) {
    const boundary = this.getOpositeBoundary(moveDirection);
    if (boundary === undefined) return;

    this.removeTransitionSlider();
    this.counterShiftSlider = boundary;
    this.setTranslateX(this.slider, boundary * this.step);
    this.helperLoopSlides.forEach((slide) => {
      slide.style.transform = `translateX(${boundary * -100}%)`;
    });
  }

  getOpositeBoundary(moveDirection) {
    return moveDirection === undefined
      ? undefined
      : this.counterShiftSlider === this.startBoundarySlider &&
        moveDirection === 'next'
      ? this.endBoundarySlider
      : this.counterShiftSlider === this.endBoundarySlider &&
        moveDirection === 'prev'
      ? this.startBoundarySlider
      : undefined;
  }

  // Переміщення слайдів, яких не видно в полі зору, для компенсації пустоти
  // на початку і кінці слайдера при повільному русі. Для зацикленості.
  moveHelperLoopSlides(moveDirection) {
    if (
      this.counterShiftSlider < this.helperBoundary ||
      this.counterShiftSlider === this.startBoundarySlider
    ) {
      return;
    }

    const step = moveDirection === 'next' ? 0 : 100 * this.amountSlides;
    const index = Math.abs(this.counterShiftSlider) - 1;
    this.setTranslateX(this.helperLoopSlides[index], step);
  }

  loopMoving(moveDirection) {
    this.loopMovingToOpositeBoundary(moveDirection);
    this.moveHelperLoopSlides(moveDirection);
  }

  calcIndexActiveSlide() {
    return Math.abs(this.counterShiftSlider) ===
      Math.abs(this.endBoundarySlider)
      ? 0
      : Math.abs(this.counterShiftSlider);
  }

  setActiveSlideAndToggle(index) {
    this.removeActiveSlideAndToggle();
    this.activeSlide = this.slides[index];
    this.activeSlide.classList.add(this.activeSelector);
    this.activeToggle = this.toggles[index];
    this.activeToggle.classList.add(this.activeSelector);
    this.activeToggleID = +this.activeToggle.dataset.toggleId;
  }

  removeActiveSlideAndToggle() {
    this.activeToggle.classList.remove(this.activeSelector);
    this.activeSlide.classList.remove(this.activeSelector);
  }

  switchSlide() {
    this.setActiveSlideAndToggle(this.calcIndexActiveSlide());
    if (this.isClickOnToggle) {
      this.removeTransitionSlider();
      this.moveSliderOneStep();
    } else {
      //затримка - для непомітного виконання зміщеннь при loop
      setTimeout(() => {
        this.addTransitionSlider();
        this.moveSliderOneStep();
      }, 50);
    }
  }

  nextSlide() {
    this.loopMoving('next');
    this.counterShiftSlider++;
    this.switchSlide();
  }

  prevSlide() {
    this.loopMoving('prev');
    this.counterShiftSlider--;
    this.switchSlide();
  }

  toggleMoving() {
    this.toggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const selectedToggleID = +toggle.dataset.toggleId;
        // різниця використовується для визначення напралення руху і
        // кроків для зміщення
        const deltaToggleID = selectedToggleID - this.activeToggleID;
        if (deltaToggleID === 0) {
          return;
        }
        // для запуску switchSlide без transiiton
        this.isClickOnToggle = true;
        // функція, яка імітує кліки і слугує для зміщення слайдера
        // на к-ть кроків до відповідного слайдера, визваного перемикачем
        const numberOfcallsToMove = (nameFuncToMove, counterOfCall) => {
          while (counterOfCall) {
            this[nameFuncToMove]();
            --counterOfCall;
          }
        };

        numberOfcallsToMove(
          deltaToggleID > 0 ? 'prevSlide' : 'nextSlide',
          Math.abs(deltaToggleID)
        );

        this.activeToggleID = selectedToggleID;
        this.isClickOnToggle = false;
      });
    });
  }

  swipeMoving() {
    this.slider.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.swipe.startX = e.changedTouches[0].clientX;
      this.swipe.startTime = Date.now();
    });

    this.slider.addEventListener('touchmove', (e) => {
      e.preventDefault();

      // Різниця між поточним дотиком і стартовим дотиком;
      this.swipe.deltaX = e.changedTouches[0].clientX - this.swipe.startX;
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
        this.trottledSlideSwitch.call(this, this.prevSlide, this.delayTrottled);
      } else {
        this.trottledSlideSwitch.call(this, this.nextSlide, this.delayTrottled);
      }

      this.swipe.deltaX = 0;
    });
  }
  //trottledSlideSwitch затримка для великії к-ті виклів ф-ції.
  //delayMs = duration в .slider__slideList--moveTransition.
  trottledSlideSwitch(func, delayMs) {
    if (this.isTrottled) return;

    func.call(this);

    setTimeout(() => (this.isTrottled = false), delayMs);
    this.isTrottled = true;
  }

  setParamsForScreen() {
    if (window.innerWidth <= 768 && this.step !== 100) {
      this.step = 100;
    }

    if (window.innerWidth >= 768 && this.step !== 70) {
      this.step = 70;
    }
  }

  init() {
    this.setParamsForScreen();
    window.addEventListener('resize', () => {
      this.setParamsForScreen();
    });
  }

  run() {
    this.init();
    this.toggleMoving();
    this.swipeMoving();
    this.nextBtn.addEventListener(
      'click',
      this.trottledSlideSwitch.bind(this, this.nextSlide, this.delayTrottled)
    );
    this.prevBtn.addEventListener(
      'click',
      this.trottledSlideSwitch.bind(this, this.prevSlide, this.delayTrottled)
    );
  }
}
