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
    console.log(this.input)
    if (event.target.name === 'plus') {      
      this.input.stepUp();
    } else {
      this.input.stepDown();
    }
  }
}

customElements.define('quantity-input', QuantityInput);






