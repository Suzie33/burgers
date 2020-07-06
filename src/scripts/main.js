(function() {
    /////////////////////////full screen menu functionality///////////////////////

    const hamburger = document.querySelector('#hamburger-menu-link');
    const nav = document.querySelector('#main-nav');
    const closeNavButton = document.querySelector('#close-nav-button');
    const navLinks = document.querySelectorAll('.nav__link');

    hamburger.addEventListener('click', function (event) {
        event.preventDefault();
        
        nav.classList.add('nav--hamburger');
        $('.wrapper__content').addClass('restrict-scrolling');
    });

    closeNavButton.addEventListener ('click', function(event) {
        event.preventDefault();

        nav.classList.remove('nav--hamburger');
        $('.wrapper__content').removeClass('restrict-scrolling');
    });

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            $('.wrapper__content').removeClass('restrict-scrolling');
            nav.classList.remove('nav--hamburger');
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
                if (xhr.response == null) {
                    orderPopupText.textContent = "Не заполнено обязательное поле"
                } else if (xhr.status >= 400) {
                    orderPopupText.textContent = "Ошибка сервера"
                } else {
                    orderPopupText.textContent = xhr.response.message;
                }
                
                orderOverlay.classList.add('overlay--visible');
                $('.wrapper__content').addClass('restrict-scrolling');
                resetButton.click();

                closeOverlayButton.addEventListener('click', function() {
                    orderOverlay.classList.remove('overlay--visible');
                    $('.wrapper__content').removeClass('restrict-scrolling');
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
            $('.wrapper__content').addClass('restrict-scrolling');
        }

        closePopupButton.addEventListener('click', function(event) {
            event.preventDefault();
        
            reviewsOverlay.classList.remove('overlay--visible');
            $('.wrapper__content').removeClass('restrict-scrolling');
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

    /////////////////////// slider ////////////////////////////////////////

    $(function () {
        const burgersList = $('#burgers__list');
        const duration = 500;
        const burgersItems = $('.burgers__item');

        function moveSlide (slideNum) {        
            
            const activeSlide = getActiveSlide();
            const reqItem = burgersItems.eq(slideNum);
            const reqIndex = reqItem.index();

            if (reqItem.length) {
                burgersList.animate({
                    'left' : -reqIndex * 100 + '%'
                }, duration, function (){
                    activeSlide.removeClass('burgers__item--active');
                    reqItem.addClass('burgers__item--active');
                });
            }
        }

        function getActiveSlide () {
            return burgersItems.filter('.burgers__item--active');
        }
        
        $('.burgers__controls').on('click', function(event){
            event.preventDefault();

            const $this = $(this);
            const activeSlide = getActiveSlide();
            const nextItem = activeSlide.next();
            const prevItem = activeSlide.prev();

            if ($this.hasClass('burgers__controls-right')) { //next
                if (nextItem.length) {
                    moveSlide(nextItem.index());
                } else {
                    moveSlide(0);
                }

            } else { //previous
                if (prevItem.length) {
                    moveSlide(prevItem.index());
                } else {
                    moveSlide(burgersItems.last().index());
                }
            }
        });
    });

    /// one page scroll///

    const sections = $('.section');
    const display = $('.wrapper__content');
    const fixedNavItems = $('.side-nav__item');

    let inScroll = false;

    const performTransition = sectionEq => {
        if (display.hasClass('restrict-scrolling')) {
            return;
        }
        if (inScroll === false) {
            inScroll = true;

            const position = sectionEq * -100;

            sections.eq(sectionEq).addClass('section--active').siblings().removeClass('section--active');
            fixedNavItems.eq(sectionEq).addClass('side-nav__item--active').siblings().removeClass('side-nav__item--active');

            display.css({
                transform: `translateY(${position}%)`
            });

            $(display).on('transitionend', e => {
                inScroll = false;
            })
        }
    }

    const scrollSection = direction => {
        const activeSection = sections.filter('.section--active');
        const nextSection = activeSection.next('.section');
        const prevSection = activeSection.prev('.section');

        if (direction === 'next' && nextSection.length) {
            performTransition(nextSection.index());
        }

        if (direction === 'prev' && prevSection.length) {
            performTransition(prevSection.index());
        }
    }

    $(window).on('wheel', e => {
        const deltaY = e.originalEvent.deltaY;

        if (deltaY > 0) {
            scrollSection('next');
        }

        if (deltaY < 0) {
            scrollSection('prev');
        }
    });

    $(document).on('keydown', e => {
        const tagName = e.target.tagName.toLowerCase();

        if (tagName != 'input' && tagName != 'textarea') {
            switch(e.keyCode) {
                case 38:
                    scrollSection('prev');
                    break;
                case 40:
                    scrollSection('next');
                    break;
             }
        }
    });

    $("[data-scroll-to]").on("click", e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const target = $this.attr("data-scroll-to");

        performTransition(target);
    });

    // const md = new MobileDetect(window.navigator.userAgent);
    // const isMobile = md.mobile();

    // if (isMobile) {
    //     $(".wrapper__content").swipe({
    //         swipe: (event, direction) => {
    //             let scrollDirection;
    
    //             if (direction === "up") {
    //                 scrollDirection = "next";
    //             }
    //             if (direction === "down") {
    //                 scrollDirection = "prev";
    //             }
    
    //             scrollSection(scrollDirection);
    //         }
    //     })
    // }
    
})();

////////////// youtube player /////////////////////

const video = $('.player__video');
const playerContainer = $('.player');

function playVideo() {
    video.get(0).play();
    playerContainer.addClass("player--active");
    playerContainer.removeClass('player--paused');
}

function pauseVideo() {
    video.get(0).pause();
    playerContainer.addClass('player--paused');
    playerContainer.removeClass("player--active");
}

$('.player__start').on('click', e => {
    e.preventDefault();

    if (playerContainer.hasClass('player--active')) {
        pauseVideo();
    } else {
        playVideo();
    }
});

$('.player__splash').on('click', e => {
        playVideo();
});

$(".player__playback").on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (video.get(0).duration / 100) * newButtonPositionPercent;

    $('.player__playback-button').css({
        left: `${newButtonPositionPercent}%`
    });

    video.get(0).currentTime = newPlaybackPositionSec;
});

video.get(0).onplay = function() {
    let interval;
    const durationSec = video.get(0).duration;

    if (typeof interval != "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = video.get(0).currentTime;
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

    }, 1000);
};

$(".player__volume-scale").on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPosition = clickedPosition / bar.width();
    const newButtonPositionPercent = newButtonPosition * 100;

    $('.player__volume-button').css({
        left: `${newButtonPositionPercent}%`
    });

    video.get(0).volume = newButtonPosition;
});

$('.player__volume-icon').on('click', e => {
    if (video.get(0).volume === 0) {
        $('.player__volume-button').css({
            left: '60%'
        });
        video.get(0).volume = 0.6;
    } else {
        $('.player__volume-button').css({
            left: '0%'
        });
        video.get(0).volume = 0;
    }
});

////////// map ////////////

let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [59.935274, 30.312388],
        zoom: 11,
        controls: ['zoomControl']
    });

    const coords = [
        [59.975088, 30.314779],
        [59.947556, 30.387081], 
        [59.893487, 30.317235],
        [59.918016, 30.511916]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map-marker.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);