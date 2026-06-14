class GlobalNavbar extends HTMLElement {
    connectedCallback() {
        const page = this.getAttribute('page') || 'home';
        const isResume = page === 'resume';
        const isDetail = page === 'detail';
        const isProjects = page === 'projects';
        const needsHomePrefix = isResume || isDetail || isProjects;
        const childrenHTML = this.innerHTML; // Preserves inner HTML like sub-nav-bar for detail page

        let themeToggleHTML = '';
        if (isResume) {
            themeToggleHTML = `
                <button class="theme-toggle" id="theme-toggle-resume" aria-label="Toggle Dark/Light Mode" style="border-radius: 50px; width: auto; padding: 0 16px; gap: 8px;">
                    <span class="icon-sun" style="display: inline-flex; align-items: center; gap: 4px;">
                        <picture style="width: 20px; height: 20px; display: inline-block;">
                            <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31e/512.webp" type="image/webp">
                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31e/512.gif" alt="🌞" width="20" height="20">
                        </picture>
                    </span>
                    <span class="icon-moon" style="display: inline-flex; align-items: center; gap: 4px;">
                        <picture style="width: 20px; height: 20px; display: inline-block;">
                            <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31b/512.webp" type="image/webp">
                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31b/512.gif" alt="🌛" width="20" height="20">
                        </picture>
                    </span>
                </button>
            `;
        } else {
            themeToggleHTML = `
                <button class="theme-toggle" id="${isDetail ? 'theme-toggle-nav' : 'theme-toggle'}" aria-label="Toggle Dark/Light Mode">
                    <span class="icon-sun" style="display: flex; align-items: center; justify-content: center;">
                        <picture style="width: 24px; height: 24px; display: block;">
                            <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31e/512.webp" type="image/webp">
                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31e/512.gif" alt="🌞" width="24" height="24">
                        </picture>
                    </span>
                    <span class="icon-moon" style="display: flex; align-items: center; justify-content: center;">
                        <picture style="width: 24px; height: 24px; display: block;">
                            <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31b/512.webp" type="image/webp">
                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31b/512.gif" alt="🌛" width="24" height="24">
                        </picture>
                    </span>
                </button>
            `;
        }

        const projectHref = 'projects.html';
        const tulisanHref = needsHomePrefix ? 'index.html#' : '#';
        const contactHref = needsHomePrefix ? 'index.html#contact' : '#contact';
        const contactClass = (isResume || isProjects) ? 'btn-black' : 'btn-primary btn-nav';

        this.innerHTML = `
            <header class="${isDetail ? 'docs-header' : 'header-wrapper'}">
                <div class="top-banner-marquee">
                    <div class="marquee-content">
                        <span>It’s not just about design — it’s about showing who you really are. Stay bold, stay confident, and let your creativity be the main character. 🎾</span>
                        <span>It’s not just about design — it’s about showing who you really are. Stay bold, stay confident, and let your creativity be the main character. 🎾</span>
                    </div>
                </div>
                <nav class="navbar awwwards-nav ${isDetail ? 'top-nav-bar' : ''}">
                    <div class="nav-left">
                        <a href="index.html" class="logo-w" style="display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;">
                            <picture style="width: 100%; height: 100%; display: block;">
                                <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f98a/512.webp" type="image/webp">
                                <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f98a/512.gif" alt="🦊" width="38" height="38">
                            </picture>
                        </a>
                        <ul class="nav-links-main">
                            <li><a href="index.html" data-i18n="nav_home">Home</a></li>
                            <li><a href="${projectHref}" data-i18n="nav_project">Project</a></li>
                            <li><a href="${tulisanHref}" data-i18n="nav_tulisan">Blog</a></li>
                            <li><a href="resume.html"><span data-i18n="nav_resume">Resume</span> <span class="badge" data-i18n="nav_new">New</span></a></li>
                        </ul>
                    </div>
                    <div class="nav-right">
                        ${themeToggleHTML}
                        <div class="lang-selector-minimal lang-selector">
                            <button data-lang="id" class="active">ID</button>
                            <span>/</span>
                            <button data-lang="en">EN</button>
                            <span>/</span>
                            <button data-lang="zh">ZH</button>
                        </div>
                        <a href="${contactHref}" class="${contactClass}" data-i18n="nav_contact">Contact</a>
                    </div>
                </nav>
                ${isDetail ? childrenHTML : ''}
            </header>
        `;
    }
}

class GlobalFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="footer-clients-banner">
                <div class="client-text">Trusted by <strong>many</strong></div>
                <div class="client-logos-marquee">
                    <div class="client-logos-track">
                        <!-- Group 1 -->
                        <div class="client-logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20" stroke-opacity="0.3"/></svg>
                            Luminary
                        </div>
                        <div class="client-logo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                            45 Degrees°
                        </div>
                        <div class="client-logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"/><path d="M11 11l2 2"/></svg>
                            Codecraft_
                        </div>
                        <div class="client-logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4"/><path d="M4 16c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4" stroke-opacity="0.5"/><path d="M4 20c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4" stroke-opacity="0.2"/></svg>
                            Frequencii
                        </div>
                        <!-- Group 2 for infinite scroll -->
                        <div class="client-logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20" stroke-opacity="0.3"/></svg>
                            Luminary
                        </div>
                        <div class="client-logo">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                            45 Degrees°
                        </div>
                        <div class="client-logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor"/><rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor"/><path d="M11 11l2 2"/></svg>
                            Codecraft_
                        </div>
                        <div class="client-logo">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4"/><path d="M4 16c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4" stroke-opacity="0.5"/><path d="M4 20c2 0 2-4 4-4s2 4 4 4 2-4 4-4 2 4 4 4" stroke-opacity="0.2"/></svg>
                            Frequencii
                        </div>
                    </div>
                </div>
            </div>
            <footer class="modern-footer">
                <div class="footer-social-feed">
                    <div class="feed-card" style="background-image: url('assets/workspace_clean.jpg')">
                        <div class="feed-overlay">
                            <span class="feed-tag">Workspace</span>
                            <div class="play-btn-circle">▶</div>
                        </div>
                    </div>
                    <div class="feed-card" style="background-image: url('assets/keyboard_concept.png')">
                        <div class="feed-overlay">
                            <span class="feed-tag">Keyboard Design</span>
                            <div class="play-btn-circle">▶</div>
                        </div>
                    </div>
                    <div class="feed-card" style="background-image: url('assets/educaa_portrait.png')">
                        <div class="feed-overlay">
                            <span class="feed-tag">Educaa App</span>
                            <div class="play-btn-circle">▶</div>
                        </div>
                    </div>
                    <div class="feed-card" style="background-image: url('assets/champ_small_1780765834180.png')">
                        <div class="feed-overlay">
                            <span class="feed-tag">Tennis Arena</span>
                            <div class="play-btn-circle">▶</div>
                        </div>
                    </div>
                    <div class="feed-card" style="background-image: url('assets/workspace_warm.jpg')">
                        <div class="feed-overlay">
                            <span class="feed-tag">Design Studio</span>
                            <div class="play-btn-circle">▶</div>
                        </div>
                    </div>
                    <div class="feed-card" style="background-image: url('assets/tooltip_img.png')">
                        <div class="feed-overlay">
                            <span class="feed-tag">UI Interactions</span>
                            <div class="play-btn-circle">▶</div>
                        </div>
                    </div>
                </div>

                <div class="footer-mid-content">
                    <div class="footer-brand-section">
                        <h2 class="footer-headline">Modern Digital Experiences Engineered For Visual Impact.</h2>
                        <p class="footer-subtitle">Let’s collaborate and create wonderful stuff together. We are here to help you find answers to all your doubts and solve challenges that might bother you. We believe that challenges lead to the realization of something new.</p>
                        <div class="footer-social-links">
                            <a href="#" aria-label="Instagram">
                                <svg class="social-svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="LinkedIn">
                                <svg class="social-svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </a>
                            <a href="#" aria-label="YouTube">
                                <svg class="social-svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div class="footer-links-columns">
                        <div class="footer-col">
                            <h3 class="footer-col-title">Explore</h3>
                            <a href="index.html" class="footer-link">About</a>
                            <a href="projects.html" class="footer-link">Projects</a>
                            <a href="resume.html" class="footer-link">Experience</a>
                            <a href="#" class="footer-link">Services</a>
                        </div>
                        <div class="footer-col">
                            <h3 class="footer-col-title">More</h3>
                            <a href="#" class="footer-link">Blog</a>
                            <a href="resume.html" class="footer-link">Resume</a>
                            <a href="#" class="footer-link">Contact</a>
                            <a href="#" class="footer-link">Inquiries</a>
                        </div>
                    </div>
                </div>

                <div class="footer-wordmark-container">
                    <div class="footer-wordmark">
                        <span class="wm-pretty">dinda</span>
                        <span class="wm-little">hwan</span>
                        <span class="wm-marketer">.studio</span>
                    </div>
                </div>

                <div class="footer-bottom-bar">
                    <span class="footer-copy">© DINDA HWAN 2026 | ALL RIGHTS RESERVED</span>
                    <div class="footer-bottom-sublinks">
                        <a href="#">PRIVACY POLICY</a>
                        <a href="#">TERMS & CONDITIONS</a>
                        <a href="#">BRANDING BY DINDA</a>
                    </div>
                </div>
            </footer>
        `;

        // Parallax Reveal Effect
        setTimeout(() => {
            const footer = this.querySelector('.modern-footer');
            if (footer) {
                // Set wrapper properties
                this.style.display = 'block';
                this.style.overflow = 'hidden';
                
                const updateReveal = () => {
                    const rect = this.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const footerHeight = footer.offsetHeight;
                    
                    // Disable reveal if footer is taller than viewport
                    if (footerHeight >= viewportHeight) {
                        footer.style.transform = 'translateY(0)';
                        return;
                    }
                    
                    if (rect.top < viewportHeight) {
                        let translateY = viewportHeight - footerHeight - rect.top;
                        if (translateY > 0) translateY = 0;
                        footer.style.transform = `translateY(${translateY}px)`;
                    }
                };

                // Use requestAnimationFrame for smoother performance during scroll
                let ticking = false;
                window.addEventListener('scroll', () => {
                    if (!ticking) {
                        window.requestAnimationFrame(() => {
                            updateReveal();
                            ticking = false;
                        });
                        ticking = true;
                    }
                }, { passive: true });
                
                window.addEventListener('resize', updateReveal);
                updateReveal();
            }
        }, 100);
    }
}

customElements.define('global-navbar', GlobalNavbar);
customElements.define('global-footer', GlobalFooter);

class FloatingContact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="floating-contact-btn">
                <div class="floating-text-group">
                    <h4 class="floating-title">Speak to me</h4>
                    <p class="floating-subtitle">Email or book a call</p>
                </div>
                <div class="floating-icons">
                    <a href="#side-contact" class="floating-icon-btn floating-email" id="open-contact-panel" aria-label="Email me">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span class="btn-text">Contact</span>
                    </a>
                    <a href="https://cal.com/dinda-hwan-48qyl2" target="_blank" class="floating-icon-btn floating-calendar" aria-label="Book a call">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span class="btn-text">Book a call</span>
                    </a>
                </div>
            </div>
        `;

        const btn = this.querySelector('.floating-contact-btn');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, { passive: true });

        const openBtn = this.querySelector('#open-contact-panel');
        if (openBtn) {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const panel = document.getElementById('side-contact-panel');
                const overlay = document.getElementById('side-contact-overlay');
                if (panel && overlay) {
                    panel.classList.add('show');
                    overlay.classList.add('show');
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                }
            });
        }
    }
}
customElements.define('floating-contact', FloatingContact);

