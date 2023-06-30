export default class Card {
  constructor(
    card,
    photoTemplate,
    openPopupImage,
    changeLike,
    userId,
    openDeletePopup
  ) {
    this._card = card;
    this._link = card.link;
    this._name = card.name;
    this._myId = userId;
    this._ownerId = card.owner._id;
    this._likes = card.likes;
    this._cardId = card._id;
    this._likesLength = card.likes.length;
    this._photoTemplate = photoTemplate;
    this._openPopupImage = openPopupImage;
    this._changeLike = changeLike;
    this._openDeletePopup = openDeletePopup;
    this._cloneElement = this._getTemplateClone();
    this._imgEl = this._cloneElement.querySelector(".element__mask-group"); // картинка
    this._titleEl = this._cloneElement.querySelector(".element__main-text"); // подпись
    this._deleteButton = this._cloneElement.querySelector(".element__delete"); // крестик удаления
    this._likeButton = this._cloneElement.querySelector(
      ".element__main-vector"
    ); // Клавиша лайка
    this._counter = this._cloneElement.querySelector(".element__count");
  }

  _getTemplateClone() {
    return this._photoTemplate.content
      .querySelector(".element")
      .cloneNode(true);
  }
  // Функция лайка
  _handleLike = (evt) => {
    // this._likeButton.classList.toggle("element__main-vector_active");
    this._changeLike(this._likeButton, this._cardId);
  };

  // Функция удаления карточки
  removeCard = () => {
    this._cloneElement.remove();
    this._cloneElement = null;
  };

  // Показать картинку
  _showCard = () => {
    this._openPopupImage(this._card);
  };

  _openDelete = () => {
    this._openDeletePopup({ card: this, cardId: this._cardId });
  };

  // Устанавливаем слушатель
  _setEventListener() {
    this._likeButton.addEventListener("click", this._handleLike); // Слушатель лайка
    this._deleteButton.addEventListener("click", this._openDelete); // Слушатель крестика
    this._imgEl.addEventListener("click", this._showCard); // Слушатель по клике на картинку
  }

  _changeVisibleForDelete() {
      if ( this._myId !== this._ownerId) {
        this._deleteButton.remove();
      }
  }

  _checkCountLike() {
    this._likes.forEach((item) => {
      if (item._id === this._myId) {
        this._likeButton.classList.add("element__main-vector_active");
        return;
      }
    });
    this._counter.textContent = this._likesLength;
  }

  toggleLike(likes) {
    this._likeButton.classList.toggle("element__main-vector_active");
    this._counter.textContent = likes.length;
  }

  createNewCard() {
    this._imgEl.src = this._link;
    this._imgEl.alt = this._name;
    this._titleEl.textContent = this._name;
    this._checkCountLike();
    this._changeVisibleForDelete();
    this._setEventListener();
    return this._cloneElement;
  }
}
