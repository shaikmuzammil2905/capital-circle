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
            title: 'Financial Frauds Investigation & Defense',
            content: `
                <p><strong>Capital Circle Law Offices</strong> provides legal representation for financial institutions, corporations, and individuals entangled in complex financial fraud allegations.</p>
                <br>
                <p><strong>Our Services Include:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>SFIO (Serious Fraud Investigation Office) inquiries</li>
                    <li>ED (Enforcement Directorate) PMLA proceedings</li>
                    <li>Bank fraud & non-performing asset (NPA) litigation</li>
                    <li>Internal forensic audits & corporate defense strategies</li>
                </ul>
            `
        },
        'white-collar': {
            title: 'White Collar Crimes Litigation',
            content: `
                <p>Strategic criminal defense and corporate compliance advisory for directors, executives, and financial institutions.</p>
                <br>
                <p><strong>Key Expertise:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>Bribery and anti-corruption compliance under PC Act</li>
                    <li>Embezzlement, forgery & insider trading defense</li>
                    <li>Supreme Court & High Courts bail and quashing petitions</li>
                    <li>Regulatory investigations by CBI, ED, and IT Department</li>
                </ul>
            `
        },
        'insolvency': {
            title: 'Insolvency & Bankruptcy (IBC) Matters',
            content: `
                <p>In-depth representation before NCLT and NCLAT for Corporate Debtors, Financial Creditors, Operational Creditors, and Insolvency Professionals.</p>
                <br>
                <p><strong>Core Offerings:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>Section 7, 9 & 10 applications filing & defense</li>
                    <li>Resolution plan formulation & compliance audit</li>
                    <li>Debt restructuring & liquidation proceedings</li>
                </ul>
            `
        },
        'governance': {
            title: 'Corporate Governance & Regulatory Compliance',
            content: `
                <p>Ensuring robust legal governance frameworks, MCA compliance, and board-level risk management for corporate entities.</p>
                <br>
                <p><strong>Services Cover:</strong></p>
                <ul style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
                    <li>Board advisory & shareholder agreement drafting</li>
                    <li>SEBI regulatory compliance & ROC audit defenses</li>
                    <li>ESG and statutory policy implementation</li>
                </ul>
            `
        },
        'startup': {
            title: 'Startup Advisory & Venture Growth',
            content: `
                <p>End-to-end legal support tailored for high-growth startups from incorporation to Series funding and exit strategies.</p>
                <br>
                <p><strong>Key Advisory Areas:</strong></p>
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
        'financial-lead': {
            title: 'Senior CA & Insolvency Partner',
            subtitle: 'Head of Insolvency & Forensic Accounting',
            content: `
                <p>Fellow Chartered Accountant (FCA) with over 15 years of experience in corporate debt restructuring, financial forensic audits, and NCLT insolvency proceedings.</p>
            `
        },
        'governance-lead': {
            title: 'Lead Company Secretary (CS)',
            subtitle: 'Head of Corporate Compliance',
            content: `
                <p>Certified Company Secretary specializing in MCA filings, SEBI listing regulations, startup board governance, and joint venture documentation.</p>
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
    const revealElements = document.querySelectorAll('.reveal-on-scroll, section, .practice-card, .founder-card, .why-card');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-on-scroll');
            revealObserver.observe(el);
        });
    }

});
