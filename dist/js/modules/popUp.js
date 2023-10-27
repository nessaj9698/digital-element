"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var Validator = /*#__PURE__*/function () {
  function Validator() {
    (0, _classCallCheck2["default"])(this, Validator);
    this.errorClass = 'error';
  }
  (0, _createClass2["default"])(Validator, [{
    key: "validateForm",
    value: function validateForm(form) {
      var _this = this;
      var inputs = form.querySelectorAll('.form__input');
      var isValid = true;
      inputs.forEach(function (input) {
        if (!_this.validateField(input)) {
          isValid = false;
        }
      });
      return isValid;
    }
  }, {
    key: "validateField",
    value: function validateField(input) {
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
  }], [{
    key: "validateEmail",
    value: function validateEmail(email) {
      var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    }
  }, {
    key: "showErrorTooltip",
    value: function showErrorTooltip(element, message) {
      var tooltip = element.parentNode.querySelector('.tooltip-wrapper');
      tooltip.innerHTML = message;
      element.parentNode.appendChild(tooltip);
      setTimeout(function () {
        tooltip.innerHTML = '';
      }, 3000);
    }
  }]);
  return Validator;
}();
var Popup = /*#__PURE__*/function () {
  function Popup() {
    var _this2 = this;
    (0, _classCallCheck2["default"])(this, Popup);
    this.formWrapper = document.querySelector('.form-wrapper');
    this.popupForm = document.querySelector('.popup-form');
    this.closeButton = document.querySelector('.popup-form__close-btn');
    this.openButton = document.querySelector('.footer__btn');
    this.openButton.addEventListener('click', function () {
      return _this2.openPopup();
    });
    this.closeButton.addEventListener('click', function () {
      return _this2.closePopup();
    });
    this.formWrapper.addEventListener('click', function (e) {
      if (e.target === _this2.formWrapper) {
        _this2.closePopup();
      }
    });
    this.popupForm.addEventListener('submit', function (e) {
      return _this2.onSubmit(e);
    });
  }
  (0, _createClass2["default"])(Popup, [{
    key: "openPopup",
    value: function openPopup() {
      console.log('clicked');
      this.formWrapper.classList.add('popup-active');
      document.body.classList.add('modal-open');
    }
  }, {
    key: "closePopup",
    value: function closePopup() {
      this.formWrapper.classList.remove('popup-active');
      document.body.classList.remove('modal-open');
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();
      var validator = new Validator();
      if (validator.validateForm(this.popupForm)) {
        // Если форма валидна, меняем содержимое формы
        this.popupForm.innerHTML = '<p class="form__success">Your message successfully sent</p>';
      }
    }
  }]);
  return Popup;
}();
var popup = new Popup();