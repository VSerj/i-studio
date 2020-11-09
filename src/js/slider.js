'use strict'

export const runSlider = () => {
  const setting = {
    loop: true,   //зацикленный
    amountInArea: 2,  //колисество слайдов в области просмотра
    slideWidth: 70,   //проценты от области слайдера
    activeSelector: 'slider__item--active',
  }

  const sliderElems = {
    slider: document.querySelector('.slider__slideList'),
    slides: document.querySelectorAll('.slider__item'),
    prevBtn: document.querySelector('.slider-btn__previous'),
    nextBtn: document.querySelector('.slider-btn__next'),
    activeSlide: document.querySelector('.slider__item--active'),
  }

  class Slider {
    constructor(sliderElems, options) {
      //Options
      this.options = options;
      this.loop = this.options.loop;
      this.amountInArea = this.options.amountInArea;
      this.step = this.options.slideWidth;
      this.activeSelector = this.options.activeSelector
      //DOM elements
      this.sliderElems = sliderElems;
      this.slider = sliderElems.slider;
      this.slides = sliderElems.slides;
      this.nextBtn = sliderElems.nextBtn;
      this.prevBtn = sliderElems.prevBtn;
      this.startSlidesInArea = [...this.slides].splice(0, this.amountInArea);
      //Counters and boundary
      this.amountSlides = sliderElems.slides.length;
      this.counterShiftSlider = 0;
      this.counterShiftSlide = 0;
      //state
      this.isTrottled = false;
    }

    moveToCounterShiftSlider(element, step) {
      const value = this.counterShiftSlider * step
      return element.style.transform = `translateX(${value}%)`
    }
    
    setTranslateX(element, value) {
      element.style.transform = `translateX(${value}%)`
    }

    moveSlider() {
      this.addTransitionSlider()
      this.moveToCounterShiftSlider(this.slider, this.step)
    }

    clearTransitionSlider() {
      this.slider.classList.remove('slider__slideList--moveTransition')
    }

    addTransitionSlider() {
      if (this.slider.closest('.slider__slideList--moveTransition')) return
      this.slider.classList.add('slider__slideList--moveTransition')
    }

    setStartPositionElements() {
      this.counterShiftSlider = 0
      this.clearTransitionSlider()
      this.setTranslateX(this.slider, 0)
      this.startSlidesInArea.forEach(slide => {
        slide.style.transform = `translateX(${0}%)`
      })
    }

    setEndPositionElements() {
      this.counterShiftSlider = -this.amountSlides
      this.clearTransitionSlider()
      this.slider.style.transform = `translateX(-${this.amountSlides * this.step}%)`
      this.startSlidesInArea.forEach(slide => {
        slide.style.transform = `translateX(${this.amountSlides * 100}%)`
      })
    }

    nextSlide() {
      switch (this.counterShiftSlider) {
        case 0:
          this.setEndPositionElements()
          break;
        case -this.amountInArea:
          this.setTranslateX(this.startSlidesInArea[1], 0)
          break;
        case -this.amountInArea + 1: 
          this.setTranslateX(this.startSlidesInArea[0], 0)
          break;
      }

      this.counterShiftSlider++
      //затримка - для непомітного виконання setEndPositionElements()
      setTimeout(() => this.moveSlider(), 50)
    }

    previousSlide() {
      switch (this.counterShiftSlider) {
        case -this.amountSlides:
          this.setStartPositionElements()
          break;
        case -this.amountInArea + 1:
          this.setTranslateX(this.startSlidesInArea[0], this.amountSlides * 100)
          break;
        case -this.amountInArea: 
          this.setTranslateX(this.startSlidesInArea[1], this.amountSlides * 100)
          break;
      }

      this.counterShiftSlider--
      //затримка - для непомітного виконання setStartPositionElements()
      setTimeout(() => this.moveSlider(), 50)
    }

    //trottledSlideSwitch - затримка зміни слайда для уникнення дефектів.
    //delayMs = duration в .slider__slideList--moveTransition.
    trottledSlideSwitch(func, delayMs) {
      if (this.isTrottled) return

      func.call(this)

      setTimeout(() => this.isTrottled = false, delayMs)
      this.isTrottled = true
    }

    run() {
      this.nextBtn.addEventListener(
        'click',
        this.trottledSlideSwitch.bind(this, this.nextSlide, 500)
      )
      
      this.prevBtn.addEventListener(
        'click',
        this.trottledSlideSwitch.bind(this, this.previousSlide, 500)
      )
    }
  }

  const projectSlider = new Slider(sliderElems, setting)
  projectSlider.run()
}
