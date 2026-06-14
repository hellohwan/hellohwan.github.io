import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Inject CSS before </head>
css = """
    <style>
        /* Quantum Case Study Overlay */
        .quantum-modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: var(--primary-bg, #143264);
            z-index: 2000;
            overflow-y: auto;
            overflow-x: hidden;
            display: block;
            opacity: 0;
            visibility: hidden;
            transform: translateY(100%);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, visibility 0.4s ease;
        }

        .quantum-modal-overlay.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .quantum-modal-close {
            position: fixed;
            top: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2010;
            transition: all 0.3s;
            line-height: 1;
        }
        .quantum-modal-close:hover {
            background: rgba(0, 0, 0, 0.6);
            transform: scale(1.1) rotate(90deg);
        }

        .quantum-modal-content {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            color: #ffffff;
        }

        .quantum-hero-banner {
            width: 100vw;
            height: 70vh;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
        }

        .quantum-article {
            max-width: 1200px;
            margin: 0 auto;
            padding: 5rem 5% 8rem 5%;
            width: 100%;
            font-family: 'Inter', sans-serif;
        }

        .quantum-header {
            margin-bottom: 5rem;
            text-align: center;
        }

        .quantum-title {
            font-size: clamp(3rem, 6vw, 5.5rem);
            font-weight: 900;
            letter-spacing: -0.04em;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: #fff;
        }

        .quantum-subtitle {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 500;
        }

        .quantum-split-layout {
            display: grid;
            grid-template-columns: 1fr 2.5fr;
            gap: 4rem;
            align-items: start;
        }

        .quantum-sidebar {
            position: sticky;
            top: 4rem;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
        }

        .quantum-meta-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .quantum-meta-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
            opacity: 0.6;
            margin: 0;
            color: #fff;
        }

        .quantum-meta-value {
            font-size: 1.1rem;
            font-weight: 500;
            margin: 0;
            color: #fff;
        }

        .quantum-hire-btn {
            background: #fff;
            color: #000;
            border: none;
            border-radius: 40px;
            padding: 1rem 2rem;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            width: 100%;
            transition: transform 0.3s;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .quantum-hire-btn:hover {
            transform: translateY(-3px);
        }

        .quantum-main-content {
            display: flex;
            flex-direction: column;
            gap: 4rem;
        }

        .quantum-text-section {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .quantum-section-title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin: 0;
            color: #fff;
        }

        .quantum-paragraph {
            font-size: 1.25rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
        }

        .quantum-gallery-row {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-top: 2rem;
        }

        .quantum-gallery-img {
            width: 100%;
            border-radius: 20px;
            object-fit: cover;
        }

        @media (max-width: 900px) {
            .quantum-split-layout { grid-template-columns: 1fr; }
            .quantum-sidebar { position: relative; top: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
            .quantum-sidebar-actions { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
            .quantum-sidebar { grid-template-columns: 1fr; }
        }
    </style>
"""

# HTML for modal
modal_html = """
    <!-- Quantum-style Case Study Overlay -->
    <div class="quantum-modal-overlay" id="quantum-modal">
        <button class="quantum-modal-close" id="quantum-modal-close" aria-label="Close case study">&times;</button>
        <div class="quantum-modal-content">
            <div class="quantum-hero-banner" id="q-main-img"></div>
            <article class="quantum-article">
                <header class="quantum-header">
                    <h1 class="quantum-title" id="q-title">Project Title</h1>
                    <p class="quantum-subtitle" id="q-subtitle">Project Subtitle</p>
                </header>
                <div class="quantum-split-layout">
                    <aside class="quantum-sidebar">
                        <div class="quantum-meta-group">
                            <h4 class="quantum-meta-label">Role</h4>
                            <p class="quantum-meta-value" id="q-meta-role">Lead Designer</p>
                        </div>
                        <div class="quantum-meta-group">
                            <h4 class="quantum-meta-label">Timeline</h4>
                            <p class="quantum-meta-value" id="q-meta-timeline">2023</p>
                        </div>
                        <div class="quantum-sidebar-actions">
                            <button class="quantum-hire-btn" id="q-contact-btn">
                                <span>Hire Now</span> &rarr;
                            </button>
                        </div>
                    </aside>
                    <div class="quantum-main-content">
                        <section class="quantum-text-section">
                            <h2 class="quantum-section-title">The Challenge</h2>
                            <p class="quantum-paragraph" id="q-desc">Details...</p>
                        </section>
                        <div class="quantum-gallery-row" id="q-gallery"></div>
                    </div>
                </div>
            </article>
        </div>
    </div>
"""

