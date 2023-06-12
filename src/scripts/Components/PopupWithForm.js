import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.popup__info')
        this._inputList = this._form.querySelectorAll('.popup__field')
    }

//собирает данные для размещения профиля
    getInputValue() {
        this._values = {};
        this._inputList.forEach(input => {
            this._values[input.name] = input.value
        })
        return this._values
    }

    setInputsValue(inputValues) {
        this._inputList.forEach(input => {
            input.value = inputValues[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitFunction)
    }

    popupClose() {
        super.close();
        this._form.reset();
    }

}

