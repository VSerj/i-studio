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
      this.startSlidesInArea = [...this.slides].splice(0,2);
      //Counters and boundary
      this.amountSlides = sliderElems.slides.length;
      this.counterShiftSlider = 0;
      this.counterShiftSlide = 0;
      //temp
    }

    move(element, step) {
      const value = this.counterShiftSlider * step
      return element.style.transform = `translateX(${value}%)`
    }

    moveSlidesToEndOfSlider(slides) {
      slides.forEach(slide => {
        slide.style.transform = `translateX(${this.amountSlides * 100}%)`
      })
    }

    moveSliderToAmountSlides() {
      return this.slider.style.transform = `translateX(-${this.amountSlides * this.step}%)`
    }
    
    setTranslateX(element, value) {
      element.style.transform = `translateX(${value}%)`
    }

    startMovingSlider() {
      this.addTransitionSlider()
      this.move(this.slider, this.step)
    }

    clearTransitionSlider() {
      this.slider.classList.remove('moving')
    }

    addTransitionSlider() {
      this.slider.classList.add('moving')
    }

    nextSlide() {
      switch (this.counterShiftSlider) {
        case 0:
          this.counterShiftSlider = -this.amountSlides
          this.clearTransitionSlider()
          this.moveSliderToAmountSlides()
          this.moveSlidesToEndOfSlider(this.startSlidesInArea)
          break;
        case -this.amountInArea:
          this.setTranslateX(this.startSlidesInArea[1], 0)
          break;
        case -this.amountInArea + 1: 
          this.setTranslateX(this.startSlidesInArea[0], 0)
          break;
      }

      this.counterShiftSlider++
      setTimeout(() => this.startMovingSlider(), 50)

    }
    
    previousSlide() {
      switch (this.counterShiftSlider) {
        case -this.amountSlides:
          this.counterShiftSlider = 0
          this.clearTransitionSlider()
          this.setTranslateX(this.slider, 0)
          this.setTranslateX(this.startSlidesInArea[0], 0)
          this.setTranslateX(this.startSlidesInArea[1], 0)
          break;
        case -this.amountInArea + 1:
          this.setTranslateX(this.startSlidesInArea[0], this.amountSlides * 100)
          break;
        case -this.amountInArea: 
          this.setTranslateX(this.startSlidesInArea[1], this.amountSlides * 100)
          break;
      }

      this.counterShiftSlider--
      setTimeout(() => this.startMovingSlider(), 50)
    }

    test() {
    }

    run() {
      // if (this.loop) {
      //   // this.carusel() //temp
      // }
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this))
      this.prevBtn.addEventListener('click', this.previousSlide.bind(this))
    }
  }

  const projectSlider = new Slider(sliderElems, setting)
  projectSlider.run()

  projectSlider.test()
}
