import './rollout_fade_effect.js'
// import './throtling.js'
import {rollOut} from './rollout_fade_effect.js'

window.addEventListener('DOMContentLoaded',() => {

  rollOut( 
    document.querySelectorAll('.fade'), 
    `${document.querySelector('.header').offsetHeight + 'px'} 0px 0px 30px` 
  )

})