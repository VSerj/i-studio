export function selectNavLink(nav) {
  nav.addEventListener('click', (e) => {
    const { target } = e;

    if (
      !target.closest('.nav__link') ||
      target.closest('.nav__link--selected')
    ) {
      return;
    }

    nav
      .querySelector('.nav__link--selected')
      .classList.remove('nav__link--selected');

    const links = nav.querySelectorAll('.nav__link');

    links.forEach((link) => {
      if (link !== target) return;
      link.classList.add('nav__link--selected');
    });
  });
}
