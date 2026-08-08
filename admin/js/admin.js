/* ==========================================================================
   Capital Circle Law Offices - Admin Core Controller JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {

    const DB = window.CapitalCircleDB;
    if (!DB) {
        console.error('Database Engine not loaded');
        return;
    }

    // Check Auth Status unless on login page
    const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('/admin/login');
    const session = DB.getAdminSession();

    if (!session && !isLoginPage) {
        window.location.href = 'login.html';
        return;
    }

    if (session && isLoginPage) {
        window.location.href = 'index.html';
        return;
    }

    // Update logged in user info in sidebar if present
    const adminNameEl = document.getElementById('adminUserName');
    const adminAvatarEl = document.getElementById('adminUserAvatar');
    if (adminNameEl && session) adminNameEl.innerText = session.name || 'Admin User';
    if (adminAvatarEl && session) adminAvatarEl.innerText = (session.name || 'A').charAt(0);

    // Logout Handler
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            DB.clearAdminSession();
            showToast('Logged out successfully', 'info');
            setTimeout(() => { window.location.href = 'login.html'; }, 500);
        });
    }

    // Mobile Sidebar Drawer Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const adminSidebar = document.getElementById('adminSidebar');
    if (mobileMenuToggle && adminSidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('open');
        });
    }

    // Global Modal Backdrop click to close
    document.querySelectorAll('.admin-modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal(backdrop.id);
        });
    });

    document.querySelectorAll('.modal-close-btn, .close-modal-action').forEach(btn => {
        btn.addEventListener('click', () => {
            const backdrop = btn.closest('.admin-modal-backdrop');
            if (backdrop) closeModal(backdrop.id);
        });
    });

});

// Global Toast System
function showToast(message, type = 'success') {
    let container = document.getElementById('adminToastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'adminToastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'warning') icon = '⚠';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `<strong>${icon}</strong> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Modal Helpers
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

// Cloudinary Upload Helper
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/nhnlmlri/image/upload', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Upload failed');
        const data = await response.json();
        return data.secure_url;
    } catch (e) {
        showToast('Image upload failed. Using local preview.', 'warning');
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }
}
