 window.addEventListener('load', function(){
    setTimeout(
        function open(event){
            document.querySelector('.popup').style.display = 'block';
        },
        1500
    )
});

document.getElementById('popupId').addEventListener('click', function(){
    document.querySelector('.popup').style.display = 'none';
}); 
document.getElementById("popupId").addEventListener("click", function(){
  popupForm.style.display = "none";
}); 

/*----------------------Burger BTN-----------*/
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

const headerNavBurger = new Burger({
    burgerSelector: '.header__burger',
    linksSelector: '.header-nav', 
    linksTogglerClass: 'header_nav--open', 
    burgerTogglerClass: 'header__burger--open',
}); 

const footerFirstBurger = new Burger({
    burgerSelector: '.footer__burger_firts',
    linksSelector: '.footer_nav_links',
    linksTogglerClass: 'footer_nav--open',
    burgerTogglerClass: 'footer__burger--open',
});

const footerSecondBurger = new Burger ({
    burgerSelector: '.footer__burger_second',
    linksSelector: '.footer_nav_shops',
    linksTogglerClass: 'footer_nav--open',
    burgerTogglerClass: 'footer__burger--open',
});


/*-----------------------Slider block-------------*/

class Slider {
    constructor(
      selector, slider__slide, slider__prev, slider__next){
        this.selector = selector;
        this.rootElem = document.querySelector(selector);
        this.slides = Array.from( this.rootElem.querySelectorAll(slider__slide) );
        this.prevSlideBtn = this.rootElem.querySelector(slider__prev);
        this.nextSlideBtn = this.rootElem.querySelector(slider__next);
        this.slideIndex = this.slides.findIndex(function (slide) {
            return slide.classList.contains('slider__current');
        });

        if( this.slideIndex  < 0) {
            this.slideIndex  = 0;
        }
        

        this.prevSlideBtn.addEventListener('click', this.prevSlide.bind(this) );
        this.nextSlideBtn.addEventListener('click', this.nextSlide.bind(this) );
    
    }
   
    showSlide(idx) {
        if (!isNaN(idx)) {
            this.slideIndex = Math.min( Math.max(idx, 0), this.slides.length - 1);
        }
        this.render();
        }

    render() {  
        this.slides.forEach((slide, idx) => {
            if(idx === this.slideIndex){
                slide.classList.add('slider__current');
            } else {
                slide.classList.remove('slider__current');
            }
        });
    }  

    prevSlide() {
         this.showSlide(this.slideIndex - 1);
    }
    
    nextSlide() {
         this.showSlide(this.slideIndex + 1);
    }
}
const sliderFirst = new Slider('.slider', '.slider__slide', '.slider__prev', '.slider__next');

/*-------------Cards spin------------*/

class Cards {
  constructor(cardElem ) {
    this.cardElem = document.querySelector(cardElem);
   /* this.newCard = document.getElementById('newCard');*/
    this.cardElem.addEventListener('mouseover', (e) => {
      this.cardElem.classList.add('active');
    })
  }
}

let firstCard = new Cards('.img_Harvest-1')

/*--------------Form Validation------------*/

let formElem = document.querySelector('.userNameShops');
let formData = {};
const LS = localStorage;

let NameElem = formElem.querySelector('.visitoName');
let firstNameError = document.getElementById('first-name-error');
let emptyFirstNameError = document.getElementById('empty-first-name');

let NumberElem = formElem.querySelector('.number');
let phoneError = document.getElementById('phone-error');
let emptyPhoneError = document.getElementById('empty-phone');

let selectorElem = formElem.querySelector('.input_select');
let submitButton = formElem.querySelector('.button_submit');
let popupForm = document.querySelector('.popup__form')
let PopupTextInForm = document.querySelector('.popup__text__form');
      

const textVerify = (text) => {
  const regex = /^[A-ZА-Я][a-zа-я]{2,}$/;
  return regex.test(text);      
};

const phoneVerify = (number) => {
  const regex = /^\(?(0[1-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(number);
};

const emptyUpdate = (
  inputReference,
  emptyErrorReference,
  otherErrorReference
) => {
  if (!inputReference.value) {
    emptyErrorReference.classList.remove('hide');
    otherErrorReference.classList.add('hide');
    inputReference.classList.add('error');
  } else {
    emptyErrorReference.classList.add('hide');
  }
};

const errorUpdate = (inputReference, errorReference) => {
  errorReference.classList.remove('hide');
  inputReference.classList.remove('valid');
  inputReference.classList.add('error');
};

const validInput = (inputReference) => {
  inputReference.classList.remove('error');
  inputReference.classList.add('valid');
};

NameElem.addEventListener('input', (e) => {
  if (textVerify(NameElem.value)) {
    //If verification returns true
    firstNameError.classList.add('hide');
    validInput(NameElem);
  } else {
    errorUpdate(NameElem, firstNameError);
    emptyUpdate(NameElem, emptyFirstNameError, firstNameError);
  }
});

NumberElem.addEventListener('input', (e) => {
  if (phoneVerify(NumberElem.value)) {
    phoneError.classList.add('hide');
    validInput(NumberElem);
  } else {
    errorUpdate(NumberElem, phoneError);
    emptyUpdate(NumberElem, emptyPhoneError, phoneError);
  }
});

formElem.addEventListener('input', function(e) {
  formData[e.target.name] = e.target.value;
  LS.setItem('formData', JSON.stringify(formData));
});

if(LS.getItem('formData')){
  formData = JSON.parse(LS.getItem('formData'));
  for(let key in formData){
    formElem.elements[key].value = formData[key];
  }
}
  
formElem.onsubmit = async (e) => {
  e.preventDefault();

  try { 
    const response = await fetch('https://62e271cf3891dd9ba8e865f4.mockapi.io/Su', {
      method: 'POST',
      body: JSON.stringify( formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    
    if(!NameElem.value && !NumberElem.value){
      throw new SyntaxError("No phone number and UserName"); 
    } else if ( !NameElem.value){
      throw new SyntaxError("No UserName"); 
    } else if ( !NumberElem.value){
      throw new SyntaxError("No phone number"); 
    }
     console.log( 'Succses: ', JSON.stringify(json) );
  } catch (error){
    console.log('Error: ', error.message);
  }

  if(!NameElem.value && !NumberElem.value){
    PopupTextInForm.innerHTML =    `Dear Visitor!
                            Please enter your name and number!
                                      Thanks!`;
    popupForm.style.display = "block"; 
  }else if(!NumberElem.value){
    PopupTextInForm.innerHTML = `Dear Visitor!n
                            Please enter your number!
                                    Thanks!`;
    popupForm.style.display = "block";
  }else if(!NameElem.value){
    PopupTextInForm.innerHTML = `Dear Visitor!
                          Please enter your name!
                                  Thanks!`;
    popupForm.style.display = "block";
  } else if (textVerify && phoneVerify){
    PopupTextInForm.innerHTML = `${NameElem.value}, thank you for signing up for a tasting
                                    at our store in the ${selectorElem.value} district.
                                        Our manager will contact you within 10 minutes!`;
    popupForm.style.display = "block";
  }  

  function cleanForm() {
    NameElem.value = '';
    NumberElem.value = '';
  }
  cleanForm();
};

document.getElementById("close__form").addEventListener("click", function(){
popupForm.style.display = "none";
}); 

document.getElementById("popupId__form").addEventListener("click", function(){
popupForm.style.display = "none";
}); 

