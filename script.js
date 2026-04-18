// ============================================================
//  iTL写真部 — script.js
// ============================================================

// --- Header: scroll border ---
const header = document.getElementById('site-header');
let rafPending = false;

window.addEventListener('scroll', () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 20);
        rafPending = false;
    });
}, { passive: true });

// --- Mobile menu ---
const menuToggle = document.getElementById('menu-toggle');
const siteNav    = document.getElementById('site-nav');

const isMobileNav = () => window.matchMedia('(max-width: 767px)').matches;

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const next   = !isOpen;

    menuToggle.setAttribute('aria-expanded', String(next));
    menuToggle.setAttribute('aria-label', next ? 'メニューを閉じる' : 'メニューを開く');
    siteNav.classList.toggle('is-open', next);
});

// Shared close function
function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
    siteNav.classList.remove('is-open');
}

// Close on nav link click (mobile)
siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Keyboard: Escape closes, Tab traps focus within toggle + nav links on mobile
document.addEventListener('keydown', e => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    if (e.key === 'Escape') {
        closeMenu();
        menuToggle.focus();
        return;
    }

    if (e.key !== 'Tab' || !isMobileNav()) return;

    const focusables = [menuToggle, ...siteNav.querySelectorAll('a')];
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
    }
});

// --- Smooth scroll with header offset ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// --- Scroll reveal ---
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
});

document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

// --- Hero entrance ---
// Double-rAF ensures the browser renders the initial hidden state
// before adding classes, so the CSS transition fires correctly.
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        document.querySelectorAll('.hero-title-line').forEach(line => {
            line.classList.add('is-revealed');
        });
        document.querySelector('.hero-meta')?.classList.add('is-revealed');
    });
});

// --- Hero image fade-in on load ---
const heroImg = document.querySelector('.hero-figure img');
if (heroImg) {
    if (heroImg.complete && heroImg.naturalWidth > 0) {
        heroImg.classList.add('is-loaded');
    } else {
        heroImg.addEventListener('load', () => heroImg.classList.add('is-loaded'), { once: true });
        heroImg.addEventListener('error', () => heroImg.classList.add('is-loaded'), { once: true });
    }
}
