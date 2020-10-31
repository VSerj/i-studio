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
    loop: true,   //зацикленный
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

      //научится делать пробросы ошибок для неверных параметров(потом)
      this.options = options;
      this.loop = this.options.infinite;
      this.auto = this.options.auto;
      this.slidesInArea = this.options.slidesInArea;
      this.slideWidth = this.options.slideWidth;
      this.activeSelector = this.options.activeSelector

      this.sliderElems = sliderElems;
      this.slider = sliderElems.slider;
      this.slides = sliderElems.slides;
      this.currentSlide = sliderElems.currentSlide;
      this.nextBtn = sliderElems.nextBtn;
      this.prevBtn = sliderElems.btnPrev;
      this.numberOfSlides = sliderElems.slides.length;
      //если будут блоки для дублирования крайних слайдов, то откидаем
      this.startBoundaryIndex = this.slidesInArea - 1;
      this.endBoundaryIndex = this.numberOfSlides - this.slidesInArea - 1;
      this.currentIndex = this.slidesInArea - 1; 
      this.currentShiftTranslate = 0; //shift transform: translateX
    }

    move(step) {
      return this.slider.style.transform = `translateX(${step}%)`
    }

    setSelectorCurrentSlide() {
      return this.slides[this.currentIndex].classList.add(this.activeSelector)
    }

    removeSelectorCurrentSlide() {
      return this.currentSlide.classList.remove(this.activeSelector)
    }

    setCurrentSlide() {
      if (this.currentSlide.matches(`.${this.activeSelector}`)) {
        this.removeSelectorCurrentSlide()
      }

      this.setSelectorCurrentSlide()
      this.currentSlide = this.slides[this.currentIndex]
    }

    

    nextSlide() {
      if (this.currentIndex > this.endBoundaryIndex) {
        return console.log('Листайте в другую сторону'); //temp
      }

      this.currentShiftTranslate += this.slideWidth * -1
      this.move(this.currentShiftTranslate)

      this.currentIndex++

      this.setCurrentSlide()
    }

    previousSlide() {
      if (this.currentIndex <= this.startBoundaryIndex) {
        return console.log('Листайте в другую сторону'); //temp
      }

      this.currentShiftTranslate += this.slideWidth
      this.move(this.currentShiftTranslate)

      this.currentIndex--

      this.setCurrentSlide()
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
