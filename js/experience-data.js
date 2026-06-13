const experienceData = {
    "2025": [
        { id: "axa", company: "AXA Mandiri", role: "Senior UI/UX", date: "Jan 2023 - July 2025", desc: "Lead, create and ensure the display flow is correct, present the display for Axa Insurance, in mobile, tablet, or for cellphones (Android and iOS).", tools: ["Figma", "Prototyping", "UI/UX"], category: "mobile" },
        { id: "smartchain", company: "Smartchain.ltd", role: "Product Designer", date: "Jan - March 2025", desc: "Create, present an attractive display for internal blockchain applications, is a product that is sold to ensure that there is no data theft or data changes that occur within the company.", tools: ["Figma", "Web3", "UI/UX"], category: "design" }
    ],
    "2024": [
        { id: "jamtangan", company: "Jamtangan.com", role: "Website Dev", date: "Aug - Dec 2024", desc: "Create a display for a mobile (UI/ UX) application and also create a sales application using WordPress-based.", tools: ["WordPress", "UI/UX", "PHP"], category: "web" }
    ],
    "2023": [
        { id: "vivien", company: "vivienroggero.ltd", role: "Website dev | UI/UX", date: "Feb - June 2023", desc: "Develop company website, and make landing page.", tools: ["HTML/CSS", "Webflow", "UI/UX"], category: "web" }
    ],
    "2022": [
        { id: "esri", company: "Esri Indonesia", role: "Senior UI/UX", date: "March 2020 - July 2022", desc: "Create UI UX views related to applications and schematics for maps, and also applications related to custom for both mobile and website. By using Arcgis online or Arcgis Experience, creating immersived and beautiful UI both portal, dashboard and also map.", tools: ["ArcGIS", "Figma", "User Research"], category: "design" },
        { id: "cahaya", company: "Cahaya Jakarta", role: "Website dev | UI/UX", date: "March - Sep 2022", desc: "Create UI / UX views and also develop company websites using wordpress based.", tools: ["WordPress", "Figma"], category: "web" },
        { id: "42int", company: "42 Interactive.ltd", role: "Website dev | UI/UX", date: "March 2020 - July 2022", desc: "Create UI / UX views and also develop company websites using wordpress based.", tools: ["WordPress", "Web Design"], category: "web" }
    ],
    "2020": [
        { id: "unison", company: "Unison Indonesia", role: "Product Designer", date: "March 2019 - Feb 2020", desc: "I was the only product designer at Unison. I designed the company page, CMS, mobile application. I designed all of the branding, user experience, and visual designs. I also conducted market research and user feedback sessions.", tools: ["Figma", "User Research", "Branding"], category: "mobile" },
        { id: "bukukas", company: "BukuKas", role: "Software Engineer", date: "Jan - Feb 2020", desc: "Worked as team support, solving problem with bugs & error fixing on internal website company, using Ruby on rails. And also running some testing, make sure there's fine with the website.", tools: ["Ruby on Rails", "Testing"], category: "web" }
    ]
};

