 tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'custom-accent': '#00ADB5',
                        'dark-bg': '#121212',
                        'medium-dark': '#1a1a1a',
                        'light-text': '#EAEAEA',
                    }
                }
            }
        }
        
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
            innerCursor = document.getElementById('custom-cursor-inner');
            outerCursor = document.getElementById('custom-cursor-outer');
            if (!innerCursor || !outerCursor) return;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
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
            // Only targets anchors, buttons, and elements with .group or .cursor-pointer
            const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, .group');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseover', () => {
                    if (innerCursor && outerCursor) {
                        innerCursor.classList.add('cursor-hover');
                        outerCursor.classList.add('cursor-hover');
                    }
                });
                el.addEventListener('mouseout', () => {
                    if (innerCursor && outerCursor) {
                        innerCursor.classList.remove('cursor-hover');
                        outerCursor.classList.remove('cursor-hover');
                    }
                });
            });
        }
        
        // --- Looping Typewriter Animation Logic ---
        
        const roles = ['Web Developer', 'Design Enthusiast', 'Automation Specialist'];
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
                    typingSpeed = 100;
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
                    typingSpeed = pauseTime;
                    setTimeout(loopingTypeWriter, pauseTime);
                } else {
                    setTimeout(loopingTypeWriter, typingSpeed);
                }
            }
        }
        
        // --- Progress Bar Animation Logic (Intersection Observer) ---
        
        let observer;

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

            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            };

            observer = new IntersectionObserver(animateProgressBars, options);
            observer.observe(skillsSection);
        }
        
        // --- Initialization ---

        window.onload = function() {
            initCursor();
            loopingTypeWriter();
            setupProgressObserver();
        };