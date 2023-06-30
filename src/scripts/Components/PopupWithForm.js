import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__info");
    this._inputList = this._form.querySelectorAll(".popup__field");
    this._submitBtn = this._form.querySelector('.popup__button-save');
  }

  //собирает данные для размещения профиля
  _getInputValue() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputsValue(inputValues) {
    this._inputList.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  renderLoading(isLoading){
    if (isLoading) {
      this._submitBtn.value = `${this._submitBtn.value}...`;
    } else {
      this._submitBtn.value = this._defaultSubmitText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValue());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
