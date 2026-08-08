-- ============================================================================
-- Capital Circle Law Offices - Database Schema & Initial Data Migration
-- Supabase PostgreSQL Schema
-- ============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. ADMIN USERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'administrator',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- Initial Admin Account: admin@capitalcirclelaw.com / CapitalCircle2026!Admin
-- SHA-256 hash of CapitalCircle2026!Admin = 3d95118c23b91ea3d34ec64f8a2935fa03af673cc90bace78e72b8615b13f45a
INSERT INTO public.admin_users (email, username, password_hash, full_name, role)
VALUES (
    'admin@capitalcirclelaw.com',
    'admin',
    '3d95118c23b91ea3d34ec64f8a2935fa03af673cc90bace78e72b8615b13f45a',
    'Managing Administrator',
    'administrator'
) ON CONFLICT (email) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 2. ARTICLES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    featured_image TEXT,
    category TEXT NOT NULL DEFAULT 'Constitutional & Media Law',
    author TEXT NOT NULL DEFAULT 'Capital Circle Law Offices',
    content TEXT NOT NULL,
    tags TEXT,
    publication_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'published', -- 'published' or 'draft'
    seo_title TEXT,
    seo_description TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial Article Migration: Silencing Voices: The Clash Between Censorship and Free Expression
INSERT INTO public.articles (
    title,
    slug,
    featured_image,
    category,
    author,
    content,
    tags,
    publication_date,
    status,
    seo_title,
    seo_description,
    is_deleted
) VALUES (
    'CENSORSHIP AND FREEDOM OF EXPRESSION',
    'censorship-and-freedom-of-expression',
    'assets/hero-legal-art.png',
    'Constitutional & Media Law',
    'Capital Circle Law Offices',
    '<div class="blog-intro-box"><h3 class="intro-title">INTRODUCTION</h3><p>The tension between censorship and the fundamental right to free expression weaves a complex narrative in the diverse tapestry of India''s socio-cultural landscape, reflecting the delicate balance the nation strives to maintain. The conflict between censorship and free expression in India is rooted in constitutional principles and manifested through a wide range of laws, and it underpins a discourse that resonates across various spheres of society.</p><p>As we navigate the maze of sedition laws, media controls, and the ever-expanding realm of the internet, issues about where the lines are drawn and how they are defined arise. The latest Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, complicate the scene even further, adding layers to the continuing debate over free expression in the digital era.</p><p>This article dives into the complexities of the dispute, exploring the historical roots of censorship in India as well as its evolution through legal changes. The legislative framework sets the setting for a nuanced assessment of the delicate tango between restriction and liberty, from the censorship of cinematic expressions under the Cinematograph Act to the regulation of digital media under the Information Technology Act.</p></div><div class="blog-body"><div class="blog-section-block"><h2 class="blog-section-heading">MAIN BLOG</h2><p>Article 19(1)(a) of the Constitution of India guarantees this basic right to free speech and expression. As per the International Covenant on Civil and Political Rights (ICCPR), the right to free speech is recognized under the international human rights law, while Article 19 of the Universal Declaration of Human Rights (UDHR) recognizes freedom of expression as a human right. As free expression is not an unqualified right, hence certain limits are in place upon this right under Article 19(2). However, the only way to limit freedom of speech is through legislation. The right to disseminate material, publish it, and market the same also falls under the ambit of this freedom.</p></div><div class="blog-section-block"><h2 class="blog-section-heading">Freedom of expression under indian constitution</h2><p>Heart of this discussion lies in Article 19(1)(a) of the Indian Constitution, which guarantees the right to free speech and expression—a cornerstone of democracy—is at the center of this debate. According to Article 19(1)(a): All citizens shall have the right to freedom of speech and expression. The very fabric of this right, however, is intricately linked with Article 19(2), which allows for reasonable restrictions in the interests of sovereignty, integrity, public order, and other things.</p></div></div>',
    'Censorship and Freedom of Expression, Article 19(1)(a), CBFC, Cinematograph Act 1952, Free Speech India',
    '2026-08-01',
    'published',
    'Silencing Voices: The Clash Between Censorship and Free Expression | Capital Circle Law Offices',
    'Silencing Voices: The Clash Between Censorship and Free Expression. An in-depth analysis of free speech, Article 19(1)(a), Cinematograph Act, CBFC, and digital media rules in India.',
    FALSE
) ON CONFLICT (slug) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 3. TEAM MEMBERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial Team Data Migration
INSERT INTO public.team_members (name, designation, image_url, description, sort_order, is_active)
VALUES
(
    'Adv. Yeshwanth Thandra',
    'Founder & Managing Partner',
    'assets/founder.png',
    'Yeshwanth Thandra is an engineer turned Supreme Court practitioner specializing in Insolvency laws, Banking litigation, Financial Fraud defense, and Startup legal strategy. His dual background in technology and law empowers him to decode complex financial algorithms and white-collar fraud matters with extraordinary precision.',
    1,
    TRUE
),
(
    'Adv. Bhavna Gopalan',
    'Advocate-on-Record, Supreme Court of India',
    'assets/bhavna-gopalan.jpg',
    'Advocate-on-Record with over 10 years of experience in Supreme Court litigation, commercial arbitration, intellectual property, insolvency, banking, and constitutional law. Regularly represents clients before the Supreme Court, High Courts, and various tribunals across India.',
    2,
    TRUE
),
(
    'PDV Srikar',
    'Advocate',
    'assets/pdv-srikar.png',
    'Experienced Advocate practicing in civil, commercial, intellectual property, taxation, insolvency, and dispute resolution matters. Represents clients before District Courts, High Courts, Tribunals, NCLT, and the Supreme Court with practical and client-focused legal solutions.',
    3,
    TRUE
);

