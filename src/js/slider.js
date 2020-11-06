'use strict'

export const runSlider = () => {

  const setting = {
    loop: true,   //зацикленный
    slidesInArea: 2,  //колисество слайдов в области просмотра
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
      //научится делать пробросы ошибок для неверных параметров(потом)

      //Options
      this.options = options;
      this.loop = this.options.loop;
      this.slidesInArea = this.options.slidesInArea;
      this.step = this.options.slideWidth;
      this.activeSelector = this.options.activeSelector
      //DOM elements
      this.sliderElems = sliderElems;
      this.slider = sliderElems.slider;
      this.slides = sliderElems.slides;
      this.nextBtn = sliderElems.nextBtn;
      this.prevBtn = sliderElems.prevBtn;
      this.activeSlides = [sliderElems.activeSlide];
      //Counters and boundary
      this.amountSlides = sliderElems.slides.length;
      this.counterShiftSlider = 0;
      this.counterSwipeSlide = 0;
      this.currentShift = 0; //Slider - transform: translateX
      //temp
      this.counterReverse = 1
    }

    // increaseShift(value) {
    //   return this.counterShiftSlider * value
    // }

    // reduceShift(value) {
    //   return this.counterShiftSlider *value * -1
    // }

    move(element, step) {
      // if (!step && !element) return
      const value = this.counterShiftSlider * step
      return element.style.transform = `translateX(${value}%)`
    }

    addActiveSlide(slide) {
      return this.activeSlides.push(slide)
    }

    isActiveSelector(slide) {
      return slide.matches(`.${this.activeSelector}`)
    }

    addActiveSelector(slide) {
      if (this.isActiveSelector(slide)) return

      this.addActiveSlide(slide)
      return slide.classList.add(this.activeSelector)
    }

    removeActiveAll() {
      if (!this.activeSlides.length) return

      this.activeSlides.forEach(
        slide => slide.classList.remove(this.activeSelector)
      )
      return this.activeSlides.length = 0
    }



    nextSlide() {
      this.counterShiftSlider++
      this.counterSwipeSlide++ //для одної ітерації зміщення слайдів

      if (this.counterSwipeSlide > this.amountSlides) {
        this.counterSwipeSlide = 1
        this.counterReverse++
      }

      this.move(this.slider, this.step)

      let slideInd = this.amountSlides - this.counterSwipeSlide
      this.slides[slideInd].style.transform = `translateX(-${this.amountSlides * 100 * this.counterReverse}%)`

    }
    
    previousSlide() {
      // this.counterShiftSlider--
      
      // if (this.counterSwipeSlide > this.amountSlides - 1) {
      //   this.counterSwipeSlide = 0
      //   this.counterReverse--
      // }
      
      // this.move(this.slider, this.step)
      
      // let slideInd = this.counterSwipeSlide
      // this.slides[slideInd].style.transform = `translateX(${300 * this.counterReverse}%)`
      // this.counterSwipeSlide++ //для одної ітерації зміщення слайдів
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
