class GlobalNavbar extends HTMLElement {
    connectedCallback() {
        const page = this.getAttribute('page') || 'home';
        const isResume = page === 'resume';
        const isDetail = page === 'detail';
        const childrenHTML = this.innerHTML; // Preserves inner HTML like sub-nav-bar for detail page

        let themeToggleHTML = '';
        if (isResume) {
            themeToggleHTML = `
                <button class="theme-toggle" id="theme-toggle-resume" aria-label="Toggle Dark/Light Mode" style="border-radius: 50px; width: auto; padding: 0 16px; gap: 8px;">
                    <span class="icon-sun">☀️ Light</span>
                    <span class="icon-moon">🌙 Dark</span>
                </button>
            `;
        } else {
            themeToggleHTML = `
                <button class="theme-toggle" id="${isDetail ? 'theme-toggle-nav' : 'theme-toggle'}" aria-label="Toggle Dark/Light Mode">
                    <span class="icon-sun">☀️</span>
                    <span class="icon-moon">🌙</span>
                </button>
            `;
        }

        const projectHref = (isResume || isDetail) ? 'index.html#work' : '#work';
        const karyaHref = (isResume || isDetail) ? 'index.html#work' : '#work';
        const tulisanHref = (isResume || isDetail) ? 'index.html#' : '#';
        const contactHref = (isResume || isDetail) ? 'index.html#contact' : '#contact';
        const contactClass = isResume ? 'btn-black' : 'btn-primary btn-nav';

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
                        <a href="index.html" class="logo-w">
                            <lottie-player class="thinking-logo" src="assets/cat-loader.json" background="transparent" speed="1" loop autoplay></lottie-player>
                        </a>
                        <ul class="nav-links-main">
                            <li><a href="${projectHref}" data-i18n="nav_project">Project</a></li>
                            <li><a href="${karyaHref}" data-i18n="nav_karya">Karya</a></li>
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
            <footer class="footer-wrapper">
                <div class="footer-dark">
                    <!-- Top Right Cutout (White) -->
                    <div class="cutout-tr">
                        <!-- Social Icons placed here -->
                        <div class="social-icons">
                            <a href="#">▶</a>
                            <a href="#">f</a>
                            <a href="#">X</a>
                            <a href="#">ig</a>
                        </div>
                    </div>

                    <!-- Bottom Left Cutout (White) -->
                    <div class="cutout-bl">
                        <!-- Copyright placed here -->
                        <div class="copyright-text">
                            <p data-i18n="footer_copyright">Copyright &copy; 2026 Your Name. All Rights Reserved.</p>
                        </div>
                    </div>

                    <div class="footer-content-grid">
                        <!-- Left Side -->
                        <div class="footer-left">
                            <p class="pre-heading" data-i18n="footer_pre">Interactive designs — accessible anytime, anywhere.</p>
                            <h1 class="huge-heading" data-i18n="footer_huge">Designing Since 2016</h1>

                            <div class="footer-logo">
                                <lottie-player class="thinking-logo" src="assets/cat-loader.json" background="transparent" speed="1" style="width: 44px; height: 44px;" loop autoplay></lottie-player>
                                <p data-i18n="footer_logo_desc">Master in-demand tech, business, and creative skills</p>
                            </div>
                        </div>

                        <!-- Right Side Links -->
                        <div class="footer-right">
                            <div class="link-column">
                                <h4 data-i18n="footer_col1">Quick Links</h4>
                                <a href="#" data-i18n="footer_col1_1">Our portfolio</a>
                                <a href="#" data-i18n="footer_col1_2">Our story</a>
                                <a href="#" data-i18n="footer_col1_3">Our process</a>
                                <a href="#" data-i18n="footer_col1_4">Testimonials</a>
                                <a href="#" data-i18n="footer_col1_5">Contact us</a>
                            </div>
                            <div class="link-column">
                                <h4 data-i18n="footer_col2">More</h4>
                                <a href="#" data-i18n="footer_col2_1">Blogs</a>
                                <a href="#" data-i18n="footer_col2_2">Jobs</a>
                            </div>
                            <div class="link-column">
                                <h4 data-i18n="footer_col3">Legal & Policy Links</h4>
                                <a href="#" data-i18n="footer_col3_1">Our rules</a>
                                <a href="#" data-i18n="footer_col3_2">Our statement</a>
                                <a href="#" data-i18n="footer_col3_3">Feedback</a>
                            </div>
                        </div>
                    </div>

                    <div class="footer-bottom-links">
                        <a href="#" data-i18n="footer_bot_1">Privacy policy</a>
                        <a href="#" data-i18n="footer_bot_2">Terms and conditions</a>
                        <a href="#" data-i18n="footer_bot_3">Copyright</a>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('global-navbar', GlobalNavbar);
customElements.define('global-footer', GlobalFooter);
