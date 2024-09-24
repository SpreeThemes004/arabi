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
    event.target.parentElement.parentElement.classList.remove('active');
  }
}

customElements.define('mobile-submenu', MobileSubmenu);

// header search
class headerSearch extends HTMLElement{
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

customElements.define('header-search', headerSearch);
