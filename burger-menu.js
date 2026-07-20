const burger = document.querySelector('.menu-burger');
const navigationMain = document.querySelector('.navigation-main');
const mobileMenu = document.querySelector('.mobile-menu');
const darkBody = document.querySelector('.dark-body');
const mobileBreakpoint = window.matchMedia('(max-width: 767px)');

function closeMenu() {
  navigationMain.classList.remove('notActive');
  mobileMenu.classList.remove('active');
  darkBody.classList.remove('active');
  burger.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

burger.addEventListener('click', function () {
  const isActive = mobileMenu.classList.contains('active');
  if (isActive) {
    closeMenu();
  } else {
    navigationMain.classList.toggle('notActive');
    mobileMenu.classList.add('active');
    darkBody.classList.add('active');
    burger.classList.add('active');
    document.body.classList.add('no-scroll');
  }
});

window.addEventListener('resize', function () {
  if (!mobileBreakpoint.matches && mobileMenu.classList.contains('active')) {
    closeMenu();
  }
});

document.querySelectorAll('.menu-link-burger').forEach(function (link) {
  link.addEventListener('click', closeMenu);
});