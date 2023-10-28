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

  validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  showErrorTooltip(element, message) {
    const tooltip = element.parentNode.querySelector('.tooltip-wrapper');
    tooltip.innerHTML = message;
    element.parentNode.appendChild(tooltip);

    setTimeout(() => {
      tooltip.innerHTML = '';
    }, 3000);
  }
}

export default Validator;
