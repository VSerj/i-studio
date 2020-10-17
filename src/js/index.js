import './rollout_fade_effect.js'
import './menu_btn.js'
// import './throtling.js'
import { rollOut } from './rollout_fade_effect.js'
import './stretch_header.js'

window.addEventListener('DOMContentLoaded', () => {

  rollOut(
    document.querySelectorAll('.fade'),
    `${document.querySelector('.header').offsetHeight + 'px'} 0px 0px 30px`
  )
  // stretch()

})
