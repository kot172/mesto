export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._submitBtn = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  }

  _showInputError(errorElement, input) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(errorElement, input) {
    input.classList.remove(this._inputErrorClass);
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _activateButton() {
    this._submitBtn.classList.remove(this._inactiveButtonClass);
    this._submitBtn.disabled = false;
  }

  _disableButton() {
    this._submitBtn.classList.add(this._inactiveButtonClass);
    this._submitBtn.disabled = true;
  }

  _hasIvalidInput() {
    return Array.from(this._inputList).every((input) => input.validity.valid);
  }

  _toggleButtonState() {
    this._hasIvalidInput()
      ? this._activateButton()
      : this._disableButton(this._submitBtn);
  }

  _checkValidity(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.validity.valid
      ? this._hideInputError(errorElement, input)
      : this._showInputError(errorElement, input);
  }

  _setEventListener() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListener();
  }

  resetErrorForm() {
    this._inputList.forEach((input) => {
      const errorElement = this._form.querySelector(
        `${this._inputErrorClass}${input.name}`
      );
      if (!input.validity.valid) {
        this._hideInputError(errorElement, input);
      }
    });
    this._disableButton();
  }
}
