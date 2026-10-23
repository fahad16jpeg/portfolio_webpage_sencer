        // --- Global Variables for DOM elements ---
        let innerCursor, outerCursor;

        // --- Custom Cursor Logic (Wobble & Hover) ---
        let mouseX = 0;
        let mouseY = 0;
        let innerCursorX = 0;
        let innerCursorY = 0;
        let outerCursorX = 0;
        let outerCursorY = 0;

        function initCursor() {
            // Only use the custom cursor on devices with a real mouse
            if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

            innerCursor = document.getElementById('custom-cursor-inner');
            outerCursor = document.getElementById('custom-cursor-outer');
            if (!innerCursor || !outerCursor) return;

            document.documentElement.classList.add('has-custom-cursor');

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                document.documentElement.classList.add('cursor-visible');
            });
            document.addEventListener('mouseleave', () => {
                document.documentElement.classList.remove('cursor-visible');
            });

            innerCursorX = outerCursorX = mouseX;
            innerCursorY = outerCursorY = mouseY;

            setupCursorHoverListeners();
            animateCursor();
        }

        function animateCursor() {
            innerCursorX += (mouseX - innerCursorX) * 0.15;
            innerCursorY += (mouseY - innerCursorY) * 0.15;
            innerCursor.style.left = `${innerCursorX}px`;
            innerCursor.style.top = `${innerCursorY}px`;

            outerCursorX += (mouseX - outerCursorX) * 0.08;
            outerCursorY += (mouseY - outerCursorY) * 0.08;
            outerCursor.style.left = `${outerCursorX}px`;
            outerCursor.style.top = `${outerCursorY}px`;

            requestAnimationFrame(animateCursor);
        }

        function setupCursorHoverListeners() {
            // Targets anchors, buttons, and elements with .group or .cursor-pointer
            const selector = 'a, button, .cursor-pointer, .group';

            document.addEventListener('mouseover', (e) => {
                if (e.target.closest(selector)) {
                    innerCursor.classList.add('cursor-hover');
                    outerCursor.classList.add('cursor-hover');
                }
            });
            document.addEventListener('mouseout', (e) => {
                if (e.target.closest(selector) && !(e.relatedTarget && e.relatedTarget.closest(selector))) {
                    innerCursor.classList.remove('cursor-hover');
                    outerCursor.classList.remove('cursor-hover');
                }
            });
        }

        // --- Looping Typewriter Animation Logic ---

        const roles = ['Web Developer', 'Software Developer', 'Automation Specialist', 'Design Enthusiast'];
        const containerId = "typewriter-target";
        let roleIndex = 0;
        let isDeleting = false;
        let charIndex = 0;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let pauseTime = 1500;

        function loopingTypeWriter() {
            const container = document.getElementById(containerId);
            if (!container) return;

            const currentRole = roles[roleIndex];

            if (isDeleting) {
                charIndex--;
                const typedText = currentRole.substring(0, charIndex);
                container.innerHTML = typedText + '<span class="typewriter-cursor"></span>';

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(loopingTypeWriter, 500);
                } else {
                    setTimeout(loopingTypeWriter, deletingSpeed);
                }
            } else {
                charIndex++;
                const typedText = currentRole.substring(0, charIndex);
                container.innerHTML = typedText + '<span class="typewriter-cursor"></span>';

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(loopingTypeWriter, pauseTime);
                } else {
                    setTimeout(loopingTypeWriter, typingSpeed);
                }
            }
        }

        // --- Progress Bar Animation Logic (Intersection Observer) ---

        function animateProgressBars(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = document.querySelectorAll('.progress-bar');

                    bars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = `${targetWidth}%`;
                    });

                    observer.unobserve(entry.target);
                }
            });
        }

        function setupProgressObserver() {
            const skillsSection = document.getElementById('skills');
            if (!skillsSection) return;

            const observer = new IntersectionObserver(animateProgressBars, { threshold: 0.2 });
            observer.observe(skillsSection);
        }

        // --- Scroll Reveal ---

        function setupReveal() {
            if (!('IntersectionObserver' in window)) return;
            document.documentElement.classList.add('reveal-ready');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }

        // --- Navigation: mobile menu, active link, header border, back-to-top ---

        function setupNavigation() {
            const toggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');

            if (toggle && mobileMenu) {
                toggle.addEventListener('click', () => {
                    const isOpen = !mobileMenu.classList.toggle('hidden');
                    toggle.setAttribute('aria-expanded', isOpen);
                });
                mobileMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                        toggle.setAttribute('aria-expanded', 'false');
                    });
                });
            }

            const navLinks = document.querySelectorAll('.nav-link');
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        navLinks.forEach(link => {
                            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
                        });
                    }
                });
            }, { rootMargin: '-45% 0px -50% 0px' });

            document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));

            const header = document.getElementById('site-header');
            const backToTop = document.getElementById('back-to-top');
            const onScroll = () => {
                const scrolled = window.scrollY > 20;
                header.classList.toggle('is-scrolled', scrolled);
                backToTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        // --- Initialization ---

        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('year').textContent = new Date().getFullYear();
            initCursor();
            loopingTypeWriter();
            setupProgressObserver();
            setupReveal();
            setupNavigation();
        });
