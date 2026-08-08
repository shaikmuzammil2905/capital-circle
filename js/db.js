/* ==========================================================================
   Capital Circle Law Offices - Supabase & Local Database Engine
   ========================================================================== */

(function (window) {
    'use strict';

    const SUPABASE_URL = 'https://daacaghjkvknewwsnuej.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhYWNhZ2hqa3ZrbmV3d3NudWVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxOTIzNDEsImV4cCI6MjEwMTc2ODM0MX0.PxKHbPX9GHhSf5yNM0ZEVk9HFICGT6G9Pij4Pag1HpM';

    const STORAGE_KEY_PREFIX = 'cc_db_';

    // Simple SHA-256 function for browser client authentication matching database
    async function sha256(message) {
        try {
            if (window.crypto && window.crypto.subtle) {
                const msgBuffer = new TextEncoder().encode(message);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            }
        } catch (e) {
            console.warn('Crypto subtle unavailable, using fallback comparison');
        }
        return message;
    }

    // Default Seed Data to guarantee immediate availability
    const DEFAULT_SEED_DATA = {
        articles: [
            {
                id: 'art-1',
                title: 'CENSORSHIP AND FREEDOM OF EXPRESSION',
                slug: 'censorship-and-freedom-of-expression',
                featured_image: 'assets/hero-legal-art.png',
                category: 'Constitutional & Media Law',
                author: 'Capital Circle Law Offices',
                content: `<div class="blog-intro-box"><h3 class="intro-title">INTRODUCTION</h3><p>The tension between censorship and the fundamental right to free expression weaves a complex narrative in the diverse tapestry of India's socio-cultural landscape, reflecting the delicate balance the nation strives to maintain. The conflict between censorship and free expression in India is rooted in constitutional principles and manifested through a wide range of laws, and it underpins a discourse that resonates across various spheres of society.</p><p>As we navigate the maze of sedition laws, media controls, and the ever-expanding realm of the internet, issues about where the lines are drawn and how they are defined arise. The latest Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, complicate the scene even further, adding layers to the continuing debate over free expression in the digital era.</p><p>This article dives into the complexities of the dispute, exploring the historical roots of censorship in India as well as its evolution through legal changes. The legislative framework sets the setting for a nuanced assessment of the delicate tango between restriction and liberty, from the censorship of cinematic expressions under the Cinematograph Act to the regulation of digital media under the Information Technology Act.</p></div><div class="blog-body"><div class="blog-section-block"><h2 class="blog-section-heading">MAIN BLOG</h2><p>Article 19(1)(a) of the Constitution of India guarantees this basic right to free speech and expression. As per the International Covenant on Civil and Political Rights (ICCPR), the right to free speech is recognized under the international human rights law, while Article 19 of the Universal Declaration of Human Rights (UDHR) recognizes freedom of expression as a human right. As free expression is not an unqualified right, hence certain limits are in place upon this right under Article 19(2). However, the only way to limit freedom of speech is through legislation. The right to disseminate material, publish it, and market the same also falls under the ambit of this freedom.</p></div><div class="blog-section-block"><h2 class="blog-section-heading">Freedom of expression under indian constitution</h2><p>Heart of this discussion lies in Article 19(1)(a) of the Indian Constitution, which guarantees the right to free speech and expression—a cornerstone of democracy—is at the center of this debate. According to Article 19(1)(a): All citizens shall have the right to freedom of speech and expression. The very fabric of this right, however, is intricately linked with Article 19(2), which allows for reasonable restrictions in the interests of sovereignty, integrity, public order, and other things. The dispute evolves inside this constitutional framework, impacted by legal complexities, society norms, and new technologies.</p></div><div class="blog-section-block"><h2 class="blog-section-heading">THE CENTRAL BOARD OF FILM CERTIFICATION (CBFC)</h2><p>The Central Board of Film Certification is a governmental agency in India that governs the public display of films. The Ministry of Information and Broadcasting established it in compliance with Section 3(1) of the Indian Cinematographer Act of 1952. Films in India may only be shown publicly after being certified by the CBFC.</p></div><div class="blog-section-block blog-conclusion-block"><h2 class="blog-section-heading">CONCLUSION</h2><p>As film censorship hampers artistic freedom and interferes with the creative process of film making, there must exist structures and systems that only provide for film regulation and certification and not censorship and such systems and structures must, while regulating content of films, also hold the ideals of freedom of artistic expression to its highest standard.</p></div></div>`,
                tags: 'Censorship, Free Speech, Article 19(1)(a), CBFC, Cinematograph Act 1952',
                publication_date: '2026-08-01',
                status: 'published',
                seo_title: 'Silencing Voices: The Clash Between Censorship and Free Expression | Capital Circle Law Offices',
                seo_description: 'Silencing Voices: The Clash Between Censorship and Free Expression. An in-depth analysis of free speech, Article 19(1)(a), Cinematograph Act, CBFC, and digital media rules in India.',
                is_deleted: false,
                created_at: '2026-08-01T10:00:00Z',
                updated_at: '2026-08-01T10:00:00Z'
            }
        ],
        team_members: [
            {
                id: 'team-1',
                name: 'Adv. Yeshwanth Thandra',
                designation: 'Founder & Managing Partner',
                image_url: 'assets/founder.png',
                description: 'Yeshwanth Thandra is an engineer turned Supreme Court practitioner specializing in Insolvency laws, Banking litigation, Financial Fraud defense, and Startup legal strategy. His dual background in technology and law empowers him to decode complex financial algorithms and white-collar fraud matters with extraordinary precision.',
                sort_order: 1,
                is_active: true,
                is_deleted: false,
                created_at: '2026-08-01T10:00:00Z'
            },
            {
                id: 'team-2',
                name: 'Adv. Bhavna Gopalan',
                designation: 'Advocate-on-Record, Supreme Court of India',
                image_url: 'assets/bhavna-gopalan.jpg',
                description: 'Advocate-on-Record with over 10 years of experience in Supreme Court litigation, commercial arbitration, intellectual property, insolvency, banking, and constitutional law. Regularly represents clients before the Supreme Court, High Courts, and various tribunals across India.',
                sort_order: 2,
                is_active: true,
                is_deleted: false,
                created_at: '2026-08-01T10:00:00Z'
            },
            {
                id: 'team-3',
                name: 'PDV Srikar',
                designation: 'Advocate',
                image_url: 'assets/pdv-srikar.png',
                description: 'Experienced Advocate practicing in civil, commercial, intellectual property, taxation, insolvency, and dispute resolution matters. Represents clients before District Courts, High Courts, Tribunals, NCLT, and the Supreme Court with practical and client-focused legal solutions.',
                sort_order: 3,
                is_active: true,
                is_deleted: false,
                created_at: '2026-08-01T10:00:00Z'
            }
        ],
        website_content: {
            hero: {
                brandTitle: "CAPITAL CIRCLE",
                brandSubtitle: "LAW OFFICES",
                subtitleText: "Capital Circle Law Offices is a dynamic and innovative law firm, established to cater to the evolving needs of the financial and corporate sectors. As a new generation law firm, Capital Circle is committed to delivering exceptional legal services with a modern approach, integrating technology and traditional legal wisdom to offer comprehensive solutions."
            },
            mission: {
                eyebrow: "OUR DRIVING PURPOSE",
                title: "Our Mission",
                text: "At Capital Circle Law Offices, our mission is to provide top-notch legal representation and strategic advice to our clients. We aim to build lasting relationships by working closely with banks, Non-Banking Financial Companies, startups, and corporations, ensuring their legal needs are met with precision and professionalism."
            },
            team_overview: {
                eyebrow: "EXPERT LEGAL & FINANCIAL PROFESSIONALS",
                title: "Our Team",
                text: "Our team consists of not only legal experts but also professionals who understand business aspects and new technology. This includes advocates practicing before various courts, Chartered Accountants, Company Secretaries, and financial advisors. Our diverse team completely understands legal, financial, and business aspects, allowing us to provide comprehensive solutions tailored to our clients' needs."
            },
            why_us: {
                eyebrow: "OUR COMMITMENT TO EXCELLENCE",
                title: "Why Choose Us?",
                text: "Capital Circle Law Offices stands out for its client-focused approach and commitment to excellence. We leverage our deep understanding of the legal environment and industry-specific insights to deliver tailored solutions that meet our clients' objectives. Our innovative strategies, combined with a strong ethical foundation, ensure that we provide unparalleled legal support."
            }
        },
        media: [
            { id: 'm-1', title: 'Founder Image', url: 'assets/founder.png', usage_location: 'Founder Profile & Team Section', uploaded_at: '2026-08-01T10:00:00Z' },
            { id: 'm-2', title: 'Adv. Bhavna Gopalan Image', url: 'assets/bhavna-gopalan.jpg', usage_location: 'Team Section', uploaded_at: '2026-08-01T10:00:00Z' },
            { id: 'm-3', title: 'PDV Srikar Image', url: 'assets/pdv-srikar.png', usage_location: 'Team Section', uploaded_at: '2026-08-01T10:00:00Z' },
            { id: 'm-4', title: 'Hero Legal Banner', url: 'assets/hero-banner.png', usage_location: 'Home Hero Section', uploaded_at: '2026-08-01T10:00:00Z' },
            { id: 'm-5', title: 'Hero Legal Art', url: 'assets/hero-legal-art.png', usage_location: 'Blog Featured Image', uploaded_at: '2026-08-01T10:00:00Z' }
        ],
        inquiries: [
            {
                id: 'inq-1',
                name: 'Corporate Director',
                email: 'director@financialcorp.in',
                phone: '+91 98111 22334',
                subject: 'Financial Frauds Investigation',
                message: 'Seeking strategic legal representation for an upcoming NCLT hearing regarding corporate debt restructuring.',
                status: 'unread',
                created_at: '2026-08-05T14:30:00Z'
            }
        ],
        website_settings: {
            site_name: 'Capital Circle Law Offices',
            logo_url: 'assets/logo.png',
            phone: '+91 98765 43210 / +91 11 2345 6789',
            email: 'contact@capitalcirclelaw.com / yeshwanth@capitalcirclelaw.com',
            address: 'Corporate Legal Chamber, Supreme Court Enclave, New Delhi, India',
            footer_text: 'A dynamic and innovative law firm delivering strategic legal solutions for financial institutions, businesses, startups, and corporates with legal & financial precision.',
            social_links: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com', facebook: 'https://facebook.com' },
            seo_title: 'Capital Circle Law Offices | Legal Excellence. Business Success.',
            seo_description: 'Capital Circle Law Offices is a premier law firm founded by Adv. Yeshwanth Thandra specializing in Financial Frauds, White Collar Crimes, Insolvency, Corporate Governance, and Startup Advisory.'
        },
        admin_activity_logs: [
            {
                id: 'log-1',
                action: 'SYSTEM_INIT',
                admin_email: 'admin@capitalcirclelaw.com',
                target: 'Database System',
                details: 'Capital Circle Admin CMS initialized successfully',
                created_at: '2026-08-08T21:30:00Z'
            }
        ]
    };

    // Helper: Supabase API Request
    async function supabaseRequest(endpoint, options = {}) {
        const headers = {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
            ...(options.headers || {})
        };
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
                ...options,
                headers
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            // console.warn(`Supabase API request failed for ${endpoint}:`, err.message);
            return null; // Return null to trigger fallback
        }
    }

    // Helper: Get local data with fallback initialization
    function getLocalData(tableName) {
        const raw = localStorage.getItem(STORAGE_KEY_PREFIX + tableName);
        if (raw) {
            try { return JSON.parse(raw); } catch (e) { }
        }
        // Initialize default seed data if missing
        const initial = DEFAULT_SEED_DATA[tableName] || [];
        localStorage.setItem(STORAGE_KEY_PREFIX + tableName, JSON.stringify(initial));
        return initial;
    }

    function setLocalData(tableName, data) {
        localStorage.setItem(STORAGE_KEY_PREFIX + tableName, JSON.stringify(data));
    }

    // Main Database Client API
    const DatabaseEngine = {
        // --- ARTICLES ---
        async getArticles(filterOptions = {}) {
            const { includeDeleted = false, search = '', category = '', status = '', sortBy = 'newest' } = filterOptions;
            let articles = await supabaseRequest('articles?select=*');

            if (!articles) {
                articles = getLocalData('articles');
            }

            return articles.filter(art => {
                if (!includeDeleted && art.is_deleted) return false;
                if (status && status !== 'all' && art.status !== status) return false;
                if (category && category !== 'all' && art.category !== category) return false;
                if (search) {
                    const q = search.toLowerCase();
                    const titleMatch = art.title && art.title.toLowerCase().includes(q);
                    const authorMatch = art.author && art.author.toLowerCase().includes(q);
                    if (!titleMatch && !authorMatch) return false;
                }
                return true;
            }).sort((a, b) => {
                const dateA = new Date(a.publication_date || a.created_at || 0);
                const dateB = new Date(b.publication_date || b.created_at || 0);
                return sortBy === 'oldest' ? dateA - dateB : dateB - dateA;
            });
        },

        async getArticleBySlug(slug) {
            const articles = await this.getArticles({ includeDeleted: false });
            return articles.find(a => a.slug === slug) || null;
        },

        async saveArticle(articleData) {
            const now = new Date().toISOString();
            const payload = {
                ...articleData,
                updated_at: now
            };

            if (!payload.id) {
                payload.id = 'art-' + Date.now();
                payload.created_at = now;
            }

            // Try Supabase first
            const sbResult = await supabaseRequest('articles', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
                body: JSON.stringify(payload)
            });

            // Update Local Data
            const list = getLocalData('articles');
            const idx = list.findIndex(a => a.id === payload.id || a.slug === payload.slug);
            if (idx >= 0) {
                list[idx] = { ...list[idx], ...payload };
            } else {
                list.unshift(payload);
            }
            setLocalData('articles', list);

            await this.logActivity('ARTICLE_SAVED', 'admin@capitalcirclelaw.com', payload.title, `Saved article "${payload.title}" (${payload.status})`);
            return sbResult ? sbResult[0] : payload;
        },

        async deleteArticle(articleId, hardDelete = false) {
            let articleTitle = 'Article';
            const list = getLocalData('articles');
            const target = list.find(a => a.id === articleId);
            if (target) articleTitle = target.title;

            if (hardDelete) {
                await supabaseRequest(`articles?id=eq.${articleId}`, { method: 'DELETE' });
                const filtered = list.filter(a => a.id !== articleId);
                setLocalData('articles', filtered);
            } else {
                const updated = list.map(a => a.id === articleId ? { ...a, is_deleted: true, updated_at: new Date().toISOString() } : a);
                setLocalData('articles', updated);
                await supabaseRequest(`articles?id=eq.${articleId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ is_deleted: true })
                });
            }

            await this.logActivity('ARTICLE_DELETED', 'admin@capitalcirclelaw.com', articleTitle, `Deleted article ${articleId}`);
            return true;
        },

        async restoreArticle(articleId) {
            const list = getLocalData('articles');
            const updated = list.map(a => a.id === articleId ? { ...a, is_deleted: false, updated_at: new Date().toISOString() } : a);
            setLocalData('articles', updated);
            await supabaseRequest(`articles?id=eq.${articleId}`, {
                method: 'PATCH',
                body: JSON.stringify({ is_deleted: false })
            });
            await this.logActivity('ARTICLE_RESTORED', 'admin@capitalcirclelaw.com', articleId, `Restored deleted article ${articleId}`);
            return true;
        },

        // --- TEAM MEMBERS ---
        async getTeamMembers(options = {}) {
            const { includeInactive = false, includeDeleted = false } = options;
            let members = await supabaseRequest('team_members?select=*');
            if (!members) {
                members = getLocalData('team_members');
            }

            return members.filter(m => {
                if (!includeDeleted && m.is_deleted) return false;
                if (!includeInactive && !m.is_active) return false;
                return true;
            }).sort((a, b) => (a.sort_order || 99) - (b.sort_order || 99));
        },

        async saveTeamMember(memberData) {
            const now = new Date().toISOString();
            const payload = {
                ...memberData,
                updated_at: now
            };
            if (!payload.id) {
                payload.id = 'team-' + Date.now();
                payload.created_at = now;
            }

            await supabaseRequest('team_members', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
                body: JSON.stringify(payload)
            });

            const list = getLocalData('team_members');
            const idx = list.findIndex(m => m.id === payload.id);
            if (idx >= 0) {
                list[idx] = { ...list[idx], ...payload };
            } else {
                list.push(payload);
            }
            setLocalData('team_members', list);

            await this.logActivity('TEAM_SAVED', 'admin@capitalcirclelaw.com', payload.name, `Saved team member details for ${payload.name}`);
            return payload;
        },

        async deleteTeamMember(memberId) {
            const list = getLocalData('team_members');
            const target = list.find(m => m.id === memberId);
            const name = target ? target.name : memberId;

            const updated = list.map(m => m.id === memberId ? { ...m, is_deleted: true, updated_at: new Date().toISOString() } : m);
            setLocalData('team_members', updated);

            await supabaseRequest(`team_members?id=eq.${memberId}`, {
                method: 'PATCH',
                body: JSON.stringify({ is_deleted: true })
            });

            await this.logActivity('TEAM_DELETED', 'admin@capitalcirclelaw.com', name, `Deleted team member ${name}`);
            return true;
        },

        // --- WEBSITE CONTENT SECTIONS ---
        async getWebsiteContent(sectionKey) {
            let res = await supabaseRequest(`website_content?section_key=eq.${sectionKey}&select=*`);
            if (res && res.length > 0) {
                return res[0].content_json;
            }
            const localContent = getLocalData('website_content');
            return localContent[sectionKey] || DEFAULT_SEED_DATA.website_content[sectionKey] || null;
        },

        async saveWebsiteContent(sectionKey, contentObj) {
            const localContent = getLocalData('website_content');
            localContent[sectionKey] = contentObj;
            setLocalData('website_content', localContent);

            await supabaseRequest('website_content', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
                body: JSON.stringify({
                    section_key: sectionKey,
                    section_title: sectionKey.toUpperCase(),
                    content_json: contentObj,
                    updated_at: new Date().toISOString()
                })
            });

            await this.logActivity('CONTENT_UPDATED', 'admin@capitalcirclelaw.com', sectionKey, `Updated website content section: ${sectionKey}`);
            return contentObj;
        },

        // --- MEDIA MANAGEMENT ---
        async getMedia(search = '') {
            let media = await supabaseRequest('media?select=*');
            if (!media) {
                media = getLocalData('media');
            }
            if (search) {
                const q = search.toLowerCase();
                return media.filter(m => (m.title && m.title.toLowerCase().includes(q)) || (m.url && m.url.toLowerCase().includes(q)));
            }
            return media;
        },

        async saveMedia(mediaData) {
            const payload = {
                id: mediaData.id || 'media-' + Date.now(),
                title: mediaData.title || 'Uploaded Image',
                url: mediaData.url,
                public_id: mediaData.public_id || '',
                usage_location: mediaData.usage_location || 'Admin Upload',
                uploaded_at: new Date().toISOString()
            };

            await supabaseRequest('media', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
                body: JSON.stringify(payload)
            });

            const list = getLocalData('media');
            list.unshift(payload);
            setLocalData('media', list);

            await this.logActivity('MEDIA_UPLOADED', 'admin@capitalcirclelaw.com', payload.title, `Uploaded image to media library: ${payload.url}`);
            return payload;
        },

        async deleteMedia(mediaId) {
            const list = getLocalData('media');
            const filtered = list.filter(m => m.id !== mediaId);
            setLocalData('media', filtered);

            await supabaseRequest(`media?id=eq.${mediaId}`, { method: 'DELETE' });
            await this.logActivity('MEDIA_DELETED', 'admin@capitalcirclelaw.com', mediaId, `Deleted media item ${mediaId}`);
            return true;
        },

        // --- INQUIRIES ---
        async getInquiries(options = {}) {
            const { status = '', search = '' } = options;
            let inquiries = await supabaseRequest('inquiries?select=*');
            if (!inquiries) {
                inquiries = getLocalData('inquiries');
            }

            return inquiries.filter(inq => {
                if (status && status !== 'all' && inq.status !== status) return false;
                if (search) {
                    const q = search.toLowerCase();
                    const nameMatch = inq.name && inq.name.toLowerCase().includes(q);
                    const emailMatch = inq.email && inq.email.toLowerCase().includes(q);
                    const subjectMatch = inq.subject && inq.subject.toLowerCase().includes(q);
                    if (!nameMatch && !emailMatch && !subjectMatch) return false;
                }
                return true;
            }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        },

        async saveInquiry(inquiryData) {
            const payload = {
                id: 'inq-' + Date.now(),
                name: inquiryData.name,
                email: inquiryData.email,
                phone: inquiryData.phone,
                subject: inquiryData.subject || 'General Consultation',
                message: inquiryData.message || '',
                status: 'unread',
                created_at: new Date().toISOString()
            };

            await supabaseRequest('inquiries', {
                method: 'POST',
                headers: { 'Prefer': 'return=representation' },
                body: JSON.stringify(payload)
            });

            const list = getLocalData('inquiries');
            list.unshift(payload);
            setLocalData('inquiries', list);

            return payload;
        },

        async updateInquiryStatus(inquiryId, status) {
            const list = getLocalData('inquiries');
            const updated = list.map(i => i.id === inquiryId ? { ...i, status } : i);
            setLocalData('inquiries', updated);

            await supabaseRequest(`inquiries?id=eq.${inquiryId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });

            return true;
        },

        async deleteInquiry(inquiryId) {
            const list = getLocalData('inquiries');
            const filtered = list.filter(i => i.id !== inquiryId);
            setLocalData('inquiries', filtered);

            await supabaseRequest(`inquiries?id=eq.${inquiryId}`, { method: 'DELETE' });
            await this.logActivity('INQUIRY_DELETED', 'admin@capitalcirclelaw.com', inquiryId, `Deleted inquiry record ${inquiryId}`);
            return true;
        },

        // --- WEBSITE SETTINGS ---
        async getSettings() {
            let res = await supabaseRequest('website_settings?id=eq.1&select=*');
            if (res && res.length > 0) {
                return res[0];
            }
            return getLocalData('website_settings');
        },

        async saveSettings(settingsData) {
            const payload = {
                id: 1,
                ...settingsData,
                updated_at: new Date().toISOString()
            };

            setLocalData('website_settings', payload);

            await supabaseRequest('website_settings', {
                method: 'POST',
                headers: { 'Prefer': 'resolution=merge-duplicates,return=representation' },
                body: JSON.stringify(payload)
            });

            await this.logActivity('SETTINGS_UPDATED', 'admin@capitalcirclelaw.com', 'Website Settings', 'Updated website global settings & contact details');
            return payload;
        },

        // --- ACTIVITY LOGS ---
        async getActivityLogs(limit = 50) {
            let logs = await supabaseRequest(`admin_activity_logs?select=*&order=created_at.desc&limit=${limit}`);
            if (!logs) {
                logs = getLocalData('admin_activity_logs');
            }
            return logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, limit);
        },

        async logActivity(action, adminEmail, target, details) {
            const entry = {
                id: 'log-' + Date.now(),
                action,
                admin_email: adminEmail || 'admin@capitalcirclelaw.com',
                target,
                details,
                created_at: new Date().toISOString()
            };

            const logs = getLocalData('admin_activity_logs');
            logs.unshift(entry);
            setLocalData('admin_activity_logs', logs.slice(0, 100));

            await supabaseRequest('admin_activity_logs', {
                method: 'POST',
                body: JSON.stringify(entry)
            });
        },

        // --- AUTHENTICATION & SESSIONS ---
        async authenticateAdmin(emailOrUsername, password) {
            const inputHash = await sha256(password);
            
            // Authorized accounts verification
            const cleanUser = (emailOrUsername || '').toLowerCase().trim();
            const isAdminEmail = (cleanUser === 'admin@capitalcirclelaw.com' || cleanUser === 'admin');
            const expectedHash = '3d95118c23b91ea3d34ec64f8a2935fa03af673cc90bace78e72b8615b13f45a'; // SHA-256 for CapitalCircle2026!Admin

            const isPasswordValid = (inputHash === expectedHash || password === 'CapitalCircle2026!Admin');

            if (isAdminEmail && isPasswordValid) {
                const session = {
                    email: 'admin@capitalcirclelaw.com',
                    username: 'admin',
                    name: 'Managing Administrator',
                    token: 'tok_' + Date.now() + '_' + Math.random().toString(36).substring(2),
                    loginAt: new Date().toISOString()
                };
                this.setAdminSession(session);
                await this.logActivity('ADMIN_LOGIN', session.email, 'Admin Panel', 'Successful admin authentication');
                return { success: true, session };
            }

            return { success: false, message: 'Invalid admin email/username or password' };
        },

        getAdminSession() {
            const raw = sessionStorage.getItem('cc_admin_session') || localStorage.getItem('cc_admin_session');
            if (!raw) return null;
            try { return JSON.parse(raw); } catch (e) { return null; }
        },

        setAdminSession(sessionData) {
            sessionStorage.setItem('cc_admin_session', JSON.stringify(sessionData));
            localStorage.setItem('cc_admin_session', JSON.stringify(sessionData));
        },

        clearAdminSession() {
            sessionStorage.removeItem('cc_admin_session');
            localStorage.removeItem('cc_admin_session');
        }
    };

    window.CapitalCircleDB = DatabaseEngine;

})(window);
