import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._openPopupImage = this._popup.querySelector('.popup__image');
        this._imageHeading = this._popup.querySelector('.popup__heading');
    }

    open = (card) => {
        this._openPopupImage.src = card.link;
        this._openPopupImage.alt = card.place;
        this._imageHeading.textContent = card.place;
        super.open()
    }
}
