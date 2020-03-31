/////////////////////////full screen menu functionality///////////////////////

const hamburger = document.querySelector('#hamburger-menu-link');
const nav = document.querySelector('#main-nav');
const closeNavButton = document.querySelector('#close-nav-button');
const navItems = document.querySelectorAll('.nav__item');

hamburger.addEventListener('click', function (event) {
    event.preventDefault();
    
    nav.classList.add('nav--hamburger');
    document.body.style.overflow = 'hidden';
});

closeNavButton.addEventListener ('click', function(event) {
    event.preventDefault();

    nav.classList.remove('nav--hamburger');
    document.body.style.overflow = 'visible';
});

for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function() {
        document.body.style.overflow = 'visible';
    });
}

//////////////////////////composition dropout///////////////////////////////////////

const burgerSection = document.querySelector('#section-burgers')
const compositionIcon = document.querySelectorAll('.burgers__composition');
const dropout = document.querySelectorAll('.burgers__dropout');
const closeDropoutButton = document.querySelectorAll('.close-button--dropout');

for (let i = 0; i < compositionIcon.length; i++) {
        compositionIcon[i].addEventListener('click', function(event) {
            event.stopPropagation();
            dropout[i].classList.toggle('burgers__dropout--visible');
            
            burgerSection.addEventListener('click', function(event) {
                dropout[i].classList.remove('burgers__dropout--visible');
            });
        });
}

for (let i = 0; i < closeDropoutButton.length; i++) {
        closeDropoutButton[i].addEventListener('click', function(event) {
        event.preventDefault();
    
        dropout[i].classList.remove('burgers__dropout--visible');

        
    });
}



//////////////////////////horizontal accordeon////////////////////////

const menuSection = document.querySelector('#section-menu');
const accoItems = document.querySelectorAll('.accordeon-menu__item');
const accoItemsLength = accoItems.length;

menuSection.addEventListener('click', function() {
    for (let i = 0; i < accoItemsLength; i++) {
        accoItems[i].classList.remove('accordeon-menu__item--active');
    }
});

for (let i = 0; i < accoItemsLength; i++) {
    accoItems[i].addEventListener('click', function(event) {
        event.stopPropagation();
        event.preventDefault();

        if(accoItems[i].classList.contains('accordeon-menu__item--active')) {
            accoItems[i].classList.remove('accordeon-menu__item--active');
        } else {
            for (let i = 0; i < accoItemsLength; i++) {
                accoItems[i].classList.remove('accordeon-menu__item--active');
            }
            accoItems[i].classList.add('accordeon-menu__item--active');
        }
    });
}

//////////////////////////vertical accordeon////////////////////////

const teamSection = document.querySelector('#section-team');
const verticalAccoItems = document.querySelectorAll('.accordeon__item');
const verticalAccoItemsLength = verticalAccoItems.length;

teamSection.addEventListener('click', function() {
    for (let i = 0; i < verticalAccoItemsLength; i++) {
        verticalAccoItems[i].classList.remove('accordeon__item--active');
    }
});

for (let i = 0; i < verticalAccoItemsLength; i++) {
    verticalAccoItems[i].addEventListener('click', function(event) {
        event.stopPropagation();
        event.preventDefault();

        if (verticalAccoItems[i].classList.contains('accordeon__item--active')) {
            verticalAccoItems[i].classList.remove('accordeon__item--active');
        } else {
            for (let i = 0; i < verticalAccoItemsLength; i++) {
                verticalAccoItems[i].classList.remove('accordeon__item--active');
            }

            verticalAccoItems[i].classList.add('accordeon__item--active');
        }
    });
}

/////////////////////// slider ////////////////////////////////////////

const leftArrow = document.querySelector('#arrow-scroll__link-left');
const rightArrow = document.querySelector('#arrow-scroll__link-right');
const burgersList = document.querySelector('#burgers__list');

rightArrow.addEventListener('click', function(event) {
    loop('right', event);
});

leftArrow.addEventListener('click', function(event) {
    loop('left', event);
});

