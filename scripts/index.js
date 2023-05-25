// import { activateButton, disableButton } from './validate.js';
import { initialCards } from './constants.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

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
const formPersonalDataElement = document.forms.editProfile
const nameInput = document.querySelector('.popup__field_type_name')
const jobInput = document.querySelector('.popup__field_type_job')
const placeInput = document.querySelector('.popup__field_type_place')
const addCardsForm = document.forms['cardProfile']
const linkInput = document.querySelector('.popup__field_type_link')
const name = document.querySelector('.profile__name')
const job = document.querySelector('.profile__job')



const activateButton = (buttonElement, obj) => {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
}

const disableButton = (buttonElement, obj) => {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const validationConfig = {
  formSelector: '.popup__info',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__error-active',
  errorClass: 'popup__error_visible',
};

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  popupElement.addEventListener('click', handlePopupClick);
  document.addEventListener('keydown', handleEscPress);
}

const handlePopupClick = (evt) => {
  const openedPopup = evt.currentTarget;
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
  formPersonalDataValidator.resetErrorForm()
  openPopup(formElement)
  nameInput.value = name.textContent   // вставили имя
  jobInput.value = job.textContent //вставили джоб
});

addButton.addEventListener('click', () => {
  addCardsForm.reset()
  formAddCardValidator.resetErrorForm()
  openPopup(cardPopupp)
})

closeButton.addEventListener('click', () => hidePopup(formElement));
closeButtonPlace.addEventListener('click', () => hidePopup(cardPopupp));
closePopupImages.addEventListener('click', () => hidePopup(popupImages));

const openPopupImage = (card) => {
  popupImagesContent.src = card.link;
  popupImagesContent.alt = card.name;
  popupImagesParagraph.textContent = card.name;
  openPopup(popupImages);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  hidePopup(formElement);
}

// добавление карточки в контейнер
function addCard(container, card) {
  container.prepend(card);
}

cardPopupp.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const groupCard = { name: placeInput.value, link: linkInput.value }
  const card = new Card(groupCard, photoTemplate, openPopupImage)
  addCard(gridPhoto, card.createNewCard())
  hidePopup(cardPopupp)
})

//загрузка карт в контейнер
initialCards.forEach(element => {
  const card = new Card(element, photoTemplate, openPopupImage);
  addCard(gridPhoto, card.createNewCard())
})

const formPersonalDataValidator = new FormValidator(validationConfig, formPersonalDataElement);
formPersonalDataValidator.enableValidation()

const formAddCardValidator = new FormValidator(validationConfig, addCardsForm);
formAddCardValidator.enableValidation()

formElement.addEventListener('submit', handleProfileFormSubmit);