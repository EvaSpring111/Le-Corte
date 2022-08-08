const popupElem = document.querySelector('.popup_attention');
let advertisement = ms => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
}
advertisement(5000).then(() => popupElem.classList.toggle('.popup_open'));


class Settings {
    constructor(formClass, nameClass, numberClass, inputClass) {
        this.formElem = document.querySelector(formClass);
        this.NameElem = this.formElem.querySelector(nameClass);
        this.NumberElem = this.formElem.querySelector(numberClass);
        this.selectorElem = this.formElem.querySelector(inputClass);

        this.formElem.addEventListener('submit', this.submit.bind(this));
    }
    

    submit(e) {
        e.preventDefault();

        console.log(this.selectorElem.value);
        alert(`${this.NameElem.value}, спасибо, что записались на дегустацию в наш магазин на ${this.selectorElem.value}.\n Наш менеджер свяжется с вами в течении 10 минут`);
    }
}

let myForm = new Settings('.fieldset', '.name', '.number', '.input_select');

/*

class Slider {
    constructor(selector){
    //this = {__proto__: Slider.prototipe}

    this.selector = selector;
    this.rootElem = document.querySelector(selector);
    this.slides = Array.from( this.rootElem.querySelectorAll('.slider__slide') );
    this.slideIndex = this.slides.findIndex(function (slide) {
        return slide.classList.contains('.slider__current');
    });

    if( this.slideIndex  < 0) {
        this.slideIndex  = 0;
    }

    this.prevSlideBtn = this.rootElem.querySelector('.slider__prev');
    this.nextSlideBtn = this.rootElem.querySelector('.slider__next');

    this.prevSlideBtn.addEventListener('click', this.prevSlide.bind(this) );
    this.nextSlideBtn.addEventListener('click', this.nextSlide.bind(this) );

    //return this;
    }
   

    showSlide(idx) {
    if (!isNaN(idx)) {
        this.slideIndex = Math.min( Math.max(idx, 0), this.slides.length - 1);
    }

    this.render();
    }

    render() {  
    this.slides.forEach((slide,idx) => {
        if(idx === this.slideIndex){
            slide.classList.add('slider__current');
        } else {
            slide.classList.remove('slider__current');
        }
    });
    }  

    prevSlide() {
        return this.showSlide(this.slideIndex - 1);
    }

    nextSlid() {
        return this.showSlide(this.slideIndex + 1);
    }
}

const sliderFirst = new Slider('.fade');

*/





class Burger {
    constructor({ burgerSelector, linksSelector, linksTogglerClass, burgerTogglerClass }){
        this.burgerElem = document.querySelector(burgerSelector);
        this.linksElem = document.querySelector(linksSelector);

        const toggleMenu = () => {
            this.linksElem.classList.toggle(linksTogglerClass);
            this.burgerElem.classList.toggle(burgerTogglerClass);
        };

        this.burgerElem.addEventListener('click', toggleMenu);

        window.addEventListener('click', (e) => {
            if(this.linksElem.classList.contains(linksTogglerClass)){
                const linksElem = e.target.closest(linksSelector);
                const burger = e.target.closest(burgerSelector);

                if(!linksElem && !burger) {
                    toggleMenu();
                }
            }
        });
    }
}

const first = new Burger({
    burgerSelector: '.footer__burger_firts',
    linksSelector: '.footer_nav_links',
    linksTogglerClass: 'footer_nav--open',
    burgerTogglerClass: 'footer__burger--open',
});

const second = new Burger({
    burgerSelector: '.footer__burger_second',
    linksSelector: '.footer_nav_shops',
    linksTogglerClass: 'footer_nav--open',
    burgerTogglerClass: 'footer__burger--open',
});







