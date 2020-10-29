'use strict'

export const runSlider = () => {
  //temp
  const slider = document.querySelector('.slider')
  const slides = document.querySelectorAll('.slider__item')
  const currentSlide = document.querySelector('.slider__item--active')
  const nextBtn = document.querySelector('.slider-btn__next')
  const btnPrev = document.querySelector('.slider-btn__previous')
  const activeSlide = document.querySelector('.slider-item--active')

  const setting = {
    infinite: true,   //зацикленный
    auto: true,
    slidesInArea: 2,  //колисество слайдов в области просмотра
    slideWidth: 70,   //проценты
    activeSelector: 'slider__item--active',
  }

  const sliderElems = {
    slider,
    slides,
    btnPrev,
    nextBtn,
    currentSlide,
  }

  class Slider {
    constructor(sliderElems, options) {
      this.sliderElems = sliderElems;

      this.slider = sliderElems.slider;
      this.slides = sliderElems.slides;
      this.currentSlide = sliderElems.currentSlide;
      this.nextBtn = this.sliderElems.nextBtn;
      this.prevBtn = this.sliderElems.btnPrev;
      this.numberOfSlides = this.slides.length || 0; //количество слайдов

      this.options = options;

      this.infinite = this.options.infinite;
      this.auto = this.options.auto;
      this.slidesInArea = this.options.slidesInArea || 0;
      this.slideWidth = this.options.slideWidth;
      this.activeSelector = this.options.activeSelector

      this.currentIndex = 0;
      this.currentShiftTranslate = 0; //shift transform: translateX
    }

    move(step) {
      return this.slider.style.transform = `translateX(${step}%)`
    }

    setActiveSlide() {
      if (this.currentSlide.matches(`.${this.activeSelector}`)) {
        this.currentSlide.classList.remove(this.activeSelector)
      }

      this.slides[this.currentIndex].classList.add(this.activeSelector)
      this.currentSlide = this.slides[this.currentIndex]
    }

    nextSlide() {
      const endBoundaryIndex = this.numberOfSlides - this.slidesInArea
      if (this.currentIndex > endBoundaryIndex) {
        return console.log('Листайте в другую сторону'); //temp
      }

      this.currentShiftTranslate += this.slideWidth * -1
      this.move(this.currentShiftTranslate)

      this.currentIndex++

      this.setActiveSlide()
    }

    previousSlide() {
      const startBoundaryIndex = 0
      if (this.currentIndex <= startBoundaryIndex) {
        return console.log('Листайте в другую сторону'); //temp
      }

      this.currentShiftTranslate += this.slideWidth
      this.move(this.currentShiftTranslate)

      this.currentIndex--

      this.setActiveSlide()
    }

    test() {
      // console.log(this.currentSlide.matches(`.${this.activeSelector}`))
    }

    run() {
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this))
      this.prevBtn.addEventListener('click', this.previousSlide.bind(this))
    }
  }

  const projectSlider = new Slider(sliderElems, setting)
  projectSlider.run()
  projectSlider.test()
}
