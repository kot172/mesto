export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__button-exit');
    }

    _handleEscPress = (evt) => {
        if (evt.key === 'Escape') {
            this.popupClose()
        }
    }

    _handleCloseButton = () => {
        this.popupClose()
    }

    _handlePopupClick = (evt) => {
        const openedPopup = evt.currentTarget;
        if (evt.target === evt.currentTarget) {
            this.popupClose()
        }
    }

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', this._handleCloseButton);
        this._popup.addEventListener('click', this._handlePopupClick)
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscPress);
    }

    popupClose() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscPress);
    }
}