'use strict';

const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
const subscriptionForm = document.querySelector('.modal form');
const subscriptionButton = subscriptionForm.querySelector('button[type="submit"]'); // Get the button
const modalCloseFunc = function () { modal.classList.add('closed') }
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');
toastCloseBtn.addEventListener('click', function () {
    notificationToast.classList.add('closed');
});

const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
    const mobileMenuCloseFunc = function () {
        mobileMenu[i].classList.remove('active');
        overlay.classList.remove('active');
    }

    mobileMenuOpenBtn[i].addEventListener('click', function () {
        mobileMenu[i].classList.add('active');
        overlay.classList.add('active');
    });

    mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
    overlay.addEventListener('click', mobileMenuCloseFunc);

}

const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

    accordionBtn[i].addEventListener('click', function () {

        const clickedBtn = this.nextElementSibling.classList.contains('active');

        for (let i = 0; i < accordion.length; i++) {

            if (clickedBtn) break;

            if (accordion[i].classList.contains('active')) {

                accordion[i].classList.remove('active');
                accordionBtn[i].classList.remove('active');

            }

        }

        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');

    });

}

// Subscription Logic
const formSubmittedKey = 'formSubmitted';
const formSubmitted = localStorage.getItem(formSubmittedKey);

// Show Modal only if the user has NOT ever submitted
if (!formSubmitted) {
    setTimeout(() => {
        modal.classList.remove('closed');
    }, 5000);
} else {
       // Button is already subscribed, so do not disable on reload. 
      subscriptionButton.textContent = 'Subscribed!'; // Optional: Change text
      subscriptionButton.classList.add('disabled'); // Optional: Add a visual class
}

// Handle Subscription
subscriptionForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!formSubmitted) {
        localStorage.setItem(formSubmittedKey, 'true');
         setTimeout(() => {
            modal.classList.add('closed');
            subscriptionButton.disabled = true; // Changed to true.
            subscriptionButton.textContent = 'Subscribed!'; // Optional: Change text
            subscriptionButton.classList.add('disabled'); // Optional: Add a visual class
         }, 500); // Close the modal after 500ms
    }
    else{
        // If form has already been submitted, we can re-enable the button to allow subscription.
        subscriptionButton.disabled = false;
        subscriptionButton.textContent = 'Subscribe';
        subscriptionButton.classList.remove('disabled');
    }

});