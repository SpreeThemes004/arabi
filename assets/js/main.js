// aos
AOS.init({
  duration: 1500,
});

// mobile submenu
class MobileSubmenu extends HTMLElement {
  constructor(){
    super();

    this.opener = this.querySelectorAll('.open-submenu');
    this.btnBack = this.querySelectorAll('.btn-menu-back');

    this.opener.forEach(item => {
      item.addEventListener('click', this.open);
    })

    this.btnBack.forEach(item => {
      item.addEventListener('click', this.close);
    })
  }

  open(event) {
    event.target.parentElement.parentElement.querySelector('.submenu-transform').classList.add('active');
  }

  close(event) {
    event.target.closest('.submenu-transform').classList.remove('active');
  }
}

customElements.define('mobile-submenu', MobileSubmenu);

// header search
class HeaderSearch extends HTMLElement{
  constructor(){
    super();

    this.searchWrapper = this.closest('header').querySelector('.search-wrapper');
    this.searchBtn = this.querySelector('.icon-search');
    this.closeBtn = this.closest('header').querySelector('.search-close');

    this.searchBtn.addEventListener('click', this.toggle.bind(this));
    this.closeBtn.addEventListener('click', this.toggle.bind(this));
  }

  toggle(){
    this.searchWrapper.classList.toggle('search-appear');
  }
}

customElements.define('header-search', HeaderSearch);

// Hero slider
class HeroSlider extends HTMLElement{
  constructor(){
    super();

    this.swiper = this.querySelector('.swiper');
    this.sliderPagination = this.querySelector('.swiper-pagination');
    this.navNext = this.querySelector('.arrow-next');
    this.navPrev = this.querySelector('.arrow-prev');

    this.init();
  }

  init(){
    this.slider = new Swiper(this.swiper, {
      loop: true,
      navigation: {
        nextEl: this.navNext,
        prevEl: this.navPrev,
      },
      pagination: {
        el: this.sliderPagination,
        clickable: true,
      },
    });
  }
}

customElements.define('hero-slider', HeroSlider)


// Footer menu
class Accordion extends HTMLElement{
  constructor(){
    super();

    this.opener = this.querySelectorAll('.accordion-opener');

    this.opener.forEach(item => {
      item.addEventListener('click', this.toggleMenu.bind(this))
    })
  }

  toggleMenu(event) {
    event.target.nextElementSibling.classList.toggle('open');
  }
} 

customElements.define('accordion-menu', Accordion)

// Cart drawer increament-decreament input
class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    if (event.target.name === 'plus') {      
      this.input.stepUp();
    } else {
      this.input.stepDown();
    }
  }
}

customElements.define('quantity-input', QuantityInput);

// Modal openar
class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

// Modal dialog
class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('.product-popup-modal__toggle').addEventListener('click', this.hide.bind(this, false));
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);

var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  scrollPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  
});
var swiper2 = new Swiper(".mySwiper2", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  freeMode: true,
  watchSlidesProgress: true,
  thumbs: {
    swiper: swiper,
  },
});







