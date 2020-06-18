'use strict'

/**
 * Contact Form Variables
 */

let contactLink = document.querySelector('.js-contact-link');
let contactPopup = document.querySelector('.js-modal-contact');
let contactClose;
let contactForm;
let contactFormName;
let contactFormEmail;
let contactFormTextarea;
let contactFormFields;

if (contactPopup) {
  contactClose = contactPopup.querySelector('.js-modal-close');
  contactForm = contactPopup.querySelector('.js-contact-form');
}

if (contactForm) {
  contactFormName = contactForm.querySelector('.js-contact-form-name');
  contactFormEmail = contactForm.querySelector('.js-contact-form-email');
  contactFormTextarea = contactForm.querySelector('.js-contact-form-textarea');
  contactFormFields = contactForm.querySelectorAll('input, textarea');
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

if (contactLink && contactPopup) {
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
      }
    }
  });
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

if (mapLink && mapPopup && mapClose) {
  mapLink.addEventListener('click', function (event) {
    event.preventDefault();
    mapPopup.classList.add('modal-show');
  });

  mapClose.addEventListener('click', function (event) {
    event.preventDefault();
    mapPopup.classList.remove('modal-show');
    mapPopup.classList.remove('modal-error');
  });

  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      if (mapPopup.classList.contains('modal-show')) {
        event.preventDefault();
        mapPopup.classList.remove('modal-show');
        mapPopup.classList.remove('modal-error');
      }
    }
  });
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

if (sliderMainNav && sliderMainScene) {
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
}

/* Service block */

let serviceNav = document.querySelectorAll('.slider-services-nav li');
let serviceBlock = document.querySelectorAll('.slider-services-content');

if (serviceNav && serviceBlock) {
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
