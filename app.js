/* ==========================================================================
   Capital Circle Law Offices - Application JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Header Sticky & Active Link Highlighting
       -------------------------------------------------------------------------- */
    const siteHeader = document.getElementById('siteHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }

        // Active link scroll spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* --------------------------------------------------------------------------
       2. Mobile Navigation Drawer
       -------------------------------------------------------------------------- */
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* --------------------------------------------------------------------------
       3. Animated Number Counters
       -------------------------------------------------------------------------- */
    const counterElements = document.querySelectorAll('.counter-number');
    let countersAnimated = false;

    function animateCounters() {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // ms
            const stepTime = 20; // ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(current) + suffix;
                }
            }, stepTime);
        });
    }

    const counterSection = document.getElementById('counters');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(counterSection);
    }

    /* --------------------------------------------------------------------------
       4. Practice & Team Data Dictionary for Popups
       -------------------------------------------------------------------------- */
    const practiceData = {
        'financial-frauds': {
            title: 'Financial Frauds',
            content: `
                <p>We have a dedicated team of legal experts who specialize in handling cases of financial fraud. Our attorneys are well-versed in identifying fraudulent activities and provide clients with the guidance necessary to navigate complex legal landscapes.</p>
                <br>
                <p><strong>Our Key Specializations Include:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>SFIO (Serious Fraud Investigation Office) inquiries</li>
                    <li>ED (Enforcement Directorate) PMLA proceedings</li>
                    <li>Bank fraud & non-performing asset (NPA) litigation</li>
                    <li>Internal forensic audits & corporate defense strategies</li>
                </ul>
            `
        },
        'white-collar': {
            title: 'White Collar Crimes',
            content: `
                <p>Capital Circle Law Offices is adept at managing cases related to white collar crimes. Our experienced lawyers are equipped to handle intricate legal issues, ensuring that our clients receive the best possible defense and resolution strategies.</p>
                <br>
                <p><strong>Defense & Strategic Counsel:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>Bribery and anti-corruption compliance under PC Act</li>
                    <li>Embezzlement, forgery & insider trading defense</li>
                    <li>Supreme Court & High Courts bail and quashing petitions</li>
                    <li>Regulatory investigations by CBI, ED, and IT Department</li>
                </ul>
            `
        },
        'insolvency': {
            title: 'Insolvency Matters',
            content: `
                <p>Navigating insolvency can be challenging for any organization. Our firm provides expert legal advice and representation in insolvency matters, assisting clients in restructuring their businesses and finding the most viable solutions during financial distress.</p>
                <br>
                <p><strong>IBC & Restructuring Services:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>Section 7, 9 & 10 applications before NCLT</li>
                    <li>Corporate Debt Restructuring & Resolution Plans</li>
                    <li>Representation for Creditors and Corporate Debtors</li>
                </ul>
            `
        },
        'governance': {
            title: 'Corporate Governance',
            content: `
                <p>We understand the importance of sound corporate governance in ensuring the success and sustainability of any enterprise. Our firm offers comprehensive legal services aimed at enhancing corporate governance frameworks, ensuring compliance with regulatory standards, and fostering ethical business practices.</p>
                <br>
                <p><strong>Governance Frameworks:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>Board advisory & statutory MCA compliance</li>
                    <li>SEBI regulatory compliance & ROC audit defense</li>
                    <li>ESG and shareholder agreements</li>
                </ul>
            `
        },
        'startup': {
            title: 'Startup Advisory',
            content: `
                <p>Capital Circle Law Offices offers specialized startup advisory services. We guide emerging ventures through incorporation, compliance, funding rounds, term sheet negotiations, and strategic growth.</p>
                <br>
                <p><strong>Venture Legal Advisory:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>Entity structuring & founder vesting agreements</li>
                    <li>Term sheet, SHA, and SSA negotiations</li>
                    <li>IP protection, ESOP schemes, and employment contracts</li>
                </ul>
            `
        }
    };

    const teamData = {
        'yeshwanth': {
            title: 'Adv. Yeshwanth Thandra',
            subtitle: 'Founder & Managing Partner',
            content: `
                <p>Yeshwanth Thandra is an engineer turned Supreme Court practitioner specializing in Insolvency laws, Banking litigation, Financial Fraud defense, and Startup legal strategy.</p>
                <br>
                <p>His dual background in technology and law empowers him to decode complex financial algorithms, corporate structures, and white-collar fraud matters with extraordinary precision.</p>
            `
        },
        'bhavna-gopalan': {
            title: 'Adv. Bhavna Gopalan',
            subtitle: 'Advocate-on-Record, Supreme Court of India',
            content: `
                <p>Advocate-on-Record with over 10 years of experience in Supreme Court litigation, commercial arbitration, intellectual property, insolvency, banking, and constitutional law. Regularly represents clients before the Supreme Court, High Courts, and various tribunals across India.</p>
            `
        },
        'pdv-srikar': {
            title: 'PDV Srikar',
            subtitle: 'Advocate',
            content: `
                <p>Experienced Advocate practicing in civil, commercial, intellectual property, taxation, insolvency, and dispute resolution matters. Represents clients before District Courts, High Courts, Tribunals, NCLT, and the Supreme Court with practical and client-focused legal solutions.</p>
            `
        }
    };

    /* --------------------------------------------------------------------------
       5. Modal Open / Close Handlers
       -------------------------------------------------------------------------- */
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    const openModalBtns = document.querySelectorAll('.open-modal');
    const closeModalBtns = document.querySelectorAll('.modal-close, .close-modal-btn');

    function openModal(modalId, triggerElement = null) {
        const targetModal = document.getElementById(modalId);
        if (!targetModal) return;

        // Handle Dynamic Content if Practice or Team Modal
        if (modalId === 'practiceModal' && triggerElement) {
            const practiceKey = triggerElement.getAttribute('data-practice');
            const data = practiceData[practiceKey];
            if (data) {
                document.getElementById('practiceModalTitle').innerText = data.title;
                document.getElementById('practiceModalBody').innerHTML = data.content;
            }
        } else if (modalId === 'teamModal' && triggerElement) {
            const teamKey = triggerElement.getAttribute('data-team');
            const data = teamData[teamKey];
            if (data) {
                document.getElementById('teamModalTitle').innerText = data.title;
                document.getElementById('teamModalBody').innerHTML = `
                    <h4 style="color: var(--color-gold-dark); margin-bottom: 12px;">${data.subtitle}</h4>
                    ${data.content}
                `;
            }
        }

        // Close any currently active modal first
        modalBackdrops.forEach(m => m.classList.remove('active'));

        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalElement) {
        modalElement.classList.remove('active');
        document.body.style.overflow = '';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId, btn);
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-backdrop');
            if (modal) closeModal(modal);
        });
    });

    modalBackdrops.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalBackdrops.forEach(modal => closeModal(modal));
            closeDrawer();
        }
    });

    /* --------------------------------------------------------------------------
       6. FAQ Accordion
       -------------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* --------------------------------------------------------------------------
       7. Form Submissions & Success Popup
       -------------------------------------------------------------------------- */
    const mainContactForm = document.getElementById('mainContactForm');
    const consultationForm = document.getElementById('consultationForm');

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Hide consultation modal if active
        const activeModal = document.querySelector('.modal-backdrop.active');
        if (activeModal) closeModal(activeModal);

        // Reset form
        e.target.reset();

        // Open Success Toast Modal
        openModal('successModal');
    }

    if (mainContactForm) mainContactForm.addEventListener('submit', handleFormSubmit);
    if (consultationForm) consultationForm.addEventListener('submit', handleFormSubmit);

    /* --------------------------------------------------------------------------
       8. Scroll Reveal Observer for Animations
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-on-scroll, section:not(.page-hero-banner):not(.blog-article-section), .practice-card, .founder-card, .why-card');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '50px 0px 50px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    }

});
