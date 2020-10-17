'user strict'

export function rollOut(elemsList = null, rootMargin = "0px 0px 0px 0px") {
  
  if (!elemsList) return

  let rollOutOptions = {
    root: null,
    rootMargin,
    threshold: 0
  }

  let rollOutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('rollOut')
        observer.unobserve(entry.target)
      }
    })

  }, rollOutOptions)

  function observeRollOut(elemsForObserver) {
    elemsForObserver.forEach(elem => {
      rollOutObserver.observe(elem)
    })
  }

  observeRollOut(elemsList)

}
