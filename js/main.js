document.addEventListener('DOMContentLoaded', () => {
    // Scroll header wrapper sticky behavior
    const headerWrapper = document.querySelector('.header-wrapper');
    if (headerWrapper) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                headerWrapper.classList.add('scrolled');
            } else {
                headerWrapper.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run once on load
    }

    // Shared cursor hover state — used by cursor loop & dynamic elements (e.g. mood popup)
    let isHovering = false;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Ignore empty anchor links
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target && window.lenis) {
                window.lenis.scrollTo(target);
            } else if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Two-way AXA-style scroll reveal effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before it fully hits the bottom
    };

    const observer = new IntersectionObserver((entries) => {
        let delayCounter = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set staggered transition delay dynamically
                entry.target.style.transitionDelay = `${delayCounter * 120}ms`;
                
                // Add the class to trigger the smooth CSS transition
                entry.target.classList.add('reveal-active');
                delayCounter++;
                
                // Stop observing this element once it has been revealed to prevent scroll flickering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal effect to elements across all pages
    const revealElements = document.querySelectorAll(`
        .section-header, .bento-item, 
        .champions-top-line, .champ-col-left, .champ-col-mid, .champ-col-right, 
        .champ-img-large-wrapper, .champ-img-small-wrapper,
        .about-text, .stats, .contact-box,
        .resume-header-grid > div, .info-block, .what-i-do,
        .experience-section h3, .exp-card, 
        .collab-item, .mini-exp-card, .premium-card,
        .axa-image-card, .axa-about-container > div,
        .glass-hero-content, .glass-card, .glass-mid-text, .glass-scroll-indicator,
        .brutal-typo, .brutal-cards, .intro-hybrid-section
    `);
    
    revealElements.forEach(el => {
        // Strip inline styles from previous implementation
        el.style.opacity = "";
        el.style.transform = "";
        el.style.transition = "";
        
        // Add the base reveal class
        el.classList.add('reveal');
        
        observer.observe(el);
    });

    // Search Feature
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            // Define searchable items on both pages
            const searchableItems = document.querySelectorAll('.bento-item, .exp-card, .collab-item, .mini-exp-card, .skills-list .pill');
            
            if (query === '') {
                // Reset visibility
                searchableItems.forEach(el => {
                    el.style.display = '';
                });
                return;
            }

            // Filter elements based on query matching their inner text
            searchableItems.forEach(el => {
                const text = el.textContent.toLowerCase();
                if (text.includes(query)) {
                    el.style.display = '';
                } else {
                    el.style.display = 'none';
                }
            });
        });
    }

    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
            }
            localStorage.setItem('theme', theme);
        });
    });

    // Mood Tracker Popup
    const showMoodTracker = () => {
        const moods = [
            { emoji: '😴', label: 'Tired',    score: 1, msg: 'Rest up! Great things come to refreshed minds. 💤' },
            { emoji: '😐', label: 'Meh',      score: 2, msg: 'Hang in there — something inspiring is just a scroll away. 🌱' },
            { emoji: '😊', label: 'Good',     score: 3, msg: 'Glad you\'re feeling good! Enjoy exploring my work. 🎨' },
            { emoji: '😄', label: 'Great',    score: 4, msg: 'That energy is contagious! Let\'s create something amazing. ✨' },
            { emoji: '🤩', label: 'Hyped',    score: 5, msg: 'Love the enthusiasm! You\'re in the right place. 🚀' },
        ];

        let selected = null;

        const popup = document.createElement('div');
        popup.className = 'mood-popup';
        popup.id = 'mood-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', 'Mood Tracker');

        popup.innerHTML = `
            <div class="mood-popup-inner" id="mood-form-area">
                <button class="mood-close" id="mood-close" aria-label="Close">&times;</button>
                <div class="mood-header">
                    <span class="mood-pulse"></span>
                    <span class="mood-label">Visitor Mood Check</span>
                </div>
                <p class="mood-question">How are you feeling today?</p>
                <p class="mood-subtext">Your vibe shapes the experience. Pick one ↓</p>
                <div class="mood-emojis" id="mood-emojis">
                    ${moods.map((m, i) => `
                        <button class="mood-btn" data-index="${i}" aria-label="${m.label}" title="${m.label}">
                            <span class="mood-emoji">${m.emoji}</span>
                            <span>${m.label}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="mood-bar-wrap">
                    <div class="mood-bar-label">
                        <span>Mood Level</span>
                        <span id="mood-bar-pct">—</span>
                    </div>
                    <div class="mood-bar-track">
                        <div class="mood-bar-fill" id="mood-bar-fill"></div>
                    </div>
                </div>
                <button class="mood-submit" id="mood-submit">Share My Mood →</button>
            </div>
            <div class="mood-thankyou" id="mood-thankyou">
                <div class="mood-thankyou-icon" id="mood-ty-icon"></div>
                <h4 id="mood-ty-title">Thank you!</h4>
                <p id="mood-ty-msg"></p>
                <div class="mood-thankyou-bar">
                    <div class="mood-thankyou-bar-fill"></div>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        // Register popup buttons with custom cursor hover system
        if (window.innerWidth > 768) {
            const cursorEl = document.getElementById('custom-cursor');
            popup.querySelectorAll('button, .mood-btn').forEach(el => {
                el.addEventListener('mouseenter', () => { isHovering = true; cursorEl && cursorEl.classList.add('hovering'); });
                el.addEventListener('mouseleave', () => { isHovering = false; cursorEl && cursorEl.classList.remove('hovering'); });
            });
        }


        // Slide in after delay
        setTimeout(() => popup.classList.add('show'), 1800);

        const closePopup = () => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 700);
        };

        // Close button
        popup.querySelector('#mood-close').addEventListener('click', closePopup);

        // Mood button selection
        const moodBtns = popup.querySelectorAll('.mood-btn');
        const barFill   = popup.querySelector('#mood-bar-fill');
        const barPct    = popup.querySelector('#mood-bar-pct');
        const submitBtn = popup.querySelector('#mood-submit');

        moodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                moodBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selected = parseInt(btn.dataset.index);
                const score = moods[selected].score;
                const pct = (score / 5) * 100;
                barFill.style.width = pct + '%';
                barPct.textContent  = Math.round(pct) + '%';
                submitBtn.classList.add('active');
            });
        });

        // Submit
        submitBtn.addEventListener('click', () => {
            if (selected === null) return;
            const mood = moods[selected];

            // Save to localStorage
            localStorage.setItem('mood_last', mood.label);
            localStorage.setItem('mood_ts', Date.now());

            // Show thank-you
            popup.querySelector('#mood-form-area').style.display = 'none';
            const ty = popup.querySelector('#mood-thankyou');
            popup.querySelector('#mood-ty-icon').textContent  = mood.emoji;
            popup.querySelector('#mood-ty-title').textContent = `You're feeling ${mood.label}!`;
            popup.querySelector('#mood-ty-msg').textContent   = mood.msg;
            ty.classList.add('visible');

            // Auto-close after 3 s (bar animation duration)
            setTimeout(closePopup, 3200);
        });
    };


    // Page Loader Logic
    window.addEventListener('load', () => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
                showMoodTracker();
            }, 500);
        } else {
            showMoodTracker();
        }
    });

    // Custom Tennis Cursor Logic
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.id = 'custom-cursor';
        // Inject SVG pointer + ball children
        cursor.innerHTML = `
            <svg class="cursor-pointer" width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5 L1.5 17 L5 12.5 L7.5 19 L10.5 17.8 L8 11.2 L13.5 11.2 Z"
                      fill="white" stroke="rgba(0,0,0,0.35)" stroke-width="1" stroke-linejoin="round"/>
            </svg>
            <div class="cursor-ball"></div>
        `;
        document.body.appendChild(cursor);

        const ball = cursor.querySelector('.cursor-ball');

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ballX = mouseX;
        let ballY = mouseY;
        let currentScale = 1.0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Add hover effect to interactive elements
        const interactables = document.querySelectorAll('a, button, input, textarea, select, .educaa-center-dome img, .bento-item');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => { isHovering = true; cursor.classList.add('hovering'); });
            el.addEventListener('mouseleave', () => { isHovering = false; cursor.classList.remove('hovering'); });
        });

        function animateCursor() {
            // Move pointer instantly (no delay)
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            // Smoothly trail the ball (with physics/delay)
            ballX += (mouseX - ballX) * 0.32;
            ballY += (mouseY - ballY) * 0.32;

            // Calculate offset relative to container (ball defaults to bottom:0, right:0, meaning top-left is at 14px, 14px)
            const dx = (ballX - mouseX) - 14;
            const dy = (ballY - mouseY) - 14;

            // Interpolate scale in JS to avoid CSS transition conflicts
            const targetScale = isHovering ? 1.45 : 1.0;
            currentScale += (targetScale - currentScale) * 0.25;

            ball.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${currentScale})`;

            requestAnimationFrame(animateCursor);
        }

        // Start animation loop
        animateCursor();
    }


    // Hero Local Time — reads directly from user's system clock, no permission needed
    const userInfoEl = document.getElementById('hero-user-info');
    if (userInfoEl) {

        // Get user's IANA timezone from system (e.g. "Asia/Jakarta")
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Derive a short, readable timezone label (e.g. "Asia/Jakarta" → "Jakarta")
        const tzLabel = (() => {
            const parts = tz.split('/');
            return parts[parts.length - 1].replace(/_/g, ' ');
        })();

        // Get UTC offset string (e.g. "GMT+7")
        const getOffset = () => {
            const off = -new Date().getTimezoneOffset(); // minutes
            const h   = Math.floor(Math.abs(off) / 60);
            const m   = Math.abs(off) % 60;
            const sign = off >= 0 ? '+' : '-';
            return `GMT${sign}${h}${m ? ':' + String(m).padStart(2,'0') : ''}`;
        };

        const renderTime = () => {
            const now  = new Date();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            userInfoEl.innerHTML =
                `<span style="opacity:0.65;">LOCAL TIME:</span> ` +
                `<strong style="color:#fff;">${time}</strong>` +
                `&nbsp;&nbsp;|&nbsp;&nbsp;` +
                `<span style="opacity:0.65;">TIMEZONE:</span> ` +
                `<strong style="color:#fff;">${tzLabel} (${getOffset()})</strong>`;
        };

        renderTime();
        setInterval(renderTime, 1000);
    }

<<<<<<< HEAD
    // ── Weather Clock Widget ────────────────────────────────────────────────
    const widgetTime     = document.getElementById('widget-time');
    const widgetAmpm     = document.getElementById('widget-ampm');
    const widgetDay      = document.getElementById('widget-day');
    const widgetLocation = document.getElementById('widget-location');
    const widgetStatus   = document.getElementById('widget-status');
    const widgetTemp     = document.getElementById('widget-temp');
    const widgetIcon     = document.getElementById('widget-weather-icon');
    const widgetFeels    = document.getElementById('widget-feels');
    const widgetWind     = document.getElementById('widget-wind');
    const widgetPressure = document.getElementById('widget-pressure');
    const widgetHumidity = document.getElementById('widget-humidity');
    const widgetSunrise  = document.getElementById('widget-sunrise');
    const widgetSunset   = document.getElementById('widget-sunset');

    if (widgetTime && widgetAmpm) {

        // ── 1. Real-time clock ──────────────────────────────────────────────
        const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const updateWidgetTime = () => {
            const now   = new Date();
            let hours   = now.getHours();
            const mins  = String(now.getMinutes()).padStart(2, '0');
            const ampm  = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;

            if (widgetTime) widgetTime.textContent = `${hours}:${mins}`;
            if (widgetAmpm) widgetAmpm.textContent = ampm;
            if (widgetDay)  widgetDay.textContent  = dayNames[now.getDay()];
        };
        updateWidgetTime();
        setInterval(updateWidgetTime, 1000);

        // ── 2. WMO weather code → label ─────────────────────────────────────
        const wmoLabel = code => {
            if (code === 0)  return 'Clear sky';
            if (code <= 2)   return 'Partly cloudy';
            if (code === 3)  return 'Overcast';
            if (code <= 49)  return 'Foggy';
            if (code <= 55)  return 'Drizzle';
            if (code <= 65)  return 'Rainy';
            if (code <= 77)  return 'Snowy';
            if (code <= 82)  return 'Showers';
            if (code <= 99)  return 'Thunderstorm';
            return 'Unknown';
        };

        // ── 3. WMO → big icon SVG (64px) ────────────────────────────────────
        const wmoIcon = code => {
            const s = '#c4f042', sz = '64';
            const base = `width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`;
            if (code === 0)
                return `<svg ${base}><circle cx="12" cy="12" r="5" fill="${s}" fill-opacity="0.25"/>
                    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>`;
            if (code <= 2)
                return `<svg ${base}><circle cx="8" cy="13" r="4"/><path d="M14.5 8.5a5.5 5.5 0 1 1 0 11H7"/></svg>`;
            if (code <= 65 || (code >= 80 && code <= 82))
                return `<svg ${base}>
                    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
                    <line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="13" x2="8" y2="15"/>
                    <line x1="16" y1="19" x2="16" y2="21"/><line x1="16" y1="13" x2="16" y2="15"/>
                    <line x1="12" y1="21" x2="12" y2="23"/><line x1="12" y1="15" x2="12" y2="17"/>
                </svg>`;
            if (code >= 95)
                return `<svg ${base}>
                    <path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
                    <polyline points="13 11 9 17 15 17 11 23"/>
                </svg>`;
            return `<svg ${base}><path d="M17 18a5 5 0 0 0 0-10h-1A7 7 0 1 0 6 18z"/></svg>`;
        };

        // ── 4. Format sunrise/sunset time ───────────────────────────────────
        const fmtTime = iso => {
            const d = new Date(iso);
            let h = d.getHours(), m = String(d.getMinutes()).padStart(2,'0');
            const ap = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            return `${h}:${m} ${ap}`;
        };

        // ── 5. Fetch full weather from Open-Meteo ────────────────────────────
        const fetchWeather = async (lat, lon) => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`
                    + `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,surface_pressure,relativehumidity_2m`
                    + `&daily=sunrise,sunset&timezone=auto&forecast_days=1`;
                const res  = await fetch(url);
                const data = await res.json();
                const c    = data.current;

                const temp  = Math.round(c.temperature_2m);
                const feels = Math.round(c.apparent_temperature);
                const code  = c.weathercode;
                const wind  = Math.round(c.windspeed_10m);
                const press = Math.round(c.surface_pressure);
                const hum   = c.relativehumidity_2m;

                if (widgetTemp)     widgetTemp.textContent     = `${temp}°`;
                if (widgetFeels)    widgetFeels.textContent    = `${feels}°`;
                if (widgetWind)     widgetWind.textContent     = `${wind} km/h`;
                if (widgetPressure) widgetPressure.textContent = `${press} MB`;
                if (widgetHumidity) widgetHumidity.textContent = `${hum}%`;
                if (widgetStatus)   widgetStatus.textContent   = wmoLabel(code);
                if (widgetIcon)     widgetIcon.innerHTML        = wmoIcon(code);

                if (data.daily?.sunrise?.[0]) {
                    if (widgetSunrise) widgetSunrise.textContent = fmtTime(data.daily.sunrise[0]);
                }
                if (data.daily?.sunset?.[0]) {
                    if (widgetSunset) widgetSunset.textContent = fmtTime(data.daily.sunset[0]);
                }
            } catch (e) {
                if (widgetStatus) widgetStatus.textContent = 'Unavailable';
            }
        };

        // ── 6. Reverse-geocode city ──────────────────────────────────────────
        const fetchCity = async (lat, lon) => {
            try {
                const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, { headers: { 'Accept-Language': 'en' } });
                const data = await res.json();
                const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Your Location';
                if (widgetLocation) widgetLocation.textContent = city;
            } catch (e) {
                if (widgetLocation) widgetLocation.textContent = 'Your Location';
            }
        };

        // ── 7. Boot: Geolocation → IP fallback ──────────────────────────────
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { latitude: lat, longitude: lon } = pos.coords;
                    fetchWeather(lat, lon);
                    fetchCity(lat, lon);
                    setInterval(() => fetchWeather(lat, lon), 10 * 60 * 1000);
                },
                async () => {
                    try {
                        const res  = await fetch('https://ipapi.co/json/');
                        const data = await res.json();
                        if (widgetLocation) widgetLocation.textContent = data.city || 'Your Location';
                        fetchWeather(data.latitude, data.longitude);
                    } catch (e) {
                        if (widgetLocation) widgetLocation.textContent = 'Your Location';
                        if (widgetStatus)   widgetStatus.textContent   = 'Unavailable';
                    }
                }
            );
        } else {
            if (widgetLocation) widgetLocation.textContent = 'Your Location';
            if (widgetStatus)   widgetStatus.textContent   = 'Unavailable';
        }
    }

=======
>>>>>>> e740409 (perubahan 10 juni)
    // Initialize Lenis
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis();
        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }
});
