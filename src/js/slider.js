'use strict'

export const runSlider = () => {

  const setting = {
    loop: true,   //зацикленный
    slidesInArea: 2,  //колисество слайдов в области просмотра
    slideWidth: 70,   //проценты от области слайдера
    activeSelector: 'slider__item--active',
  }

  const sliderElems = {
    slider: document.querySelector('.slider'),
    slides: document.querySelectorAll('.carusel'),
    prevBtn: document.querySelector('.slider-btn__previous'),
    nextBtn: document.querySelector('.slider-btn__next'),
    activeSlide: document.querySelector('.slider__item--active'),
  }

  class Slider {
    constructor(sliderElems, options) {
      //научится делать пробросы ошибок для неверных параметров(потом)
      this.options = options;
      this.loop = this.options.loop;
      this.slidesInArea = this.options.slidesInArea;
      this.slideWidth = this.options.slideWidth;
      this.activeSelector = this.options.activeSelector

      this.sliderElems = sliderElems;
      this.slider = sliderElems.slider;
      this.slides = sliderElems.slides;
      this.nextBtn = sliderElems.nextBtn;
      this.prevBtn = sliderElems.prevBtn;
      this.amountSlides = sliderElems.slides.length;

      this.activeSlides = [sliderElems.activeSlide];

      this.minIndex = -1;
      this.maxIndex = this.amountSlides + 1;
      this.currentIndex = 0;
      this.shift = 0; //shift transform: translateX

      this.firstCopySlide = document.querySelector('.slider__copyFirst') //temp
      this.lastCopySlide = document.querySelector('.slider__copyLast') //temp
    }

    increaseShift(value) {
      return this.shift += value
    }

    reduceShift(value) {
      return this.shift += value * -1
    }

    setSliderTranslateX(value) {
      return this.slider.style.transform = `translateX(${value}%)`
    }

    setActiveSlide(slide) {
      return this.activeSlides.push[slide]
    }

    isActiveSelector(slide) {
      return slide.matches(`.${this.activeSelector}`)
    }

    addActiveSelector(slide) {
      if (this.isActiveSelector(slide)) return

      this.setActiveSlide(slide)
      return slide.classList.add(this.activeSelector)
    }

    removeActiveSelector() {
      if (!this.activeSlides.length) return

      this.activeSlides.forEach(
        slide => slide.classList.remove(this.activeSelector)
      )
      return this.activeSlides.length = 0
    }

    move(step, direction) {
      if (!step && !direction) return

      if (direction === 'forward') {
        return this.setSliderTranslateX(this.increaseShift(step))
      }

      if (direction === 'backward') {
        return this.setSliderTranslateX(this.reduceShift(step))
      }
    }

    carusel() {
      if (this.currentIndex === 0) {
        this.addActiveSelector(this.slides[0])
        this.lastCopySlide.style.transform = `translateX(-100%)`

        return console.log('carusel === 0')
      }

      if (this.currentIndex === this.minIndex) {
        this.removeActiveSelector()
        this.setSliderTranslateX((this.amountSlides - 1) * this.slideWidth * -1)
        this.addActiveSelector(this.lastCopySlide)

        this.firstCopySlide.style
          .transform = `translateX(${100 * this.amountSlides}%)`
        this.lastCopySlide.style
          .transform = `translateX(${100 * (this.amountSlides - 1)}%)`
        this.currentIndex = this.amountSlides - 1
        this.addActiveSelector(this.slides[this.amountSlides - 1])
        return console.log('carusel === minIndex')
      }

      // if (this.currentIndex === this.minIndex) {

      //   return console.log('carusel === minIndex + 1')
      // }

      // if (!this.currentIndex && !this.maxIndex) {
      // }

    }

    nextSlide() {
      this.move(this.slideWidth, 'forward')
      this.currentIndex--
      this.carusel()
    }

    previousSlide() {

    }
    //Создание клонов для крайних слайдов
    // makeGluingSlides() {
    //   this.gluingSlides = {
    //     first: this.slides[0].cloneNode(true),
    //     lastCopySlide: this.slides[this.amountSlides - 1].cloneNode(true),
    //   }
    // }

    // addGluingSlides() {
    //   this.makeGluingSlides()

    //   s.prepend(this.gluingSlides.first)
    //   s.append(this.gluingSlides.lastCopySlide)
    //   s.firstChild.classList.add('slider__copy', 'slider__copyFirst')
    //   s.lastChild.classList.add('slider__copy', 'slider__copyLast')
    // }

    test() {
    }

    run() {
      if (this.loop) {
        this.carusel() //temp
      }
      this.nextBtn.addEventListener('click', this.nextSlide.bind(this))
      this.prevBtn.addEventListener('click', this.previousSlide.bind(this))
    }
  }

  const projectSlider = new Slider(sliderElems, setting)
  projectSlider.run()

  projectSlider.test()
}
