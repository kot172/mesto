import { activateButton, disableButton } from './validate.js'
import { initialCards } from './constants.js';
const editButton = document.querySelector('.profile__edit-button') // Клавиша редактирования
const addButton = document.querySelector('.profile__rectangle')  // Клавиша добавления
const popupImages = document.querySelector('.images-popup');
const closePopupImages = popupImages.querySelector('.popup__button-exit_image');
const buttonSave = document.querySelector('.popup__button-save')
const popupImagesContent = popupImages.querySelector('.popup__image');
const popupImagesParagraph = popupImages.querySelector('.popup__heading');

// Находим форму в DOM
const formElement = document.querySelector('.profile-popup')  // Нашел форму с именем и фамилией
const cardPopupp = document.querySelector('.photo-popup')  // Нашел форму с добавлением картинок
const closeButtonPlace = cardPopupp.querySelector('.popup__button-exit_card') // клавиша закрытия попапа
const gridPhoto = document.querySelector('.elements')  // Нашли блок фото
const photoTemplate = document.querySelector('.element_template') // Нашли card
const likeCard = document.querySelector('.element__main-vector') // Нашли like
const nameInput = document.querySelector('.popup__field_type_name')
const jobInput = document.querySelector('.popup__field_type_job')
const placeInput = document.querySelector('.popup__field_type_place')
const linkInput = document.querySelector('.popup__field_type_link')
const name = document.querySelector('.profile__name')
const job = document.querySelector('.profile__job')

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  popupElement.addEventListener('click', handlePopupClick);
  document.addEventListener('keydown', handleEscPress);
}

const handlePopupClick = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    hidePopup(openedPopup);
  }
};
const handleEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    hidePopup(openedPopup);
  }
};

// закрытие
const closeButton = formElement.querySelector('.popup__button-exit_profile')
function hidePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  popupElement.removeEventListener('click', handlePopupClick);
  document.removeEventListener('keydown', handleEscPress);
}

editButton.addEventListener('click', () => {
  openPopup(formElement)
  activateButton(formElement.querySelector('.popup__button-save'), { inactiveButtonClass: 'popup__button_disabled' })
  nameInput.value = name.textContent   // вставили имя
  jobInput.value = job.textContent //вставили джоб
});

addButton.addEventListener('click', () => {
  openPopup(cardPopupp)
  disableButton(cardPopupp.querySelector('.popup__button-save'), { inactiveButtonClass: 'popup__button_disabled' })
})

closeButton.addEventListener('click', () => hidePopup(formElement));
closeButtonPlace.addEventListener('click', () => hidePopup(cardPopupp));
closePopupImages.addEventListener('click', () => hidePopup(popupImages));
const resetFormInputs = () => {
  placeInput.value = ''
  linkInput.value = ''
}
function createNewCards(card) {
  const newEl = photoTemplate.content.querySelector('.element').cloneNode(true)
  const imgEl = newEl.querySelector('.element__mask-group')
  const titleEl = newEl.querySelector('.element__main-text')
  const deleteButton = newEl.querySelector('.element__delete')
  const likeButton = newEl.querySelector('.element__main-vector') // Клавиша лайка
  titleEl.textContent = card.name
  imgEl.alt = card.name
  imgEl.src = card.link
  document.getElementById('CardProfile').reset();

  const handleDeleteImage = () => {
    newEl.remove()
  }
  deleteButton.addEventListener('click', handleDeleteImage)

  const handleLike = () => {
    likeButton.classList.toggle('element__main-vector_active')
  }
  likeButton.addEventListener('click', handleLike);
  imgEl.addEventListener('click', () => {
    openPopupImage(card);
  });
  return newEl
}

initialCards.forEach((card) => {
  const element = createNewCards(card)
  gridPhoto.appendChild(element)
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  hidePopup(formElement);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

cardPopupp.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const groupCard = { name: placeInput.value, link: linkInput.value }
  const element = createNewCards(groupCard)
  gridPhoto.prepend(element)
  hidePopup(cardPopupp)
})

const openPopupImage = (card) => {
  popupImagesContent.src = card.link;
  popupImagesContent.alt = card.name;
  popupImagesParagraph.textContent = card.name;
  openPopup(popupImages);
};