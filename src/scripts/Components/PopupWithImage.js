import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._openPopupImage = this._popup.querySelector('.popup__image');
        this._imageHeading = this._popup.querySelector('.popup__heading');
    }

    open = (Card) => {
        this._openPopupImage.src = Card.link;
        this._openPopupImage.alt = Card.place;
        this._imageHeading.textContent = Card.place;
        super.open()
    }
}
