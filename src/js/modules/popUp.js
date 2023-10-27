class Validator {
  constructor() {
    this.errorClass = 'error';
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('.form__input');
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(input) {
    if (input.type === 'email') {
      if (!this.validateEmail(input.value) || !input.value.trim()) {
        input.classList.add(this.errorClass);
        this.showErrorTooltip(input, 'Please enter a valid email address');
        return false;
      }
    } else if (!input.value.trim()) {
      input.classList.add(this.errorClass);
      this.showErrorTooltip(input, 'This field is required');
      return false;
    } else {
      input.classList.remove(this.errorClass);
    }

    return true;
  }

  static validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  static showErrorTooltip(element, message) {
    const tooltip = element.parentNode.querySelector('.tooltip-wrapper');
    tooltip.innerHTML = message;
    element.parentNode.appendChild(tooltip);

    setTimeout(() => {
      tooltip.innerHTML = '';
    }, 3000);
  }
}

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
    }
  }
}

const popup = new Popup();
