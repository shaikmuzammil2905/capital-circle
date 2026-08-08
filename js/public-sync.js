/* ==========================================================================
   Capital Circle Law Offices - Public Website Dynamic Content Synchronizer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
    const DB = window.CapitalCircleDB;
    if (!DB) return;

    // 1. DYNAMIC WEBSITE CONTENT SYNC
    async function syncPageContent() {
        // Hero Content
        const hero = await DB.getWebsiteContent('hero');
        if (hero) {
            const subtitleEl = document.querySelector('.hero-subtitle-mixed');
            if (subtitleEl && hero.subtitleText) subtitleEl.innerText = hero.subtitleText;
        }

        // Mission Content
        const mission = await DB.getWebsiteContent('mission');
        if (mission) {
            const missionBlocks = document.querySelectorAll('.hero-mission-block');
            if (missionBlocks.length > 0 && mission.text) {
                const p = missionBlocks[0].querySelector('.hero-mission-text');
                if (p) p.innerText = mission.text;
            }
        }

        // Team Overview Content
        const teamOverview = await DB.getWebsiteContent('team_overview');
        if (teamOverview) {
            const missionBlocks = document.querySelectorAll('.hero-mission-block');
            if (missionBlocks.length > 1 && teamOverview.text) {
                const p = missionBlocks[1].querySelector('.hero-mission-text');
                if (p) p.innerText = teamOverview.text;
            }
        }

        // Why Us Content
        const whyUs = await DB.getWebsiteContent('why_us');
        if (whyUs) {
            const missionBlocks = document.querySelectorAll('.hero-mission-block');
            if (missionBlocks.length > 2 && whyUs.text) {
                const p = missionBlocks[2].querySelector('.hero-mission-text');
                if (p) p.innerText = whyUs.text;
            }
        }

        // Settings Sync (Footer info, contact email/phone)
        const settings = await DB.getSettings();
        if (settings) {
            const footerDesc = document.querySelector('.footer-desc');
            if (footerDesc && settings.footer_text) footerDesc.innerText = settings.footer_text;
        }
    }

    // 2. BLOG PAGE DYNAMIC LOADER
    async function syncBlogPage() {
        const blogArticleSection = document.querySelector('.blog-article-section');
        if (!blogArticleSection) return;

        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        const publishedArticles = await DB.getArticles({ includeDeleted: false, status: 'published' });

        if (slug) {
            // Render specific article
            const article = publishedArticles.find(a => a.slug === slug);
            if (article) {
                document.title = `${article.seo_title || article.title} | Capital Circle Law Offices`;

                const heroTitle = document.querySelector('.page-hero-title');
                const heroSub = document.querySelector('.page-hero-subtitle');
                const heroMeta = document.querySelector('.blog-meta-info');

                if (heroTitle) heroTitle.innerText = article.title;
                if (heroSub) heroSub.innerText = article.seo_description || article.category;
                if (heroMeta) {
                    heroMeta.innerHTML = `
                        <span>Published by ${article.author}</span>
                        <span class="separator">•</span>
                        <span>${article.category}</span>
                        <span class="separator">•</span>
                        <span>${article.publication_date}</span>
                    `;
                }

                const blogArticle = document.querySelector('.blog-article');
                if (blogArticle) {
                    blogArticle.innerHTML = `
                        ${article.featured_image ? `<div style="margin-bottom: 24px; text-align: center;"><img src="${article.featured_image}" alt="${article.title}" style="max-width: 100%; border-radius: 8px; max-height: 450px; object-fit: cover;"></div>` : ''}
                        <div class="blog-body-dynamic">${article.content}</div>
                        <div class="article-footer-cta" style="margin-top: 40px;">
                            <h3>Need Strategic Legal Counsel on Media, Constitutional, or Regulatory Matters?</h3>
                            <p>Capital Circle Law Offices represents corporations, media houses, and individuals before the Supreme Court and High Courts.</p>
                            <button class="btn btn-primary open-modal" data-modal="consultationModal">Schedule a Consultation</button>
                        </div>
                    `;
                }
            }
        } else {
            // Render Article Index / List if multiple published articles exist
            if (publishedArticles.length > 0) {
                const blogArticle = document.querySelector('.blog-article');
                if (blogArticle && publishedArticles.length > 1) {
                    const firstArt = publishedArticles[0];
                    // Keep default main article as featured, and append dynamic articles directory list at bottom!
                    const articleDirectoryHTML = `
                        <div class="blog-section-block" style="margin-top: 48px; border-top: 1px solid var(--color-gold-subtle); padding-top: 32px;">
                            <h2 class="blog-section-heading" style="color: var(--color-gold); font-family: var(--font-heading);">LATEST LEGAL ARTICLES & PUBLICATIONS</h2>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
                                ${publishedArticles.map(a => `
                                    <div style="background: rgba(15,23,42,0.6); border: 1px solid rgba(197,160,89,0.3); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; justify-space-between;">
                                        <div>
                                            <span style="font-size: 11px; color: var(--color-gold); text-transform: uppercase; font-weight: 600;">${a.category}</span>
                                            <h3 style="font-size: 16px; margin: 8px 0; color: #ffffff;">${a.title}</h3>
                                            <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">${a.seo_description || 'Read full legal insight...'}</p>
                                        </div>
                                        <a href="blog.html?slug=${a.slug}" style="display: inline-block; margin-top: 16px; color: var(--color-gold); font-weight: 600; font-size: 13px;">Read Article &rarr;</a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                    blogArticle.insertAdjacentHTML('beforeend', articleDirectoryHTML);
                }
            }
        }
    }

    // 3. FORM SUBMISSIONS TO SUPABASE INQUIRIES TABLE
    function setupFormListeners() {
        const contactForm = document.getElementById('mainContactForm');
        const consultForm = document.getElementById('consultationForm');

        async function processFormSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);

            const name = formData.get('name') || form.querySelector('input[placeholder*="Name"]')?.value || 'Website Visitor';
            const phone = formData.get('phone') || form.querySelector('input[type="tel"]')?.value || '';
            const email = formData.get('email') || form.querySelector('input[type="email"]')?.value || '';
            const subject = formData.get('subject') || form.querySelector('select')?.value || 'Legal Consultation Request';
            const message = formData.get('message') || form.querySelector('textarea')?.value || '';

            await DB.saveInquiry({ name, email, phone, subject, message });

            // Close active modal if any
            const activeModal = document.querySelector('.modal-backdrop.active');
            if (activeModal) activeModal.classList.remove('active');

            form.reset();

            // Open success modal
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        if (contactForm) contactForm.addEventListener('submit', processFormSubmit);
        if (consultForm) consultForm.addEventListener('submit', processFormSubmit);
    }

    // Run Sync
    await syncPageContent();
    await syncBlogPage();
    setupFormListeners();
});
