'use strict';

// ============================================
// APPLE-STYLE INTERACTIONS
// ============================================

// Smooth page navigation
const pages = document.querySelectorAll('[data-page]');
const navbarLinks = document.querySelectorAll('.navbar [data-nav-link]');
const projectNavLinks = document.querySelectorAll('.project-list [data-nav-link]');

const showPage = (selectedPage) => {
  pages.forEach((page) => {
    const isSelected = selectedPage === page.dataset.page;
    if (isSelected) {
      page.classList.add('active');
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      page.classList.remove('active');
    }
  });
};

// Navbar navigation
navbarLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const selectedPage = link.textContent.trim().toLowerCase();
    showPage(selectedPage);
    
    // Update active state
    navbarLinks.forEach((nav) => {
      nav.classList.toggle('active', nav === link);
    });
  });
});

// Portfolio project navigation
projectNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const selectedPage = link.textContent.trim().toLowerCase();
    showPage(selectedPage);
    
    // Highlight Portfolio in navbar
    navbarLinks.forEach((nav) => {
      const isPortfolio = nav.textContent.trim().toLowerCase() === 'portfolio';
      nav.classList.toggle('active', isPortfolio);
    });
  });
});

// ============================================
// PORTFOLIO FILTERS
// ============================================

const filterButtons = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');

const applyFilter = (selectedValue) => {
  filterItems.forEach((item) => {
    const shouldShow = selectedValue === 'all' || selectedValue === item.dataset.category;
    
    if (shouldShow) {
      item.classList.add('active');
      // Stagger animation
      item.style.animation = 'none';
      item.offsetHeight; // Trigger reflow
      item.style.animation = 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    } else {
      item.classList.remove('active');
    }
  });
};

// Desktop filter buttons
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedValue = button.textContent.trim().toLowerCase();
    
    // Update select value if it exists
    if (selectValue) {
      selectValue.textContent = button.textContent.trim();
    }
    
    applyFilter(selectedValue);
    
    // Update active state
    filterButtons.forEach((btn) => {
      btn.classList.toggle('active', btn === button);
    });
  });
});

// Mobile select dropdown
if (select) {
  select.addEventListener('click', () => {
    select.classList.toggle('active');
  });
}

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const label = item.textContent.trim();
    const selectedValue = label.toLowerCase();
    
    if (selectValue) {
      selectValue.textContent = label;
    }
    
    select?.classList.remove('active');
    applyFilter(selectedValue);
  });
});

// ============================================
// SIDEBAR MOBILE TOGGLE
// ============================================

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// ============================================
// MODAL FUNCTIONALITY
// ============================================

const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const closeModal = () => {
  modalContainer?.classList.remove('active');
  overlay?.classList.remove('active');
};

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeModal);
}

if (overlay) {
  overlay.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ============================================
// CONTACT FORM
// ============================================

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formBtn) {
  const updateFormButton = () => {
    const isValid = form.checkValidity();
    formBtn.disabled = !isValid;
    formBtn.style.opacity = isValid ? '1' : '0.5';
    formBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
  };

  formInputs.forEach((input) => {
    input.addEventListener('input', updateFormButton);
  });

  updateFormButton();
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(item);
});

// Observe project items
document.querySelectorAll('.project-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(item);
});

// ============================================
// INITIALIZATION
// ============================================

// Show about page by default
showPage('about');

// Set initial active navbar link
navbarLinks.forEach((link) => {
  if (link.textContent.trim().toLowerCase() === 'about') {
    link.classList.add('active');
  }
});