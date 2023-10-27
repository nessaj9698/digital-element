"use strict";

var _validator = _interopRequireDefault(require("./validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Popup = /*#__PURE__*/function () {
  function Popup() {
    var _this = this;
    _classCallCheck(this, Popup);
    this.formWrapper = document.querySelector('.form-wrapper');
    this.popupForm = document.querySelector('.popup-form');
    this.closeButton = document.querySelector('.popup-form__close-btn');
    this.openButton = document.querySelector('.footer__btn');
    this.openButton.addEventListener('click', function () {
      return _this.openPopup();
    });
    this.closeButton.addEventListener('click', function () {
      return _this.closePopup();
    });
    this.formWrapper.addEventListener('click', function (e) {
      if (e.target === _this.formWrapper) {
        _this.closePopup();
      }
    });
    this.popupForm.addEventListener('submit', function (e) {
      return _this.onSubmit(e);
    });
  }
  _createClass(Popup, [{
    key: "openPopup",
    value: function openPopup() {
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
      var validator = new _validator["default"]();
      if (validator.validateForm(this.popupForm)) {
        // Если форма валидна, меняем содержимое формы
        this.popupForm.innerHTML = '<p class="form__success">Your message successfully sent</p>';
      }
    }
  }]);
  return Popup;
}();
var popup = new Popup();