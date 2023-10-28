import Validator from './validator';

class Popup {
  constructor() {
    this.formWrapper = document.querySelector('.form-wrapper');
    this.popupForm = document.querySelector('.popup-form');
    this.closeButton = document.querySelector('.popup-form__close-btn');
    this.openButton = document.querySelector('.footer__btn');

    this.openButton.addEventListener('click', () => this.openPopup());
    this.closeButton.addEventListener('click', () => this.closePopup());
    this.formWrapper.addEventListener('click', (e) => {
      if (e.target === this.formWrapper) {
        this.closePopup();
      }
    });
    this.popupForm.addEventListener('submit', (e) => this.onSubmit(e));
  }

  openPopup() {
    this.formWrapper.classList.add('popup-active');
    document.body.classList.add('modal-open');
  }

  closePopup() {
    this.formWrapper.classList.remove('popup-active');
    document.body.classList.remove('modal-open');
  }

  onSubmit(e) {
    e.preventDefault();
    const validator = new Validator();
    if (validator.validateForm(this.popupForm)) {
      // Если форма валидна, меняем содержимое формы
      this.popupForm.innerHTML = '<p class="form__success">Your message successfully sent</p>';
      setTimeout(() => {
        this.closePopup();
      }, 3000);
    }
  }
}

const popup = new Popup();
