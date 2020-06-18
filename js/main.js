'use strict'

/**
 * Contact Form Variables
 */

let contactLink = document.querySelector('.js-contact-link');
let contactPopup = document.querySelector('.js-modal-contact');

try {
  let contactClose = contactPopup.querySelector('.js-modal-close');
  let contactForm = contactPopup.querySelector('.js-contact-form');
  let contactFormName = contactForm.querySelector('.js-contact-form-name');
  let contactFormEmail = contactForm.querySelector('.js-contact-form-email');
  let contactFormTextarea = contactForm.querySelector('.js-contact-form-textarea');
  let contactFormFields = contactForm.querySelectorAll('input, textarea');
} catch (err) {

}

/**
 * Map Variables
 */

let mapLink = document.querySelector('.js-map-link');
let mapPopup = document.querySelector('.js-modal-map');
let mapClose = document.querySelector('.js-modal-map-close');

/**
 * Local Storage
 */

let isStorageSupport = true;
let storage = {};

try {
  storage.name = localStorage.getItem('name');
  storage.email = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

/**
 * Contact Form Listeners
 */

try {
  contactLink.addEventListener('click', function (event) {
    event.preventDefault();
    contactPopup.classList.add('modal-show');

    if (storage.name) {
      contactFormName.value = storage.name;
      contactFormEmail.value = storage.email;
      contactFormTextarea.focus();
    } else {
      contactFormName.focus();
    }
  });

  contactClose.addEventListener('click', function (event) {
    event.preventDefault();
    contactPopup.classList.remove('modal-show');
    contactPopup.classList.remove('modal-error');
  });

  contactForm.addEventListener('submit', function (event) {
    if (checkEmptyFields()) {
      event.preventDefault();
      contactPopup.classList.remove('modal-error');
      contactPopup.offsetWidth;
      contactPopup.classList.add('modal-error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', contactFormName.value);
        localStorage.setItem('email', contactFormEmail.value);
      }
    }
  });

  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      if (contactPopup.classList.contains('modal-show')) {
        event.preventDefault();
        contactPopup.classList.remove('modal-show');
        contactPopup.classList.remove('modal-error');
      } else if (mapPopup.classList.contains('modal-show')) {
        event.preventDefault();
        mapPopup.classList.remove('modal-show');
        mapPopup.classList.remove('modal-error');
      }
    }
  });
} catch (err) {

}





function checkEmptyFields() {
  let isError = false;

  contactFormFields.forEach(
    (el) => {
      if (!el.value) {
        el.classList.add('error');
        isError = true;
      } else {
        el.classList.remove('error');
      }
    }
  );
  return isError;
};

/**
 * Map Listeners
 */

try {
  mapLink.addEventListener('click', function (event) {
    event.preventDefault();
    mapPopup.classList.add('modal-show');
  });

  mapClose.addEventListener('click', function (event) {
    event.preventDefault();
    mapPopup.classList.remove('modal-show');
    mapPopup.classList.remove('modal-error');
  });
} catch (err) {

}

/**
 * Sliders
 */

let sliderSettings = {
  slideMoveLeft: function (el, length) {
    el.style.transform = 'translateX(-' + length + 'px)';
  },
  slideMoveRight: function (el, length) {
    el.style.transform = 'translateX(' + length + 'px)';
  }
}

/* Main slider */

let sliderMainNav = document.querySelectorAll('.slider .slider-controls button');
let sliderMainScene = document.querySelector('.slider-slides');

for (let i = 0, length = sliderMainNav.length; i < length; i++) {
  sliderMainNav[i].addEventListener('click', function (event) {
    event.preventDefault();

    for (let i = 0; i < sliderMainNav.length; i++) {
      sliderMainNav[i].classList.remove('active');
    }

    this.classList.add('active')
    sliderSettings.slideMoveLeft(sliderMainScene, 1160 * i);
  });
}

/* Service block */

let serviceNav = document.querySelectorAll('.slider-services-nav li');
let serviceBlock = document.querySelectorAll('.slider-services-content');

for (let i = 0, length = serviceNav.length; i < length; i++) {
  serviceNav[i].addEventListener('click', function (event) {
    event.preventDefault();

    for (let i = 0; i < serviceNav.length; i++) {
      serviceNav[i].classList.remove('slider-services-nav-active');
    }

    for (let i = 0; i < serviceBlock.length; i++) {
      serviceBlock[i].classList.remove('active');
    }

    this.classList.add('slider-services-nav-active');
    serviceBlock[i].classList.add('active');
  });
}

/**
 * Main navigation
 */

let btnMenuOpen = document.querySelector('.main-navigation-open');
let subMenu = document.querySelector('.main-navigation-submenu');

btnMenuOpen.addEventListener('click', function (event) {
  event.preventDefault();
  subMenu.classList.toggle('open');
});
