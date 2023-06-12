export default class Card {
  constructor(card, photoTemplate, openPopupImage) {
    this._card = card;
    this._name = card.place;
    this._link = card.link;
    this._photoTemplate = photoTemplate;
    this._openPopupImage = openPopupImage;
  }

  _getTemplateClone() {
    return this._photoTemplate.content.querySelector('.element').cloneNode(true)
  }
  // Функция лайка
  _handleLike = (evt) => {
    this._likeButton.classList.toggle('element__main-vector_active');
  }

  // Функция удаления карточки
  _handleDeleteImage = () => {
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  // Показать картинку
  _showCard = () => {
    this._openPopupImage(this._card);
  };


  // Устанавливаем слушатель 
  _setEventListener() {
    this._likeButton.addEventListener('click', this._handleLike); // Слушатель лайка
    this._deleteButton.addEventListener('click', this._handleDeleteImage); // Слушатель крестика
    this._imgEl.addEventListener('click', this._showCard); // Слушатель по клике на картинку
  }


  createNewCard() {
    this._cloneElement = this._getTemplateClone();
    this._imgEl = this._cloneElement.querySelector('.element__mask-group'); // картинка
    this._titleEl = this._cloneElement.querySelector('.element__main-text'); // подпись
    this._deleteButton = this._cloneElement.querySelector('.element__delete');  // крестик удаления
    this._likeButton = this._cloneElement.querySelector('.element__main-vector'); // Клавиша лайка
    this._imgEl.src = this._link;
    this._imgEl.alt = this._name;
    this._titleEl.textContent = this._name;
    this._setEventListener()
    return this._cloneElement
  }
}