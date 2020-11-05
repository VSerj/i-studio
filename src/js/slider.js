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
    slides: document.querySelectorAll('.slider__slideList > .slider__item'),
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
      this.slideWidth = this.options.slideWidth;
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
      this.minIndex = this.amountSlides * -1;
      this.maxIndex = this.amountSlides - this.slidesInArea;
      this.currentIndex = 0;
      this.prevIndex = 0;
      this.currentShift = 0; //Slider - transform: translateX
      this.positionSlider = 0;
      //temp
      this.positionStartBox = this.slideWidth * this.slidesInArea * -1;
      this.positionEndBox = this.slideWidth * this.slidesInArea;
      this.startBox = document.querySelector('.slider__gluingBoxStart');
      this.endBox = document.querySelector('.slider__gluingBoxEnd');
    }

    increaseShift(value) {
      return this.currentShift += value
    }

    reduceShift(value) {
      return this.currentShift += value * -1
    }

    move(element, step) {
      // if (!step && !element) return

      return element.style.transform = `translateX(${step}%)`
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

    gluing() {
      if (this.currentIndex === 0) {
        this.startBox.hidden = true
        this.endBox.hidden = true
        this.move(this.endBox, this.positionEndBox)
        this.move(this.startBox, this.positionStartBox)
      }
      
      if (
        this.currentIndex > 0 
        && this.currentIndex <= this.slidesInArea
        ) {
        this.startBox.hidden = false
        this.endBox.hidden = true
        this.move(this.endBox, this.positionEndBox)
        const step = this.positionStartBox + (this.currentIndex * this.slideWidth)
        this.move(this.startBox, step)
      }
      
      if (this.currentIndex < 0 && this.currentIndex >= -this.slidesInArea) {
        this.startBox.hidden = true
        this.endBox.hidden = false
        this.move(this.startBox, this.positionStartBox)
        const step = this.positionEndBox + (this.currentIndex * this.slideWidth)
        this.move(this.endBox, step)
      }
    }

    nextSlide() {
      this.currentIndex++
      this.gluing()
      const step = this.positionSlider + (this.currentIndex * this.slideWidth)
      if (this.currentIndex <= this.maxIndex) {
        this.move(this.slider, step)
      }
    }
    
    previousSlide() {
      this.currentIndex--
      this.gluing()
      const step = this.positionSlider + (this.currentIndex * this.slideWidth)
      if (this.currentIndex >= this.minIndex) {
        this.move(this.slider, step)
      }
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
