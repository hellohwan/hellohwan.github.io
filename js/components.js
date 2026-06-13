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
                        </picture> Light
                    </span>
                    <span class="icon-moon" style="display: inline-flex; align-items: center; gap: 4px;">
                        <picture style="width: 20px; height: 20px; display: inline-block;">
                            <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31b/512.webp" type="image/webp">
                            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31b/512.gif" alt="🌛" width="20" height="20">
                        </picture> Dark
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
                            <li><a href="${tulisanHref}" data-i18n="nav_tulisan">Tulisan Saya</a></li>
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
                        <a href="${contactHref}" class="${contactClass}" data-i18n="nav_contact">Hubungi Saya</a>
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
                        <a href="#">SITE BY ANTIGRAVITY</a>
                    </div>
                </div>
                <button class="cookie-pref-btn">Cookie Preferences</button>
            </footer>
        `;
    }
}

customElements.define('global-navbar', GlobalNavbar);
customElements.define('global-footer', GlobalFooter);
