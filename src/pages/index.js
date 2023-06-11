// import { activateButton, disableButton } from './validate.js';
import './index.css';
import FormValidator from '../scripts/Components/FormValidator.js';
import Card from '../scripts/Components/Card.js';
import PopupWithImage from '../scripts/Components/PopupWithImage.js';
import Section from '../scripts/Components/Section.js';
import UserInfo from '../scripts/Components/UserInfo.js';
import PopupWithForm from '../scripts/Components/PopupWithForm.js';
import {
  initialCards,
  popupProfileSelector,
  popupAddCardSelector,
  popupImageSelector,
  gridPhotoList,
  configInfo,
  validationConfig,
  editButton,
  addButton,
  popupImages,
  cardPopupp,
  photoTemplate,
  formPersonalDataElement,
  addCardsForm
} from '../scripts/Utils/constants.js';

const userInfo = new UserInfo(configInfo);

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners()

const activateButton = (buttonElement, obj) => {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
}

const disableButton = (buttonElement, obj) => {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
  popupElement.addEventListener('click', handlePopupClick);
  document.addEventListener('keydown', handleEscPress);
}

// Открытие попап редактирование нэйма
editButton.addEventListener('click', () => {
  formPersonalDataValidator.resetErrorForm()
  popupProfile.setInputsValue(userInfo.getUserInfo())
  popupProfile.open()
});

//Открытие попап с добавлением карточек
addButton.addEventListener('click', () => {
  addCardsForm.reset()
  formAddCardValidator.resetErrorForm()
  popupAddCard.open()
})

// отрисовываем элементы на стр
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, photoTemplate, popupImage.open)
    return card.createNewCard()
  }
}, gridPhotoList)

section.addCardFromArray()

// формы
const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValue());
  popupProfile.popupClose();
})

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValue()))
  popupAddCard.popupClose();
})

popupAddCard.setEventListeners()


// Запуск валидации
const formPersonalDataValidator = new FormValidator(validationConfig, formPersonalDataElement);
formPersonalDataValidator.enableValidation()

const formAddCardValidator = new FormValidator(validationConfig, addCardsForm);
formAddCardValidator.enableValidation()

// formElement.addEventListener('submit', handleProfileFormSubmit);