-- ----------------------------------------------------------------------------
-- 4. WEBSITE CONTENT TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL,
    section_title TEXT NOT NULL,
    content_json JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial Website Content Migration
INSERT INTO public.website_content (section_key, section_title, content_json)
VALUES
(
    'hero',
    'Hero Section',
    '{
        "brandTitle": "CAPITAL CIRCLE",
        "brandSubtitle": "LAW OFFICES",
        "subtitleText": "Capital Circle Law Offices is a dynamic and innovative law firm, established to cater to the evolving needs of the financial and corporate sectors. As a new generation law firm, Capital Circle is committed to delivering exceptional legal services with a modern approach, integrating technology and traditional legal wisdom to offer comprehensive solutions."
    }'::jsonb
),
(
    'mission',
    'Our Mission',
    '{
        "eyebrow": "OUR DRIVING PURPOSE",
        "title": "Our Mission",
        "text": "At Capital Circle Law Offices, our mission is to provide top-notch legal representation and strategic advice to our clients. We aim to build lasting relationships by working closely with banks, Non-Banking Financial Companies, startups, and corporations, ensuring their legal needs are met with precision and professionalism."
    }'::jsonb
),
(
    'team_overview',
    'Our Team Overview',
    '{
        "eyebrow": "EXPERT LEGAL & FINANCIAL PROFESSIONALS",
        "title": "Our Team",
        "text": "Our team consists of not only legal experts but also professionals who understand business aspects and new technology. This includes advocates practicing before various courts, Chartered Accountants, Company Secretaries, and financial advisors. Our diverse team completely understands legal, financial, and business aspects, allowing us to provide comprehensive solutions tailored to our clients'' needs."
    }'::jsonb
),
(
    'why_us',
    'Why Choose Us',
    '{
        "eyebrow": "OUR COMMITMENT TO EXCELLENCE",
        "title": "Why Choose Us?",
        "text": "Capital Circle Law Offices stands out for its client-focused approach and commitment to excellence. We leverage our deep understanding of the legal environment and industry-specific insights to deliver tailored solutions that meet our clients'' objectives. Our innovative strategies, combined with a strong ethical foundation, ensure that we provide unparalleled legal support."
    }'::jsonb
) ON CONFLICT (section_key) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 5. MEDIA TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    public_id TEXT,
    file_type TEXT DEFAULT 'image/png',
    file_size INT DEFAULT 0,
    usage_location TEXT DEFAULT 'Website Media',
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial Website Media Assets
INSERT INTO public.media (title, url, usage_location) VALUES
('Founder Image', 'assets/founder.png', 'Founder Profile & Team Section'),
('Adv. Bhavna Gopalan Image', 'assets/bhavna-gopalan.jpg', 'Team Section'),
('PDV Srikar Image', 'assets/pdv-srikar.png', 'Team Section'),
('Hero Legal Banner', 'assets/hero-banner.png', 'Home Hero Section'),
('Hero Legal Art', 'assets/hero-legal-art.png', 'Blog Featured Image'),
('Hero Background', 'assets/hero-bg.jpg', 'Hero Background Overlay');

-- ----------------------------------------------------------------------------
-- 6. INQUIRIES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread', -- 'unread' or 'read'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Sample Initial Inquiry
INSERT INTO public.inquiries (name, email, phone, subject, message, status) VALUES
('Corporate Director', 'director@financialcorp.in', '+91 98111 22334', 'Financial Frauds Investigation', 'Seeking strategic legal representation for an upcoming NCLT hearing regarding corporate debt restructuring.', 'unread');

-- ----------------------------------------------------------------------------
-- 7. WEBSITE SETTINGS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_settings (
    id INT PRIMARY KEY DEFAULT 1,
    site_name TEXT DEFAULT 'Capital Circle Law Offices',
    logo_url TEXT DEFAULT 'assets/logo.png',
    phone TEXT DEFAULT '+91 98765 43210 / +91 11 2345 6789',
    email TEXT DEFAULT 'contact@capitalcirclelaw.com / yeshwanth@capitalcirclelaw.com',
    address TEXT DEFAULT 'Corporate Legal Chamber, Supreme Court Enclave, New Delhi, India',
    footer_text TEXT DEFAULT 'A dynamic and innovative law firm delivering strategic legal solutions for financial institutions, businesses, startups, and corporates with legal & financial precision.',
    social_links JSONB DEFAULT '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com", "facebook": "https://facebook.com"}'::jsonb,
    seo_title TEXT DEFAULT 'Capital Circle Law Offices | Legal Excellence. Business Success.',
    seo_description TEXT DEFAULT 'Capital Circle Law Offices is a premier law firm founded by Adv. Yeshwanth Thandra specializing in Financial Frauds, White Collar Crimes, Insolvency, Corporate Governance, and Startup Advisory.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.website_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 8. ADMIN ACTIVITY LOGS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    admin_email TEXT NOT NULL,
    target TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.admin_activity_logs (action, admin_email, target, details)
VALUES ('SYSTEM_INIT', 'system@capitalcirclelaw.com', 'Database Schema', 'Capital Circle Admin CMS Schema initialized with initial data migration');
