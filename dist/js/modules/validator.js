"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var _default = exports["default"] = Validator;