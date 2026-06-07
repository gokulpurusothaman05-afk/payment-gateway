/**
 * STACKLY PAYMENT GATEWAY - MAIN JAVASCRIPT
 * Advanced Animations & Interactions
 */

(function($) {
    'use strict';

    // ==========================================
    // INITIALIZATION
    // ==========================================
    $(document).ready(function() {
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
    });

    // ==========================================
    // AOS (Animate On Scroll) INITIALIZATION
    // ==========================================
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });
        }
    }

    // ==========================================
    // NAVIGATION
    // ==========================================
    function initNavigation() {
        const $navbar = $('.navbar');
        const $hamburger = $('#hamburger');
        const $navMenu = $('#navMenu');

        // Scroll effect
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 50) {
                $navbar.addClass('scrolled');
            } else {
                $navbar.removeClass('scrolled');
            }
        });

        // Mobile menu toggle
        $hamburger.on('click', function() {
            $navMenu.toggleClass('active');
            $(this).toggleClass('active');
        });

        // Dropdown toggle on mobile
        $('.dropdown > a').on('click', function(e) {
            if ($(window).width() <= 768) {
                e.preventDefault();
                $(this).parent().toggleClass('active');
            }
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.navbar').length) {
                $navMenu.removeClass('active');
                $hamburger.removeClass('active');
            }
        });
    }

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function initCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'));

            if (target) {
                $({ Counter: 0 }).animate({ Counter: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter).toLocaleString());
                    },
                    complete: function() {
                        $this.text(target.toLocaleString());
                    }
                });
            }
        });

        // Trigger counter on scroll
        if (typeof $.fn.appear === 'function') {
            $('.counter').appear(function() {
                $(this).each(function() {
                    const $this = $(this);
                    if (!$this.hasClass('counted')) {
                        $this.addClass('counted');
                        const target = parseInt($this.attr('data-target'));
                        $({ Counter: 0 }).animate({ Counter: target }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.ceil(this.Counter).toLocaleString());
                            }
                        });
                    }
                });
            });
        }
    }

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    function initFAQ() {
        $('.faq-item, .faq-block').on('click', function() {
            $(this).toggleClass('active');
            $(this).siblings().removeClass('active');
        });

        $('.faq-question, .faq-question-header').on('click', function() {
            const $parent = $(this).parent();
            $parent.toggleClass('active');
            $parent.siblings().removeClass('active');
        });
    }

    // ==========================================
    // SLIDERS
    // ==========================================
    function initSliders() {
        // Testimonials Slider (Slick)
        if (typeof $.fn.slick === 'function') {
            $('#testimonialsSlider, .testimonials-slider, .stories-slider').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            // Payment methods slider
            $('.payment-slider').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    }

    // ==========================================
    // SCROLL EFFECTS
    // ==========================================
    function initScrollEffects() {
        // Parallax effect
        $(window).on('scroll', function() {
            const scrolled = $(this).scrollTop();

            // Hero parallax
            $('.hero-image, .hero-visual').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');

            // Shapes animation
            $('.shape-1').css('transform', 'translateY(' + (scrolled * 0.2) + 'px) rotate(' + (scrolled * 0.1) + 'deg)');
            $('.shape-2').css('transform', 'translateY(' + (scrolled * -0.15) + 'px)');
            $('.shape-3').css('transform', 'translateY(' + (scrolled * 0.25) + 'px) rotate(' + (scrolled * -0.1) + 'deg)');
        });

        // Reveal animations on scroll
        const revealElements = document.querySelectorAll('.feature-card, .service-card, .pricing-card');

        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            revealOnScroll.observe(el);
        });
    }

    // ==========================================
    // TEXT ANIMATIONS
    // ==========================================
    function initTextAnimations() {
        // Animate letters
        if (typeof anime !== 'undefined') {
            anime.timeline({ loop: false })
                .add({
                    targets: '.letters',
                    opacity: [0, 1],
                    easing: 'easeInOutQuad',
                    duration: 2250,
                    delay: (el, i) => 150 * (i + 1)
                });
        }

        // Circle type for curved text
        if (typeof CircleType !== 'undefined') {
            const circleText = new CircleType(document.querySelector('.circle-text'));
        }
    }

    // ==========================================
    // PARTICLES EFFECT
    // ==========================================
    function initParticles() {
        const particlesContainer = document.getElementById('particles');

        if (particlesContainer) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 5 + 2}px;
                    height: ${Math.random() * 5 + 2}px;
                    background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 10 + 5}s linear infinite;
                    animation-delay: ${Math.random() * 5}s;
                `;
                particlesContainer.appendChild(particle);
            }
        }

        // Login page particles
        const loginParticles = document.querySelector('.login-particles');
        if (loginParticles) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 8 + 4}s linear infinite;
                `;
                loginParticles.appendChild(particle);
            }
        }
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    function initSmoothScroll() {
        $('a.smooth-scroll[href*="#"]').on('click', function(e) {
            e.preventDefault();

            const target = $(this.getAttribute('href'));

            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'easeInOutExpo');
            }
        });
    }

    // ==========================================
    // FORM VALIDATION
    // ==========================================
    function initFormValidation() {
        // Contact form
        $('#contactForm, #contactFormMain').on('submit', function(e) {
            e.preventDefault();

            const $form = $(this);
            const formData = $form.serialize();

            // Show success message (demo)
            alert('Thank you for your message! We will get back to you soon.');
            $form[0].reset();
        });

        // jQuery Validate
        if (typeof $.fn.validate === 'function') {
            $('.contact-form').validate({
                rules: {
                    name: 'required',
                    email: {
                        required: true,
                        email: true
                    },
                    message: 'required'
                },
                messages: {
                    name: 'Please enter your name',
                    email: {
                        required: 'Please enter your email',
                        email: 'Please enter a valid email address'
                    },
                    message: 'Please enter your message'
                },
                submitHandler: function(form) {
                    alert('Form submitted successfully!');
                    form.reset();
                }
            });
        }
    }

    // ==========================================
    // GSAP ANIMATIONS
    // ==========================================
    function initGSAPAnimations() {
        if (typeof gsap !== 'undefined') {
            // Hero animation
            gsap.from('.hero-title', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });

            gsap.from('.hero-subtitle', {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 0.2,
                ease: 'power3.out'
            });

            gsap.from('.hero-buttons', {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 0.4,
                ease: 'power3.out'
            });

            // Card animations
            gsap.from('.feature-card, .pricing-card', {
                scrollTrigger: {
                    trigger: '.features, .pricing',
                    start: 'top 80%'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power2.out'
            });

            // Floating animation
            gsap.to('.floating-cards .card-3d', {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                stagger: 0.3
            });

            // SVG path animation
            if (document.querySelector('.wave-line')) {
                gsap.from('.wave-line', {
                    drawSVG: 0,
                    duration: 2,
                    ease: 'power2.inOut'
                });
            }
        }
    }

    // ==========================================
    // DASHBOARD SIDEBAR TOGGLE
    // ==========================================
    $('#sidebarToggle').on('click', function() {
        $('#sidebar').toggleClass('active');
    });

    // ==========================================
    // MAGNIFIC POPUP (for images/videos)
    // ==========================================
    if (typeof $.fn.magnificPopup === 'function') {
        $('.popup-image').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('.popup-video').magnificPopup({
            type: 'iframe'
        });
    }

    // ==========================================
    // ISOTOPE (for filtering/masonry)
    // ==========================================
    if (typeof $.fn.isotope === 'function') {
        const $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows'
        });

        $('.filter-buttons').on('click', 'button', function() {
            const filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $('.filter-buttons button').removeClass('active');
            $(this).addClass('active');
        });
    }

    // ==========================================
    // COUNTDOWN TIMER
    // ==========================================
    function initCountdown(targetDate) {
        const countdownElement = $('#countdown');

        if (countdownElement.length) {
            const countdownDate = new Date(targetDate).getTime();

            const timer = setInterval(function() {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                countdownElement.html(
                    `<div class="countdown-item"><span>${days}</span>Days</div>` +
                    `<div class="countdown-item"><span>${hours}</span>Hours</div>` +
                    `<div class="countdown-item"><span>${minutes}</span>Minutes</div>` +
                    `<div class="countdown-item"><span>${seconds}</span>Seconds</div>`
                );

                if (distance < 0) {
                    clearInterval(timer);
                    countdownElement.html('EXPIRED');
                }
            }, 1000);
        }
    }

    // ==========================================
    // JARALLAX (Parallax)
    // ==========================================
    if (typeof jarallax !== 'undefined') {
        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.5
        });
    }

    // ==========================================
    // NOUISLIDER (Range Slider)
    // ==========================================
    if (typeof noUiSlider !== 'undefined') {
        const priceSlider = document.getElementById('price-slider');

        if (priceSlider) {
            noUiSlider.create(priceSlider, {
                start: [20, 80],
                connect: true,
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        }
    }

    // ==========================================
    // OWL CAROUSEL
    // ==========================================
    if (typeof $.fn.owlCarousel === 'function') {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    }

    // ==========================================
    // TINY SLIDER
    // ==========================================
    if (typeof tns !== 'undefined') {
        const tinySlider = tns({
            container: '.tiny-slider',
            items: 3,
            slideBy: 1,
            autoplay: true,
            controls: false,
            nav: true,
            responsive: {
                320: {
                    items: 1
                },
                640: {
                    items: 2
                },
                900: {
                    items: 3
                }
            }
        });
    }

    // ==========================================
    // LAZY LOADING
    // ==========================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // PRELOADER
    // ==========================================
    $(window).on('load', function() {
        $('.preloader').fadeOut('slow');
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = $('<button class="back-to-top"><i class="fas fa-arrow-up"></i></button>');
    $('body').append(backToTop);

    backToTop.css({
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
        zIndex: '9999',
        transition: 'all 0.3s ease'
    });

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    });

    backToTop.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ==========================================
    // TOOLTIP
    // ==========================================
    $('[data-toggle="tooltip"]').tooltip();

    // ==========================================
    // CONSOLE LOG ANIMATION
    // ==========================================
    console.log('%c Stackly Payment Gateway ', 'background: #6C63FF; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Advanced animations powered by GSAP, AOS, and more! ', 'background: #4CAF50; color: white; font-size: 14px; padding: 5px;');

})(jQuery);