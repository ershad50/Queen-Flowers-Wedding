/*
Title: Main JS File
Theme Name: Wedding
Author Name: FairyTheme
Author URI: http://themeforest.net/user/fairytheme
====================*/
/*
Table of Contents:
------------------
1. Windows on Load
2. Windows on Scroll
3. SVG loader
4. Slick slider
5. Countdown
6. Form
7. Page scroll
8. Parallax
*/

;(function () {
    'use strict';
	/* 1. Windows on Load
	====================*/
	$(window).on('load', function() {
		$('.loader').delay(2500).fadeOut('slow');
		$('.grid').masonry({
			itemSelector: '.grid-item',
			percentPosition: true,
			columnWidth: '.grid-sizer'
		});
	});

    /* 2. Windows on Scroll
	====================*/
	let winScrollTop = 0;
	$(window).on('scroll', function() {
		const nav = $('#navbar');
		const top = 200;

		if ($(window).scrollTop() >= top) {
			nav.addClass('onscroll');
		} else {
			nav.removeClass('onscroll');
		}

		winScrollTop = $(this).scrollTop();
		parallax();
	});

    /* 3. SVG loader
	====================*/
	function mycallback(){
		this.el.classList.add('finish');
	}
	Vivus.prototype.myremoveclass = function () {
		this.el.classList.remove('finish');
	}
	const loaderSvg = new Vivus('my-svg', {
		type: 'sync',
		duration: 100,
		file: 'images/loader.svg',
		start: 'autostart',
		dashGap: 20,
		forceRender: false
	}, mycallback);

    /* 4. Slick slider
	====================*/
	const slider = function() {
		if ($('.slick-gallery')) {
			$('.slick-gallery').slick({
				centerMode: false,
				dots: false,
				infinite: true,
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							infinite: true,
							dots: true
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: true
						}
					}
				]
			});
		}
		if ($('.slick-wishes')) {
			$('.slick-wishes').slick({
				dots: true,
				arrows: false
			});
		}
		if ($('.slick-gifts')) {
			$('.slick-gifts').slick({
				dots: true,
				arrows: false,
				slidesToShow: 5,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							infinite: true,
							dots: true
						}
					},
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						}
					}
				]
			});
		}
	}
	const sliderNum = function() {
		const $slides = $('.slick-gallery .slick-slide').not('.slick-cloned');
		const $currentSlide = $('.slick-slide.slick-current').attr('data-slick-index');
		$('.gallery__slider-current').text(+$currentSlide + 1);
		$('.gallery__slider-all').text($slides.length);
	}
	$('.slick').on('afterChange', sliderNum);

    /* 5. Countdown
	====================*/
	const countdown = function() {
		const countdown = document.querySelector('.countdown');

		function getTimeRemaining(endtime) {
			const t = Date.parse(endtime) - Date.parse(new Date());
			const seconds = Math.floor((t / 1000) % 60);
			const minutes = Math.floor((t / 1000 / 60) % 60);
			const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			const days = Math.floor(t / (1000 * 60 * 60 * 24));
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		function initializeClock(id, endtime) {
			const clock = document.getElementById(id);
			const daysSpan = clock.querySelector('.days');
			const hoursSpan = clock.querySelector('.hours');
			const minutesSpan = clock.querySelector('.minutes');
			const secondsSpan = clock.querySelector('.seconds');
			let newChild;

			function updateClock() {
				const t = getTimeRemaining(endtime);
				const daysArr = String(t.days).split('');
				daysSpan.innerHTML = '';
				for (let i = 0; i < daysArr.length; i++){
					newChild = document.createElement('span');
					newChild.innerHTML = daysArr[i];
					daysSpan.appendChild(newChild);
				}
				const hoursArr = String(('0' + t.hours).slice(-2)).split('');
				hoursSpan.innerHTML = '';
				for (let i = 0; i < hoursArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = hoursArr[i];
					hoursSpan.appendChild(newChild);
				}
				const minuteArr = String(('0' + t.minutes).slice(-2)).split('');
				minutesSpan.innerHTML = '';
				for (let i = 0; i < minuteArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = minuteArr[i];
					minutesSpan.appendChild(newChild);
				}
				const secondArr = String(('0' + t.seconds).slice(-2)).split('');
				secondsSpan.innerHTML = '';
				for (let i = 0; i < secondArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = secondArr[i];
					secondsSpan.appendChild(newChild);
				}
				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
			}
			updateClock();
			const timeinterval = setInterval(updateClock, 1000);
		}
		// set your wedding date here
		const deadline = 'June 11 2024 17:30:00 GMT+0300';
		if (countdown){
			initializeClock('timer', deadline);
		}
	}

    /* 6. Form
	====================*/
	function filledLabels() {
		const inputFields = $('.control-label').next();
		inputFields.each(function(){
			const singleInput = $(this);
			singleInput.on('focus blur', function(event){
				checkVal(singleInput);
			});
		});
	}
	function checkVal(inputField) {
		if (inputField.val() === '') {
			if (event.type === "focus") {
				inputField.prev('.control-label').addClass('filled')
			} else if (event.type === "blur") {
				inputField.prev('.control-label').removeClass('filled')
			}
		}
	}
	function submitForm() {
		const $form = $('#rsvp-form');
		$form.submit(function (e) {
			$form.find('.error-msg').remove();
			$form.find('input').removeClass('error');
			const formData = {
				'name': $form.find('input#inputName').val(),
				'friendName': $form.find('input#inputFriendName').val(),
				'number': $form.find('input#inputNumber').val()
			};

			$.ajax({
				type: 'POST',
				url: 'form.php',
				data: formData,
				dataType: 'json',
				encode: true,
			}).done(function(data) {
				console.log(data);
				if (data.success) {
					$('.success-msg').html('');
					$('.success-msg').html(data.message);
				} else {
					if (data.errors.name) {
						$('#inputName').addClass('error').after('<span class="error-msg">'+data.errors.name+'</span>');
					} else if (data.errors.friendName) {
						$('#inputFriendName').addClass('error').after('<span class="error-msg">'+data.errors.friendName+'</span>');
					}
				}
			});
			e.preventDefault();
		});
	};

    /* 7. Page scroll
	====================*/
	const pageScroll = function() {
		$('body').on('click touch', '.page-scroll', function(event) {
			const $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	};

    /* 8. Parallax
	====================*/
	$.fn.is_on_screen = function(){
		const win = $(window);
		const viewport = {
			top : win.scrollTop(),
			left : win.scrollLeft()
		};
		//viewport.right = viewport.left + win.width();
		viewport.bottom = viewport.top + win.height();

		const bounds = this.offset();
		//bounds.right = bounds.left + this.outerWidth();
		bounds.bottom = bounds.top + this.outerHeight();

		return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	};
	function parallax() {
		$('.parallax').each(function() {
		    if ($(this).is_on_screen()) {
			    const firstTop = $(this).offset().top;
				const moveTop = (firstTop-winScrollTop) * 0.2 //speed;
				$(this).css("transform", "translateY("+ moveTop +"px)");
			}
		});
	}

    countdown();
    slider();
    sliderNum();
    filledLabels();
    submitForm();
    pageScroll();
}());