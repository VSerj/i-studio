import { runBurger } from './menu_btn.js'
import { rollOut } from './rollout_fade_effect.js'
import { stretchHeader } from './stretch_header.js'
import { runButtonUp } from './button_up.js'
import { runSlider } from './slider'

window.addEventListener('load', () => {
  stretchHeader()
  rollOut(
    document.querySelectorAll('.fade'),
    `${document.querySelector('.header').offsetHeight + 'px'} 0px 0px 30px`
  )
  runBurger()
  runButtonUp()
  runSlider()
})
