'use strict'

export const runSlider = () => {
  const slider = document.querySelector('.slider')
  const slides = document.querySelectorAll('.slider__item')
  const nextBtn = document.querySelector('.slider-btn__next')
  const btnPrev = document.querySelector('.slider-btn__previous')
  const activeSlide = document.querySelector('.slider-item--active')

  const setting = {
    btnPrev,
    nextBtn,
    infinite: true,   //зацикленный
    toogles: true,    //для переключателей
    visibleSlide: 2,  //колисество слайдов в области просмотра
  }

  class Slider {
    constructor(sliderArea, slideList, options) {
      this.slider = sliderArea;
      this.slides = slideList;
      this.options = options;

      this.nextBtn = options.nextBtn;
      this.btnPrev = options.btnPrev;
      this.infinite = options.infinite;
      this.toogles = options.toogles;
      this.visibleSlide = options.visibleSlide

      this.activeSlide = 1;
    }

    next() {

    }

    previous() {

    }

    test() {
      console.log(this.visibleSlide);
    }

  }

  const projectSlider = new Slider(slider, slides, setting)
  projectSlider.test()
}

//1) При нажатии на кнопку влево/право идет смена 2ох картинок в области
//   просмотра слайдера
//2) Идет смена картинки 70% процентов от области просмотра и картинки - 30%
//3) Если картинки сменились - необходимо установить(запомн.) позицию(индекс)
//   текущей картинки (70%) для мобильного слайдера с переключателями
//4) 


// const email = document.querySelector('input[type="email"]')
// // const emailValidation = new Validadaror(email, setting)

// const setting = {
//   rules: {
//     min: 8,
//     max: 50,
//     match: 'email',
//   },
//   message: {
//     min: 'Поле должно содержать больше 8 символов',
//     max: 'Поле не должно содержать больше 8 символов',
//     match: 'Поле должно содержать валидный адрес е.почты',
//   },
//   onError: function() {
//     console.log('не успешная валидация');
//   },
//   onSuccess: function() {
//     console.log('успешная валидация');
//   }
// }

// const regExps = {
//   email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
//   url: /^((https?):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
//   numbers: /^\d+(\.\d{1,2})?$/,
//   digits: /[0-9]*$/,
//   letters: /[a-z][A-Z]*$/
// }

// class Validator {
//   constructor(elem, options) {
//     this.elem = elem,
//     this.options = options

//     this.value = this.elem.value.trim();
//     this.length = this.value.length;
//     this.rules = this.options.rules;
//     this.mesages = this.options.messages;
//   }

//   required() {
//     return this.length > 0;
//   }

//   min(param) {
//     this.length >= param
//   }

//   min(param) {
//     this.length <= param
//   }

//   match(param) {
//     return regExps[param].test(this.value)
//   }

//   validate(){
//     this.value = this.element.value.trim()
//     this.length = this.value.length

//     let isValide = true
//     for (let rule in this.rules) {
//       let param = this.rules[rule]
//       let result = this[rule](param)
//     }

//     if(!result) {
//       isValide = fasle
//       this.options.onError()
//       break
//     }
    
//     if(isValide) {
//       this.option.onSuccess()
//     }
//   }
// }