document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('floating-contact')) {
        const fc = document.createElement('floating-contact');
        document.body.appendChild(fc);
    }

    if (!document.getElementById('side-contact-panel')) {
        const contactHtml = `
            <div class="side-panel-overlay" id="side-contact-overlay"></div>
            <div class="side-contact-panel" id="side-contact-panel">
                <button class="side-panel-close" id="side-contact-close" aria-label="Close panel">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div class="side-panel-content">
                    <h2>Request a quote</h2>
                    <p class="side-panel-sub">Fill out the form below or <strong>book a call.</strong></p>
                    
                    <div class="side-panel-author">
                        <img src="https://i.pravatar.cc/100?img=11" alt="Dinda Hwan">
                        <div class="side-author-info">
                            <strong>Dinda Hwan</strong>
                            <span>dindahwan@gmail.com</span>
                        </div>
                    </div>

                    <form class="side-panel-form" id="wa-contact-form">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="wa-name" placeholder="Name" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="wa-email" placeholder="Email" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Send a message or describe your project</label>
                            <textarea id="wa-message" rows="5" placeholder="" required></textarea>
                        </div>

                        <button type="submit" id="wa-submit" class="side-panel-submit">Send Message</button>
                        <p class="side-panel-footer">By submitting this form, you agree to the <strong>Privacy Policy.</strong></p>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', contactHtml);
        
        const contactPanel = document.getElementById('side-contact-panel');
        const contactOverlay = document.getElementById('side-contact-overlay');
        const contactClose = document.getElementById('side-contact-close');

        const closeContactPanel = () => {
            if (contactPanel && contactOverlay) {
                contactPanel.classList.remove('show');
                contactOverlay.classList.remove('show');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        };

        if (contactClose) contactClose.addEventListener('click', closeContactPanel);
        if (contactOverlay) contactOverlay.addEventListener('click', closeContactPanel);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeContactPanel();
        });

        const waForm = document.getElementById('wa-contact-form');
        const waSubmit = document.getElementById('wa-submit');
        
        if (waForm) {
            waForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('wa-name').value;
                const email = document.getElementById('wa-email').value;
                const message = document.getElementById('wa-message').value;
                
                const originalText = waSubmit.innerText;
                waSubmit.innerText = 'Loading...';
                waSubmit.disabled = true;
                
                fetch("https://formsubmit.co/ajax/dindahwan@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: "New Contact Message from " + name,
                        _captcha: "false"
                    })
                })
                .then(response => response.json())
                .then(data => {
                    waSubmit.innerText = 'Success!';
                    waSubmit.style.backgroundColor = '#10b981';
                    waSubmit.style.color = '#fff';
                    
                    const waNumber = '6287776660258';
                    const text = `Halo Dinda, saya baru saja mengirim email melalui website.\n\nNama: ${name}\nEmail: ${email}\nPesan:\n${message}`;
                    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
                    
                    setTimeout(() => {
                        window.open(waUrl, '_blank');
                        
                        waForm.reset();
                        waSubmit.innerText = originalText;
                        waSubmit.disabled = false;
                        waSubmit.style.backgroundColor = '';
                        waSubmit.style.color = '';
                        closeContactPanel();
                    }, 1000);
                })
                .catch(error => {
                    console.error(error);
                    waSubmit.innerText = 'Error!';
                    setTimeout(() => {
                        waSubmit.innerText = originalText;
                        waSubmit.disabled = false;
                    }, 2000);
                });
            });
        }
    }
});
