(function() {
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
                } else {
                    orderPopupText.textContent = xhr.response.message;
                }
                
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

//     $(function() {
//         const sections = $('.section');
//         const duration = 500;

//         function getActiveSection () {
//             return sections.filter('.section--active');
//         }

//         // function debounce (func, timeInMs) {
//         //     let timeout;

//         //     return function () {
//         //         const context = this;
//         //         const args = arguments;

//         //         clearTimeout(timeout);

//         //         timeout = setTimeout(() => {
//         //             func.apply(context, args);
//         //         }, timeInMs)
//         //     };
//         // }

//         // let onePageScroll = debounce((e) => {
            
//         // }, 1000);

//         $('body').on('wheel', function (e) {
//             const activeSection = getActiveSection();
//             const nextSection = activeSection.next();
//             const prevSection = activeSection.prev();

//             if (e.originalEvent.deltaY > 0) {
//                 if (nextSection.length) {
//                     $('html, body').stop(true, false).animate({
//                         scrollTop: nextSection.offset().top
//                     }, duration, function () {
//                         activeSection.removeClass('section--active');
//                         nextSection.addClass('section--active');
//                     });
//                 }
                
//             } else {
//                 if (prevSection.length) {
//                     $('html, body').stop(true, false).animate({
//                         scrollTop: prevSection.offset().top
//                     }, duration, function () {
//                         activeSection.removeClass('section--active');
//                         prevSection.addClass('section--active');
//                     });
//                 }
//             }
//         });

//         $(window).scroll(function(e) {
//             e.preventDefault();
//         })
//     });

////////////// youtube player /////////////////////


})();

let player;
const playerContainer = $('.player');

let eventsInit = () => {
    $(".player__start").click(function (e) { 
        e.preventDefault();

        if(playerContainer.hasClass('player--active')) {
            playerContainer.addClass('player--paused');
            playerContainer.removeClass('player--active');
            player.pauseVideo();
        } else {
            playerContainer.removeClass('player--paused');
            playerContainer.addClass('player--active');
            player.playVideo();
        }
    });
};

$(".player__playback").on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

    $('.player__playback-button').css({
        left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPositionSec);
})

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    return `${minutes} : ${seconds}`;

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $('.player__duration-estimate').text(formatTime(durationSec));

    if (typeof interval != "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'lbmxzoi-ChY',
        events: {
        'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 1
        }
    });
}

eventsInit();



