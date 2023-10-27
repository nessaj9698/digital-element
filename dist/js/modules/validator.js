"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
    this.errorClass = "error";
  }
  _createClass(Validator, [{
    key: "validateForm",
    value: function validateForm(form) {
      var _this = this;
      var inputs = form.querySelectorAll(".form__input");
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
      if (input.type === "email") {
        if (!this.validateEmail(input.value) || !input.value.trim()) {
          input.classList.add(this.errorClass);
          this.showErrorTooltip(input, "Please enter a valid email address");
          return false;
        }
      } else if (!input.value.trim()) {
        input.classList.add(this.errorClass);
        this.showErrorTooltip(input, "This field is required");
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
      var tooltip = element.parentNode.querySelector(".tooltip-wrapper");
      tooltip.innerHTML = message;
      element.parentNode.appendChild(tooltip);
      setTimeout(function () {
        tooltip.innerHTML = "";
      }, 3000);
    }
  }]);
  return Validator;
}();
var _default = exports["default"] = Validator;