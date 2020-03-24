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

const compositionIcon = document.querySelector('#burgers__composition');
const dropout = document.querySelector('#burgers__dropout');
const closeDropoutButton = document.querySelector('#close-dropout-button');

compositionIcon.addEventListener('click', function() {

    dropout.classList.add('burgers__dropout--visible');
});

closeDropoutButton.addEventListener('click', function(event) {
    event.preventDefault();

    dropout.classList.remove('burgers__dropout--visible');
});

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