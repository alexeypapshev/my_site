'use strict';

const ACTIVE_CLASS = 'active';

const toggleActive = (element) => {
  if (!element) return;
  element.classList.toggle(ACTIVE_CLASS);
};

const setButtonDisabled = (button, disabled) => {
  if (!button) return;
  if (disabled) {
    button.setAttribute('disabled', '');
    return;
  }
  button.removeAttribute('disabled');
};

// Sidebar
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', () => toggleActive(sidebar));
}

// Testimonials modal
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const toggleTestimonialsModal = () => {
  toggleActive(modalContainer);
  toggleActive(overlay);
};

if (modalContainer && overlay && modalImg && modalTitle && modalText) {
  testimonialsItems.forEach((item) => {
    item.addEventListener('click', () => {
      const avatar = item.querySelector('[data-testimonials-avatar]');
      const title = item.querySelector('[data-testimonials-title]');
      const text = item.querySelector('[data-testimonials-text]');

      if (!avatar || !title || !text) return;

      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
      modalTitle.textContent = title.textContent;
      modalText.innerHTML = text.innerHTML;

      toggleTestimonialsModal();
    });
  });

  modalCloseBtn?.addEventListener('click', toggleTestimonialsModal);
  overlay.addEventListener('click', toggleTestimonialsModal);
}

// Portfolio filters
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterButtons = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const applyFilter = (selectedValue) => {
  filterItems.forEach((item) => {
    const shouldShow =
      selectedValue === 'all' || selectedValue === item.dataset.category;
    item.classList.toggle(ACTIVE_CLASS, shouldShow);
  });
};

if (select) {
  select.addEventListener('click', () => toggleActive(select));
}

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const label = item.innerText.trim();
    const selectedValue = label.toLowerCase();

    if (selectValue) {
      selectValue.innerText = label;
    }

    toggleActive(select);
    applyFilter(selectedValue);
  });
});

let lastClickedBtn = filterButtons[0] || null;

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const label = button.innerText.trim();
    const selectedValue = label.toLowerCase();

    if (selectValue) {
      selectValue.innerText = label;
    }

    applyFilter(selectedValue);

    lastClickedBtn?.classList.remove(ACTIVE_CLASS);
    button.classList.add(ACTIVE_CLASS);
    lastClickedBtn = button;
  });
});

// Contact form
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formBtn) {
  const syncFormButtonState = () => {
    setButtonDisabled(formBtn, !form.checkValidity());
  };

  formInputs.forEach((input) => {
    input.addEventListener('input', syncFormButtonState);
  });

  syncFormButtonState();
}

// Page navigation
const pages = document.querySelectorAll('[data-page]');
const navbarLinks = document.querySelectorAll('.navbar [data-nav-link]');
const projectNavLinks = document.querySelectorAll('.project-list [data-nav-link]');

const showPage = (selectedPage) => {
  pages.forEach((page) => {
    const isSelected = selectedPage === page.dataset.page;
    page.classList.toggle(ACTIVE_CLASS, isSelected);
  });
  window.scrollTo(0, 0);
};

navbarLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const selectedPage = link.textContent.trim().toLowerCase();
    showPage(selectedPage);
    navbarLinks.forEach((nav) => {
      nav.classList.toggle(ACTIVE_CLASS, nav === link);
    });
  });
});

projectNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const selectedPage = link.textContent.trim().toLowerCase();
    showPage(selectedPage);
    navbarLinks.forEach((nav) => {
      const isPortfolio = nav.textContent.trim().toLowerCase() === 'portfolio';
      nav.classList.toggle(ACTIVE_CLASS, isPortfolio);
    });
  });
});