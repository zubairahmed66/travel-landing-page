// 01 # Header
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ডম এলিমেন্ট সিলেকশন
    const zaHeader = document.getElementById('za-NavHeader');
    const zaPrimaryNav = document.getElementById('za-PrimaryNavList');
    const zaBurgerBtn = document.getElementById('za-TriggerBurger');
    const zaMobilePanel = document.getElementById('za-MobilePanel');
    const zaPanelBody = document.getElementById('za-PanelBody');
    const zaBackdrop = document.getElementById('za-PanelBackdrop');
    const zaPanelClose = document.getElementById('za-PanelClose');

    // ==========================================================================
    // ১. নোড ক্লোনিং মেকানি
    // ==========================================================================
    if (zaPrimaryNav && zaPanelBody) {
        // ডেক্সটপ মেনু ক্লোন করা হচ্ছে
        const clonedNav = zaPrimaryNav.cloneNode(true);
        clonedNav.id = 'za-MobileNavList';
        zaPanelBody.appendChild(clonedNav);

        // হেডারের বাটন কন্টেইনার ক্লোন করে মোবাইল ড্রয়ারের নিচে পুশ
        const originalActions = document.querySelector('.za-navbar-actions');
        if (originalActions) {
            const clonedActions = originalActions.cloneNode(true);
            clonedActions.classList.remove('za-navbar-actions');
            clonedActions.classList.add('za-drawer-actions-container');
            zaPanelBody.appendChild(clonedActions);
        }
    }

    // ==========================================================================
    // ২. ড্রয়ার ওপেন/ক্লোজ স্টেট মেশিন
    // ==========================================================================
    function openDrawer() {
        zaMobilePanel.classList.add('za-panel-open');
        zaBackdrop.classList.add('za-backdrop-visible');
        zaBurgerBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('za-scroll-locked');
        zaMobilePanel.focus();
    }

    function closeDrawer() {
        zaMobilePanel.classList.remove('za-panel-open');
        zaBackdrop.classList.remove('za-backdrop-visible');
        zaBurgerBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('za-scroll-locked');
    }

    // ইভেন্ট লিসেনার অ্যাসাইনমেন্ট
    zaBurgerBtn.addEventListener('click', function () {
        zaMobilePanel.classList.contains('za-panel-open') ? closeDrawer() : openDrawer();
    });
    zaPanelClose.addEventListener('click', closeDrawer);
    zaBackdrop.addEventListener('click', closeDrawer);

    // ESC কি প্রেস ডিটেকশন
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && zaMobilePanel.classList.contains('za-panel-open')) {
            closeDrawer();
        }
    });
    
    // ==========================================================================
    // ৪. গ্লোবাল উইন্ডো ইভেন্টস (রিসাইজ, স্ক্রোল ও বাটন স্টেট টগল)
    // ==========================================================================
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992 && zaMobilePanel.classList.contains('za-panel-open')) {
            closeDrawer();
        }
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            zaHeader.classList.add('za-sticky-active');
        } else {
            zaHeader.classList.remove('za-sticky-active');
        }
    });

    // অ্যাকশন বাটন একটিভ স্টেট টগল লিসেনার
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('za-btn')) {
            const allActionBtns = document.querySelectorAll('.za-btn');
            allActionBtns.forEach(btn => btn.classList.remove('za-active'));
            e.target.classList.add('za-active');
        }
    });
});