# JS for modal
js_script = """
<script>
document.addEventListener('DOMContentLoaded', () => {
    const qModal = document.getElementById('quantum-modal');
    if(!qModal) return;
    const qClose = document.getElementById('quantum-modal-close');
    const qTitle = document.getElementById('q-title');
    const qSubtitle = document.getElementById('q-subtitle');
    const qRole = document.getElementById('q-meta-role');
    const qTimeline = document.getElementById('q-meta-timeline');
    const qDesc = document.getElementById('q-desc');
    const qImg = document.getElementById('q-main-img');
    const qGallery = document.getElementById('q-gallery');
    const qContactBtn = document.getElementById('q-contact-btn');

    document.querySelectorAll('.sch-acc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            qTitle.textContent = btn.getAttribute('data-title') || 'Project Title';
            qSubtitle.textContent = btn.getAttribute('data-subtitle') || 'A digital experience';
            qRole.textContent = btn.getAttribute('data-role') || 'UI/UX Designer';
            qTimeline.textContent = btn.getAttribute('data-timeline') || 'Present';
            qDesc.innerHTML = btn.getAttribute('data-desc') || 'Project details...';
            qImg.style.backgroundImage = `url('${btn.getAttribute('data-image') || 'assets/tennis_hero_bg.png'}')`;
            
            qGallery.innerHTML = '';
            const thumbs = btn.getAttribute('data-thumbs');
            if(thumbs) {
                thumbs.split(',').forEach(src => {
                    if(src.trim()) {
                        const img = document.createElement('img');
                        img.className = 'quantum-gallery-img';
                        img.src = src.trim();
                        qGallery.appendChild(img);
                    }
                });
            }
            
            qModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeQModal = () => {
        qModal.classList.remove('show');
        document.body.style.overflow = '';
    };

    if(qClose) qClose.addEventListener('click', closeQModal);
    if(qContactBtn) qContactBtn.addEventListener('click', () => {
        closeQModal();
        window.location.href = '#contact';
    });
    
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && qModal.classList.contains('show')) {
            closeQModal();
        }
    });
});
</script>
"""

# Apply modifications
if "</head>" in html and css not in html:
    html = html.replace("</head>", css + "\n</head>")

if "</main>" in html and "id=\"quantum-modal\"" not in html:
    html = html.replace("</main>", modal_html + "\n</main>")

if "</body>" in html and "id='quantum-modal'" not in html:
    html = html.replace("</body>", js_script + "\n</body>")

# Add data attributes to sch-acc-btn
replacements = [
    (
        '''<a href="#" class="sch-acc-btn">View Details</a>''',
        '''<a href="#" class="sch-acc-btn" data-title="UI/UX Design" data-subtitle="Crafting intuitive and aesthetically pleasing digital interfaces" data-role="Lead UI/UX Designer" data-timeline="Ongoing" data-desc="Crafting intuitive and aesthetically pleasing digital interfaces. I focus on user-centric design principles to ensure every interaction feels natural, engaging, and perfectly aligned with your brand identity." data-image="assets/tennis_hero_bg.png" data-thumbs="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80,https://images.unsplash.com/photo-1542744094-24638ea0b5b3?w=800&q=80">View Details</a>'''
    ),
    (
        '''<a href="#" class="sch-acc-btn">View Details</a>''',
        '''<a href="#" class="sch-acc-btn" data-title="Web Development" data-subtitle="Building lightning-fast, responsive, and robust websites" data-role="Frontend Developer" data-timeline="2023 - Present" data-desc="Building lightning-fast, responsive, and robust websites from the ground up. Utilizing the latest web technologies to deliver scalable solutions that perform flawlessly across all devices and browsers." data-image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80" data-thumbs="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80">View Details</a>'''
    ),
    (
        '''<a href="#" class="sch-acc-btn">View Details</a>''',
        '''<a href="#" class="sch-acc-btn" data-title="Instagram Content" data-subtitle="Designing thumb-stopping social media graphics" data-role="Content Strategist" data-timeline="2021 - 2023" data-desc="Designing thumb-stopping social media graphics and visual strategies. From cohesive feed aesthetics to engaging stories and reels covers that capture attention and drive audience interaction." data-image="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80" data-thumbs="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80">View Details</a>'''
    ),
    (
        '''<a href="#" class="sch-acc-btn">View Details</a>''',
        '''<a href="#" class="sch-acc-btn" data-title="Wordpress Development" data-subtitle="Creating highly customizable, SEO-optimized sites" data-role="WordPress Developer" data-timeline="2020 - 2022" data-desc="Creating highly customizable, SEO-optimized, and easily manageable WordPress sites. Tailored to your specific business needs with secure plugins, custom themes, and a focus on lead generation." data-image="https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=1200&q=80" data-thumbs="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80">View Details</a>'''
    )
]

for old, new in replacements:
    html = html.replace(old, new, 1)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("done")