function loop (direction, event) {
    event.preventDefault();

    if (direction === "right") {
        burgersList.appendChild(burgersList.firstElementChild);
    } else {
        burgersList.insertBefore(burgersList.lastElementChild, burgersList.firstElementChild);
    }
}

///////////////////// order form ////////////////////////////////

const myForm = document.querySelector('#order__form');
const sendButton = document.querySelector('#send_button');
const orderOverlay = document.querySelector('#order__overlay');
const closeOverlayButton = document.querySelector('#button_close_overlay');
const orderPopupText = document.querySelector('#order_popup_text');
const resetButton = document.querySelector('#reset_button');

sendButton.addEventListener('click', function(event) {
    event.preventDefault();

    if (validateForm(myForm)) {

        const formData = new FormData(myForm);
        formData.append('to', 'valiazin@gmail.com');

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.addEventListener('load', function() {
            orderPopupText.textContent = xhr.response.message;
            
            orderOverlay.classList.add('overlay--visible');
            document.body.style.overflow = 'hidden';
            resetButton.click();

            closeOverlayButton.addEventListener('click', function() {
                orderOverlay.classList.remove('overlay--visible');
                document.body.style.overflow = 'visible';
            });

            orderOverlay.addEventListener('click', function(event) {
                if (event.target === orderOverlay) {
                    closeOverlayButton.click();
                }
            });

            document.addEventListener('keydown', function(event) {
                if (event.key === "Escape") {
                    closeOverlayButton.click();
                }
            });
        });
    }
 });

 function validateForm (form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.street)) {
        valid = false;
    }
    if (!validateField(form.elements.building)) {
        valid = false;
    }
    if (!validateField(form.elements.comment)) {
        valid = false;
    }

    return valid;
 }

 function validateField(field) {
     field.nextElementSibling.textContent = field.validationMessage;
     return field.checkValidity();
 }

 
 const phoneField = document.querySelector('#phone_input');

 phoneField.addEventListener('keydown', function(event) {
    let isDijit = false;
    let isDash = false;
    let isPlus = false;
    let isControls = false;

    if (event.key >= 1 && event.key <= 9 || event.key === 0) {
        isDijit = true;
    }
    if (event.key === '-') {
        isDash = true;
    }
    if (event.key === '+') {
        isPlus = true;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Delete') {
        isControls = true;
    }

    if (!isDijit && !isDash && !isControls && !isPlus) {
        event.preventDefault();
    }
});

const apptField = document.querySelector('#appt_input');

apptField.addEventListener('keydown', function(event) {
    let isDijit = false;
    let isControls = false;

    if (event.key >= 1 && event.key <= 9 || event.key === 0) {
        isDijit = true;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Delete') {
        isControls = true;
    }

    if (!isDijit && !isControls) {
        event.preventDefault();
    }
});

const floorField = document.querySelector('#floor_input');

floorField.addEventListener('keydown', function(event) {
    let isDijit = false;
    let isControls = false;

    if (event.key >= 1 && event.key <= 9 || event.key === 0) {
        isDijit = true;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Delete') {
        isControls = true;
    }

    if (!isDijit && !isControls) {
        event.preventDefault();
    }
});

 ////////////////////////////////// reviews popups ////////////////////////////////////////

const reviews = document.querySelector('#reviews__list');
const reviewsOverlay = document.querySelector('#reviews__overlay');
let reviewContent = document.querySelector('#review_popup_content');
const closePopupButton = document.querySelector('#button_close_review_popup');

reviews.addEventListener('click', function(event) {
    let element = event.target;

    if (element.tagName === 'BUTTON') {
        let modalReviewText = element.parentNode.firstElementChild.innerHTML;

        reviewContent.innerHTML = modalReviewText;
        reviewsOverlay.classList.add('overlay--visible');
        document.body.style.overflow = 'hidden';
    }

    closePopupButton.addEventListener('click', function(event) {
        event.preventDefault();
    
        reviewsOverlay.classList.remove('overlay--visible');
        document.body.style.overflow = 'visible';
    });
    
    reviewsOverlay.addEventListener('click', function(event) {
        if (event.target === reviewsOverlay) {
            closePopupButton.click();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closePopupButton.click();
        }
    });
});

