const hamburger = document.querySelector('#hamburger-menu-link');
const nav = document.querySelector('#main-nav');
const close = document.querySelector('#close-nav-button');

hamburger.addEventListener('click', function (event) {
    event.preventDefault();
    
    nav.classList.add('nav--hamburger');
});

close.addEventListener ('click', function(event) {
    event.preventDefault();

    nav.classList.remove('nav--hamburger');
});