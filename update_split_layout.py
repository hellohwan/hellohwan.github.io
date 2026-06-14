import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add CSS
new_css = """
                    /* New Split Layout CSS */
                    .split-showcase-section {
                        display: flex;
                        width: 100vw;
                        margin-left: calc(-50vw + 50%);
                        min-height: 80vh;
                        background: #000;
                    }
                    
                    body.light-theme .split-showcase-section {
                        background: #f4f4f4;
                    }

                    .split-half {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        position: relative;
                        overflow: hidden;
                    }

                    .split-left {
                        padding: 8% 10%;
                        background: #e6ebe8; /* Clean paper-like color */
                    }
                    
                    body.light-theme .split-left {
                        background: #ffffff;
                    }

                    .split-right {
                        background-size: cover;
                        background-position: center;
                        padding: 40px;
                        justify-content: flex-end;
                        align-items: flex-start;
                    }

                    .split-content {
                        max-width: 600px;
                    }

                    .split-badge {
                        display: inline-block;
                        padding: 6px 16px;
                        border: 1px solid #111;
                        border-radius: 50px;
                        font-size: 0.85rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        margin-bottom: 24px;
                        color: #111;
                    }

                    .split-title {
                        font-size: clamp(2.5rem, 5vw, 4.5rem);
                        font-weight: 900;
                        line-height: 1.1;
                        margin: 0 0 24px 0;
                        color: #111;
                        letter-spacing: -1.5px;
                        text-transform: uppercase;
                    }

                    .split-desc {
                        font-size: 1.1rem;
                        line-height: 1.6;
                        color: #333;
                        max-width: 480px;
                    }

                    .split-join-btn {
                        display: inline-flex;
                        align-items: center;
                        padding: 16px 32px;
                        background: #ffffff;
                        color: #111111;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        text-decoration: none;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                        transition: transform 0.2s, box-shadow 0.2s;
                    }

                    .split-join-btn:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 15px 40px rgba(0,0,0,0.25);
                    }

                    @media (max-width: 900px) {
                        .split-showcase-section {
                            flex-direction: column;
                        }
                        .split-half {
                            min-height: 50vh;
                        }
                        .split-left {
                            padding: 15% 5%;
                        }
                    }
                }
            </style>
"""

# Replace the closing style tag of axa-about-section with the new CSS + closing tag
content = content.replace("            </style>", new_css, 1)

# 2. Replace HTML
old_html_regex = r'<div class="axa-about-container">.*?</div>\s*</div>\s*</div>'
new_html = """            <div class="split-showcase-section">
                <!-- Left Half: Copywriting -->
                <div class="split-half split-left">
                    <div class="split-content reveal">
                        <div class="split-badge" data-i18n="home_about_pill">
                            Tentang Saya
                        </div>
                        <h2 class="split-title">
                            Dipercaya oleh <br> <i data-i18n="home_about_klien">Klien</i> & Kolaborator
                        </h2>
                        <p class="split-desc" data-i18n="home_about_desc">
                            Saya adalah seorang desainer dan pengembang dengan pengalaman bertahun-tahun dalam menciptakan solusi digital. Pendekatan saya menggabungkan strategi cerdas dengan desain yang indah.
                        </p>
                    </div>
                </div>

                <!-- Right Half: Image with Floating Button -->
                <div class="split-half split-right" style="background-image: url('assets/tennis_hero_bg.png');">
                    <a href="mailto:hello@example.com" class="split-join-btn reveal">Join Community &raquo;</a>
                </div>
            </div>"""

content = re.sub(old_html_regex, new_html, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Split layout injected.")
