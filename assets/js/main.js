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


// Accordian 
class Accordion extends HTMLElement{
  constructor(){
    super();

    this.opener = this.querySelectorAll('.accordion-opener');
    this.faqOpener = this.querySelectorAll('.faq-header');

    this.opener.forEach(item => {
      item.addEventListener('click', this.toggleMenu.bind(this));
    })

    // for faq page only
    this.faqOpener.forEach(item => {
      item.addEventListener('click', this.toggleFaq.bind(this));
    })
  }

  toggleMenu(event) {
    event.target.nextElementSibling.classList.toggle('open');   
  }

  // for faq page only
  toggleFaq(event) {
    event.target.classList.toggle('minus');      
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
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
  }
}
customElements.define('modal-dialog', ModalDialog);

// Product details slider
class productSlider extends HTMLElement{
  constructor(){
    super()

    this.swiperLarge = this.querySelector('.swiper-large');
    this.swiperThumb = this.querySelector('.swiper-thumb');

    this.navNextThumb = this.querySelector('.nav-thumb .swiper-button-next');
    this.navPrevThumb = this.querySelector('.nav-thumb .swiper-button-prev');

    this.direction = this.swiperThumb.dataset.direction;
    this.vertical = null;
   


    if(this.direction == 'vertical') {
      this.vertical = {
        768: {
          direction: 'vertical'
        }
      }
    }

    this.init();

    const resizeObserver = new ResizeObserver((entries) => this.init());
    resizeObserver.observe(this);
  }

  init(){
    this.sliderThumb = new Swiper(this.swiperThumb, {
      spaceBetween: 8,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      autoHeight: true,
      navigation: {
        nextEl: this.navNextThumb,
        prevEl: this.navPrevThumb,
      },
      breakpoints: this.vertical
    });

    this.sliderLarge  = new Swiper(this.swiperLarge, {
      spaceBetween: 10,
      navigation: {
        nextEl: this.navNextLarge,
        prevEl: this.navPrevLarge,
      },
      thumbs: {
        swiper: this.sliderThumb,
      },
    });
  }
}

customElements.define('product-details-slider', productSlider);

// Product slider
class newProductSlider extends HTMLElement{
  constructor(){
    super();

    this.productSwiper = this.querySelector('.swiper');
    this.navNext = this.querySelector('.product-nav-next');
    this.navPrev = this.querySelector('.product-nav-prev');
    this.init();
  }

  init(){
    this.productSlider = new Swiper(this.productSwiper, {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: this.navNext,
        prevEl: this.navPrev,
      },
      breakpoints: {
        425: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }
}

customElements.define('product-slider', newProductSlider);

// Testmonial slider 
class testimonialSlider extends HTMLElement{
  constructor(){
    super();

    this.swiper = this.querySelector('.swiper');
    this.testimonialNext = this.querySelector('.testimonial-next')
    this.testimonialprev = this.querySelector('.testimonial-prev')

    this.slidesPerView = 1;
    this.breakpoints ={
                        0: {
                          slidesPerView: 1,
                        }
                      };
    if(this.getAttribute('data-slidesPerView')){
      this.slidesPerView = parseFloat(this.getAttribute('data-slidesPerView'));
      this.breakpoints ={
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        991: {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      };
    }

    this.init();
  }

  init(){
    this.slider = new Swiper(this.swiper, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 24,
      loop: true,
      navigation: {
        nextEl: this.testimonialNext,
        prevEl: this.testimonialprev,
      },
      breakpoints: this.breakpoints,
    });
    
  }
}

customElements.define('testimonial-slider', testimonialSlider);

// video section
class DeferredMedia extends HTMLElement {
  constructor() {
    super();

    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
      if (focus) deferredElement.focus();
      if (deferredElement.nodeName == 'VIDEO' && deferredElement.getAttribute('autoplay')) {
        // force autoplay for safari
        deferredElement.play();
      }
    }
  }
}

customElements.define('deferred-media', DeferredMedia);

// counter up 
class counterUp extends HTMLElement{
  constructor(){
    super();

    this.counterWrap = this.querySelector('.about-counter-up');
    this.activated = false;
   
    window.onscroll = () => {
      if(window.scrollY = this.counterWrap.offsetTop){
        if(!this.activated){
          this.updateCounter();
        };
        this.activated = true;
      };
    };

  }
  updateCounter(){
    this.counters = this.querySelectorAll('.count-number');

    this.counters.forEach(counter =>{
      const speed = 200;
    
      const upCount = () => {
        const target = +counter.getAttribute('data-target');
        const value = +counter.innerText;
        const increament = target / speed;

        if(value < target){
          counter.innerText = Math.ceil(value + increament);
          setTimeout(upCount, 2000 / target)
        }else{
          counter.innerText = value;
        }
      }
      upCount();
    })
  }
  
}

customElements.define('counter-up', counterUp);















