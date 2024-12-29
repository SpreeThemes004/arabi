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

    this.media = this.querySelector('.video');

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
    if (popup) {
      popup.loadContent();
      this.playMedia();
    };
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    this.pauseMedia();
  }

  playMedia() {
    this.querySelectorAll('.js-youtube').forEach((video) => {
      video.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    });
    this.querySelectorAll('.js-vimeo').forEach((video) => {
      video.contentWindow.postMessage('{"method":"play"}', '*');
    });
    this.querySelectorAll('video').forEach((video) => video.play());
  }

  pauseMedia() {
    this.querySelectorAll('.js-youtube').forEach((video) => {
      video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    });
    this.querySelectorAll('.js-vimeo').forEach((video) => {
      video.contentWindow.postMessage('{"method":"pause"}', '*');
    });
    this.querySelectorAll('video').forEach((video) => video.pause());
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
      loop: true,
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
      loop: true,
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
    this.sliderPagination = this.querySelector('.swiper-pagination');

    this.slidesPerView = 1;
    this.breakpoints = {
      320: {
        slidesPerView: 1.8,
        spaceBetween: 16,
      },
      575: {
        slidesPerView: 2.6,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    };

    if (this.getAttribute('data-slidePerView')){
      this.slidesPerView = parseFloat(this.getAttribute('data-slidePerView'));
      this.breakpoints = {
        0: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        575: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
      };
    }


    this.init();
  }

  init(){
    this.productSlider = new Swiper(this.productSwiper, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 24,
      navigation: {
        nextEl: this.navNext,
        prevEl: this.navPrev,
      },
      breakpoints: this.breakpoints,
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

// Scroll up button
class scrollUp extends HTMLElement{
  constructor(){
    super();

    window.onscroll = () => {
      this.scrollUpFunc();
    };

    window.onload = () => {
      this.scrollUpFunc();
    }; 
  }

  scrollUpFunc(){
    let srcollUpDiv = document.querySelector('#scroll-up-wrap');
    let position = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollVal = Math.round((position * 100) / calcHeight);
    if(position > 100) {
      srcollUpDiv.classList.add('show');
    } else {
      srcollUpDiv.classList.remove('show');
    };

    srcollUpDiv.addEventListener('click', () => {
      document.documentElement.scrollTop = 0;
    });
    srcollUpDiv.style.background =`conic-gradient(#000 ${scrollVal}%, #F7F7F7 ${scrollVal}%)`;
  }
}

customElements.define('scroll-up', scrollUp);

// Newsletter popup
class modalPopUp extends HTMLElement{
  constructor(){
    super();

    
    this.popup = document.querySelector('.newsletter-popup');
    this.overlay = this.querySelector('.overlay-popup');
    this.closeButton = this.querySelector('.product-popup-modal__toggle');

    window.addEventListener('load', this.openPopup.bind(this));

    window.addEventListener('keydown', this.escapeBtn.bind(this));

    this.closeButton.addEventListener('click', this.closePopup.bind(this));
    this.overlay.addEventListener('click', this.closePopup.bind(this));

    this.popup.addEventListener('wheel', function(event){
      event.preventDefault();
    },false);
    
  }

  openPopup(){
    setTimeout(() => {
      this.popup.classList.remove('hidden');
      this.overlay.classList.remove('hidden');
    }, 2000);
  };

  closePopup(){
    this.popup.classList.add('hidden');
    this.overlay.classList.add('hidden');
  };

  escapeBtn(e){
    if( e.key === 'Escape' && !this.popup.classList.contains('hidden')){
      this.popup.classList.add('hidden');
      this.overlay.classList.add('hidden');
    }
  };

}

customElements.define('modal-popup', modalPopUp);


// Newsletter popup
class countDown extends HTMLElement{
  constructor(){
    super();
    
    window.addEventListener('load', this.countFunc.bind(this));
    
  }

  countFunc(){
    this.countIntervel = setInterval (() => {
      this.countDownDate = new Date("jan 1, 2026 12:00:00").getTime();
      this.now = new Date().getTime();
      this.distance = this.countDownDate - this.now;

      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

      this.querySelector('.count-days').innerHTML = this.days;
      this.querySelector('.count-hours').innerHTML = this.hours;
      this.querySelector('.count-min').innerHTML = this.minutes;
      this.querySelector('.count-sec').innerHTML = this.seconds;

      if (this.distance < 0) {
        clearInterval(this.countIntervel);
      }
    },1000);
  }

  

}

customElements.define('count-down', countDown);