// Placeholder images for the deliverables
const placeholderImages = [
    'assets/immersive_mockup.png',
    'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop'
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Parse URL parameters to identify the active project
    const params = new URLSearchParams(window.location.search);
    let targetId = params.get('id');

    // Default to 'axa' if none specified
    if (!targetId) targetId = 'axa';

    let currentItem = null;
    let currentYear = null;

    // Classify category helper function
    const matchesCategory = (item, cat) => {
        if (!cat || cat === 'all') return true;
        
        // Manual categorizations or fallback tool match
        if (item.category === cat) return true;
        
        const toolsLower = item.tools.map(t => t.toLowerCase());
        if (cat === 'web') {
            return toolsLower.some(t => ['wordpress', 'webflow', 'php', 'html/css', 'ruby on rails', 'testing', 'web design', 'web development', 'web3'].includes(t));
        } else if (cat === 'mobile') {
            return toolsLower.some(t => ['figma', 'ui/ux', 'prototyping', 'arcgis', 'user research'].includes(t)) && !toolsLower.some(t => ['wordpress', 'webflow'].includes(t));
        } else if (cat === 'design') {
            return toolsLower.some(t => ['figma', 'ui/ux', 'prototyping', 'user research', 'branding'].includes(t));
        }
        return false;
    };

    // Find active project item
    Object.keys(experienceData).forEach(year => {
        experienceData[year].forEach(exp => {
            if (exp.id === targetId) {
                currentItem = exp;
                currentYear = year;
            }
        });
    });

    // Sidebar rendering
    const renderSidebar = (searchQuery = '', selectedCategory = 'all') => {
        const sidebarContainer = document.getElementById('exp-sidebar');
        if (!sidebarContainer) return;
        
        sidebarContainer.innerHTML = '';
        
        Object.keys(experienceData).sort((a,b) => b - a).forEach(year => {
            // Filter projects in this year
            const filteredItems = experienceData[year].filter(exp => {
                const matchesSearch = exp.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      exp.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
                const matchesCat = matchesCategory(exp, selectedCategory);
                return matchesSearch && matchesCat;
            });

            // Skip rendering this year accordion if no projects match
            if (filteredItems.length === 0) return;

            const group = document.createElement('div');
            group.className = 'folder-group';
            
            // Folder Title row
            const titleDiv = document.createElement('div');
            titleDiv.className = 'folder-title';
            titleDiv.innerHTML = `<span class="folder-icon">📁</span> ${year} <span class="folder-chevron">▶</span>`;
            
            // Folder Content list
            const contentDiv = document.createElement('div');
            contentDiv.className = 'folder-content';

            let hasActiveChild = false;

            filteredItems.forEach(exp => {
                const isActive = exp.id === targetId;
                if (isActive) hasActiveChild = true;

                const itemLink = document.createElement('a');
                itemLink.href = `?id=${exp.id}`;
                itemLink.className = `sidebar-item ${isActive ? 'active' : ''}`;
                itemLink.textContent = exp.company;
                
                // Clicking project sidebar item links directly
                itemLink.addEventListener('click', (e) => {
                    // Let link navigate or hook if dynamic
                });

                contentDiv.appendChild(itemLink);
            });

            // Expand by default if active project is inside, or if a search/category filter is active
            if (hasActiveChild || searchQuery !== '' || selectedCategory !== 'all') {
                group.classList.add('open');
            }

            // Click header toggles accordion open/closed
            titleDiv.addEventListener('click', () => {
                group.classList.toggle('open');
            });

            group.appendChild(titleDiv);
            group.appendChild(contentDiv);
            sidebarContainer.appendChild(group);
        });
    };

    // Live search input listener (both sidebar and navbar search inputs)
    const searchInputSidebar = document.getElementById('project-search');
    const searchInputNav = document.getElementById('project-search-nav');
    const categoryTabs = document.querySelectorAll('.sub-nav-tab');
    let currentSearch = '';
    let currentCategory = 'all';

    const handleSearchInput = (e) => {
        currentSearch = e.target.value;
        // Keep both search inputs in sync visually
        if (searchInputSidebar && searchInputSidebar !== e.target) searchInputSidebar.value = currentSearch;
        if (searchInputNav && searchInputNav !== e.target) searchInputNav.value = currentSearch;
        
        renderSidebar(currentSearch, currentCategory);
    };

    if (searchInputSidebar) searchInputSidebar.addEventListener('input', handleSearchInput);
    if (searchInputNav) searchInputNav.addEventListener('input', handleSearchInput);

    // Keyboard shortcut '/' to focus search
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInputSidebar && document.activeElement !== searchInputNav) {
            e.preventDefault();
            if (searchInputNav) searchInputNav.focus();
            else if (searchInputSidebar) searchInputSidebar.focus();
        }
    });

    // Subheader tabs click listener
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            renderSidebar(currentSearch, currentCategory);
        });
    });

    // Render Year Widget (Right Side Panel)
    const renderYearWidget = () => {
        const yearsList = document.getElementById('widget-years-list');
        if (!yearsList) return;
        
        yearsList.innerHTML = '';
        
        // Years color mappings corresponding to FA style CSS classes
        const yearColors = {
            "2025": "25",
            "2024": "24",
            "2023": "23",
            "2022": "22",
            "2020": "20"
        };

        Object.keys(experienceData).sort((a,b) => b - a).forEach(year => {
            const firstProj = experienceData[year][0];
            if (!firstProj) return;

            const colorClass = yearColors[year] || "20";
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="?id=${firstProj.id}">
                    <span class="version-badge-num badge-${colorClass}">${year.slice(-2)}</span>
                    <span>View the ${year} Projects</span>
                </a>
            `;
            yearsList.appendChild(li);
        });
    };

    // Populate Active Project Details
    const populateActiveProject = () => {
        if (!currentItem) {
            // Fallback UI
            document.getElementById('detail-title').textContent = 'Project Not Found';
            document.getElementById('detail-desc').textContent = 'Please choose another experience from the sidebar.';
            return;
        }

        // Breadcrumb
        document.getElementById('detail-breadcrumb').textContent = `DOCS > PROJECTS > ${currentYear} > ${currentItem.company.toUpperCase()}`;
        
        // Headings & description
        document.getElementById('detail-title').textContent = `${currentItem.company} — ${currentItem.role}`;
        document.getElementById('detail-desc').textContent = currentItem.desc;
        
        // Date / Duration
        document.getElementById('detail-date').textContent = `🕒 ${currentItem.date}`;

        // Populate Tech Tags inside Card 3
        const tagsContainer = document.querySelector('.toolbar-tools');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            currentItem.tools.forEach(tool => {
                const span = document.createElement('span');
                span.className = 'tool-tag';
                span.textContent = tool;
                tagsContainer.appendChild(span);
            });
        }

        // Populate Deliverables Gallery inside Card 1
        const grid = document.getElementById('detail-grid');
        if (grid) {
            grid.innerHTML = '';
            
            // Randomize images but keep AXA using actual mockup if available
            const availableMockups = currentItem.id === 'axa' ? ['assets/immersive_mockup.png'] : [];
            const numImages = 3 + Math.floor(Math.random() * 2); // 3 to 4 images
            
            for (let i = 0; i < numImages; i++) {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                
                const img = document.createElement('img');
                if (i === 0 && availableMockups.length > 0) {
                    img.src = availableMockups[0];
                } else {
                    img.src = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
                }
                img.alt = `${currentItem.company} Deliverable ${i+1}`;
                
                gridItem.appendChild(img);
                grid.appendChild(gridItem);
            }
        }
    };

    // Scroll event on .main-content-layout to collapse/replace top navbar with ticker
    const mainContentLayout = document.querySelector('.main-content-layout');
    const docsHeader = document.querySelector('.docs-header');
    
    if (mainContentLayout && docsHeader) {
        mainContentLayout.addEventListener('scroll', () => {
            if (mainContentLayout.scrollTop > 50) {
                docsHeader.classList.add('scrolled');
            } else {
                docsHeader.classList.remove('scrolled');
            }
        });
    }

    // Initial renders
    renderSidebar();
    renderYearWidget();
    populateActiveProject();
});
