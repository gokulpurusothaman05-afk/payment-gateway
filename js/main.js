/**
 * STACKLY — Premium Payment Gateway
 * Advanced animations & interactions
 */
(function ($) {
    'use strict';

    $(document).ready(function () {
        initPreloader();
        initAOS();
        initNavigation();
        initCounters();
        initFAQ();
        initSliders();
        initScrollEffects();
        initTextAnimations();
        initParticles();
        initSmoothScroll();
        initFormValidation();
        initGSAPAnimations();
        initIsotope();
        initMagnificPopup();
        initJarallax();
        initCountdown();
        initNoUiSlider();
        initOwlCarousel();
        initTinySlider();
        initDateTimePicker();
        initBootstrapSelect();
        init3DEffects();
        initBackToTop();
        initPasswordToggle();

        // Refresh scroll animations after all plugins initialize
        setTimeout(refreshAnimations, 600);
        $(window).on('load', refreshAnimations);
    });

    function refreshAnimations() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
        ensureVisibleSections();
    }

    function ensureVisibleSections() {
        // Unstick elements left hidden by failed or conflicting animations
        $('.feature-card, .pricing-card, .blog-card, .grid-item, .step, .stat-item, .faq-item, .section-header').each(function () {
            const opacity = parseFloat($(this).css('opacity'));
            if (opacity < 0.1 && !$(this).closest('.owl-carousel, .slick-slider').length) {
                $(this).css({ opacity: 1, visibility: 'visible', transform: 'none' });
            }
        });

        $('[data-aos]').each(function () {
            const $el = $(this);
            if (!$el.hasClass('aos-animate') && parseFloat($el.css('opacity')) < 0.1) {
                const rect = this.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    $el.addClass('aos-animate').css({ opacity: 1, transform: 'none' });
                }
            }
        });

        $('.hero-title .letter').css({ opacity: 1, transform: 'translateY(0)' });
    }

    function initPreloader() {
        function hidePreloader() {
            const $preloader = $('.preloader');
            if (!$preloader.length) return;
            if (typeof gsap !== 'undefined') {
                gsap.to($preloader[0], {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: function () {
                        $preloader.remove();
                        refreshAnimations();
                    }
                });
            } else {
                $preloader.fadeOut(400, function () {
                    $(this).remove();
                    refreshAnimations();
                });
            }
        }

        $(window).on('load', function () {
            setTimeout(hidePreloader, 400);
        });
        // Safety fallback if load event is delayed
        setTimeout(hidePreloader, 3500);
    }

    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 40,
                delay: 0,
                disable: false,
                startEvent: 'DOMContentLoaded'
            });
        }
    }

    function initNavigation() {
        const $navbar = $('.navbar');
        const $hamburger = $('#hamburger');
        const $navMenu = $('#navMenu');

        $(window).on('scroll', function () {
            $navbar.toggleClass('scrolled', $(this).scrollTop() > 50);
        });

        $hamburger.on('click', function () {
            $navMenu.toggleClass('active');
            $(this).toggleClass('active');
        });

        $('.dropdown > a').on('click', function (e) {
            if ($(window).width() <= 768) {
                e.preventDefault();
                $(this).parent().toggleClass('active');
            }
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.navbar').length) {
                $navMenu.removeClass('active');
                $hamburger.removeClass('active');
            }
        });

        const path = window.location.pathname.split('/').pop() || 'index.html';
        $('.nav-menu .nav-link').each(function () {
            const href = $(this).attr('href');
            if (href === path) $(this).closest('.nav-item').addClass('active');
        });

        // Close mobile menu when a non-dropdown nav link is clicked
        $navMenu.find('a').on('click', function () {
            const $link = $(this);
            if ($link.parent().hasClass('dropdown')) return; // allow dropdown toggles
            if ($navMenu.hasClass('active')) {
                $navMenu.removeClass('active');
                $hamburger.removeClass('active');
            }
        });
    }

    function initCounters() {
        function animateCounter($el) {
            if ($el.hasClass('counted')) return;
            $el.addClass('counted');
            const target = parseInt($el.attr('data-target'), 10);
            if (!target) return;
            $({ val: 0 }).animate({ val: target }, {
                duration: 2200,
                easing: 'swing',
                step: function () {
                    $el.text(Math.ceil(this.val).toLocaleString());
                },
                complete: function () {
                    $el.text(target.toLocaleString());
                }
            });
        }

        if (typeof $.fn.appear === 'function') {
            $('.counter').appear(function () {
                animateCounter($(this));
            }, { accX: 0, accY: -100 });
        } else {
            $('.counter').each(function () { animateCounter($(this)); });
        }
    }

    function initFAQ() {
        $('.faq-question').on('click', function () {
            const $item = $(this).closest('.faq-item');
            $item.toggleClass('active');
            $item.siblings().removeClass('active');
        });
    }

    function initSliders() {
        if (typeof $.fn.slick !== 'function') return;

        $('#testimonialsSlider, .testimonials-slider').slick({
            dots: true,
            infinite: true,
            speed: 600,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: true,
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        });

        if ($('.payment-slider').length) {
            $('.payment-slider').slick({
                dots: false,
                infinite: true,
                speed: 400,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                responsive: [
                    { breakpoint: 1024, settings: { slidesToShow: 3 } },
                    { breakpoint: 768, settings: { slidesToShow: 2 } },
                    { breakpoint: 480, settings: { slidesToShow: 1 } }
                ]
            });
        }

        setTimeout(refreshAnimations, 400);
    }

    function initScrollEffects() {
        let scrollTicking = false;

        $(window).on('scroll', function () {
            const scrolled = $(this).scrollTop();
            $('.hero-3d-scene, .hero-visual').css('transform', 'translateY(' + (scrolled * 0.15) + 'px)');
            $('.shape-1').css('transform', 'translateY(' + (scrolled * 0.2) + 'px) rotate(' + (scrolled * 0.05) + 'deg)');
            $('.shape-2').css('transform', 'translateY(' + (scrolled * -0.12) + 'px)');
            $('.shape-3').css('transform', 'translateY(' + (scrolled * 0.18) + 'px) rotate(' + (scrolled * -0.05) + 'deg)');

            if (!scrollTicking) {
                scrollTicking = true;
                requestAnimationFrame(function () {
                    ensureVisibleSections();
                    scrollTicking = false;
                });
            }
        });
    }

    function initTextAnimations() {
        if (typeof $.fn.lettering === 'function' && $('.hero-title .letters').length) {
            $('.hero-title .letters').lettering();

            if (typeof anime !== 'undefined') {
                anime({
                    targets: '.hero-title .letter',
                    translateY: [40, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 900,
                    delay: anime.stagger(25)
                });
            }

            // Always reveal hero text even if anime.js fails
            setTimeout(function () {
                $('.hero-title .letter').css({ opacity: 1, transform: 'translateY(0)' });
            }, 2000);
        }

        if (typeof CircleType !== 'undefined' && document.querySelector('.circle-text')) {
            try {
                new CircleType(document.querySelector('.circle-text'), {
                    radius: 80,
                    dir: 1
                });
            } catch (e) {
                /* circle text is decorative */
            }
        }
    }

    function initParticles() {
        ['particles', 'login-particles', 'auth-particles'].forEach(function (id) {
            const container = document.getElementById(id) || document.querySelector('.' + id);
            if (!container) return;
            for (let i = 0; i < 40; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                const size = Math.random() * 4 + 2;
                p.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' +
                    (Math.random() * 100) + '%;top:' + (Math.random() * 100) +
                    '%;animation:float ' + (Math.random() * 8 + 4) + 's ease-in-out infinite;' +
                    'animation-delay:' + (Math.random() * 5) + 's;opacity:' + (Math.random() * 0.4 + 0.1);
                container.appendChild(p);
            }
        });
    }

    function initSmoothScroll() {
        $('a[href*="#"]:not([href="#"])').on('click', function (e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: target.offset().top - 90 }, 900, 'swing');
            }
        });
    }

    function initFormValidation() {
        if (typeof $.fn.validate === 'function') {
            $('#contactFormMain, #contactForm, #signupForm').validate({
                rules: {
                    name: 'required',
                    firstName: 'required',
                    lastName: 'required',
                    email: { required: true, email: true },
                    password: { required: true, minlength: 6 },
                    confirmPassword: { required: true, equalTo: '#password' },
                    message: 'required',
                    terms: 'required'
                },
                messages: {
                    email: 'Please enter a valid email',
                    password: 'Password must be at least 6 characters',
                    confirmPassword: 'Passwords do not match',
                    terms: 'You must accept the terms'
                },
                errorElement: 'label',
                errorClass: 'error',
                submitHandler: function (form) {
                    if (form.id === 'signupForm') {
                        window.location.href = '404.html';
                    } else {
                        alert('Thank you! We will get back to you shortly.');
                        form.reset();
                    }
                }
            });
        }

        $('#loginForm').on('submit', function (e) {
            e.preventDefault();
            const loginAs = $('#loginAs').val();
            const email = $('#email').val();
            const password = $('#password').val();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!loginAs) { alert('Please select account type'); return; }
            if (!emailRegex.test(email)) { alert('Please enter a valid email'); return; }
            if (password.length < 6) { alert('Password must be at least 6 characters'); return; }

            window.location.href = loginAs === 'admin' ? 'dashboard-admin.html' : 'dashboard-merchant.html';
        });
    }

    function initGSAPAnimations() {
        if (typeof gsap === 'undefined') return;

        // Hero-only GSAP — scroll sections use AOS to avoid opacity conflicts
        if ($('.hero-badge').length) {
            gsap.from('.hero-badge', { duration: 0.8, y: 20, opacity: 0, ease: 'power3.out' });
        }
        if ($('.hero-buttons').length) {
            gsap.from('.hero-buttons', { duration: 0.8, y: 20, opacity: 0, delay: 0.3, ease: 'power3.out' });
        }

        if ($('.card-3d').length) {
            gsap.to('.card-3d', {
                rotateY: -20,
                rotateX: 15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }

        if ($('.orbit-dot').length) {
            gsap.to('.orbit-dot', {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: 'none',
                transformOrigin: '50% 200px'
            });
        }
    }

    function initIsotope() {
        if (typeof $.fn.isotope !== 'function') return;
        const $grid = $('.isotope-grid');
        if (!$grid.length) return;

        function layoutGrid() {
            $grid.isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                transitionDuration: '0.4s'
            });
            $grid.find('.grid-item').css({ opacity: 1, visibility: 'visible' });
            refreshAnimations();
        }

        if (typeof $.fn.imagesLoaded === 'function') {
            $grid.imagesLoaded(layoutGrid);
        } else {
            layoutGrid();
        }

        $('.filter-buttons').on('click', 'button', function () {
            $grid.isotope({ filter: $(this).attr('data-filter') });
            $('.filter-buttons button').removeClass('active');
            $(this).addClass('active');
        });
    }

    function initMagnificPopup() {
        if (typeof $.fn.magnificPopup !== 'function') return;
        $('.popup-image').magnificPopup({ type: 'image', gallery: { enabled: true } });
        $('.popup-video, .play-btn').magnificPopup({ type: 'iframe' });
    }

    function initJarallax() {
        if (typeof jarallax !== 'undefined' && document.querySelectorAll('.jarallax').length) {
            jarallax(document.querySelectorAll('.jarallax'), { speed: 0.4 });
            setTimeout(refreshAnimations, 800);
        }
    }

    function initCountdown() {
        const $el = $('#countdown, .countdown-timer');
        if (!$el.length) return;

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30);

        setInterval(function () {
            const now = new Date().getTime();
            const distance = targetDate - now;
            const d = Math.floor(distance / 86400000);
            const h = Math.floor((distance % 86400000) / 3600000);
            const m = Math.floor((distance % 3600000) / 60000);
            const s = Math.floor((distance % 60000) / 1000);

            $el.html(
                '<div class="countdown-item"><span>' + d + '</span>Days</div>' +
                '<div class="countdown-item"><span>' + h + '</span>Hours</div>' +
                '<div class="countdown-item"><span>' + m + '</span>Minutes</div>' +
                '<div class="countdown-item"><span>' + s + '</span>Seconds</div>'
            );
        }, 1000);
    }

    function initNoUiSlider() {
        if (typeof noUiSlider === 'undefined') return;
        const slider = document.getElementById('price-slider');
        if (!slider) return;

        noUiSlider.create(slider, {
            start: [10000],
            connect: [true, false],
            range: { min: 1000, max: 100000 },
            step: 1000,
            tooltips: typeof wNumb !== 'undefined' ? wNumb({ decimals: 0, prefix: '$' }) : false
        });

        slider.noUiSlider.on('update', function (values) {
            const vol = parseInt(values[0]);
            const fee = (vol * 0.029).toFixed(2);
            $('#price-display').text('Estimated fee: $' + fee + ' / month');
        });
    }

    function initOwlCarousel() {
        if (typeof $.fn.owlCarousel !== 'function') return;
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 24,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3500,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            }
        });
    }

    function initTinySlider() {
        if (typeof tns === 'undefined') return;
        if (document.querySelector('.tiny-slider')) {
            tns({
                container: '.tiny-slider',
                items: 4,
                slideBy: 1,
                autoplay: true,
                controls: true,
                nav: false,
                autoplayTimeout: 2500,
                responsive: {
                    320: { items: 2 },
                    640: { items: 3 },
                    900: { items: 4 },
                    1200: { items: 5 }
                }
            });
        }
    }

    function initDateTimePicker() {
        if (typeof flatpickr !== 'undefined') {
            flatpickr('.datetime-picker', {
                enableTime: true,
                dateFormat: 'Y-m-d H:i',
                minDate: 'today',
                theme: 'dark'
            });
            flatpickr('.date-picker', { dateFormat: 'Y-m-d', minDate: 'today' });
        }
    }

    function initBootstrapSelect() {
        if (typeof $.fn.selectpicker === 'function') {
            $('.selectpicker').selectpicker();
        }
    }

    function init3DEffects() {
        $('.card-3d-wrapper, .hero-3d-scene').on('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            $(this).find('.card-3d').css(
                'transform',
                'rotateY(' + (x * 25) + 'deg) rotateX(' + (-y * 25) + 'deg)'
            );
        }).on('mouseleave', function () {
            $(this).find('.card-3d').css('transform', 'rotateY(-15deg) rotateX(10deg)');
        });

        $('.feature-card, .pricing-card').each(function (i) {
            $(this).css('animation-delay', (i * 0.1) + 's');
        });
    }

    function initBackToTop() {
        if (!$('.back-to-top').length) {
            $('body').append('<button class="back-to-top" aria-label="Back to top"><i class="fas fa-arrow-up"></i></button>');
        }
        const $btn = $('.back-to-top');
        $(window).on('scroll', function () {
            $btn.css('display', $(this).scrollTop() > 400 ? 'flex' : 'none');
        });
        $btn.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 700);
        });
    }

    function initPasswordToggle() {
        $('.toggle-password').on('click', function () {
            const $input = $(this).siblings('input');
            const type = $input.attr('type') === 'password' ? 'text' : 'password';
            $input.attr('type', type);
            $(this).toggleClass('fa-eye fa-eye-slash');
        });

        $('#password').on('input', function () {
            const val = $(this).val();
            const $bar = $('.password-strength-bar');
            if (!$bar.length) return;
            let strength = 0;
            if (val.length >= 6) strength += 25;
            if (val.length >= 10) strength += 25;
            if (/[A-Z]/.test(val)) strength += 25;
            if (/[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) strength += 25;
            $bar.css({
                width: strength + '%',
                background: strength < 50 ? '#EF4444' : strength < 75 ? '#FBBF24' : '#10B981'
            });
        });
    }


    console.log('%c Stackly Payment Gateway ', 'background: linear-gradient(135deg,#00E5BE,#3B82F6); color:#050A14; font-size:18px; padding:8px 16px; border-radius:4px; font-weight:bold;');

})(jQuery);
