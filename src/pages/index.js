// import { activateButton, disableButton } from './validate.js';
import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm";
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
  addCardsForm,
} from "../scripts/utils/constants.js";

const userInfo = new UserInfo(configInfo);

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

// Открытие попап редактирование нэйма
editButton.addEventListener("click", () => {
  formPersonalDataValidator.resetErrorForm();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
});

//Открытие попап с добавлением карточек
addButton.addEventListener("click", () => {
  addCardsForm.reset();
  formAddCardValidator.resetErrorForm();
  popupAddCard.open();
});

// отрисовываем элементы на стр
const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const card = new Card(element, photoTemplate, popupImage.open);
      return card.createNewCard();
    },
  },
  gridPhotoList
);

section.renderItems();

// формы
const popupProfile = new PopupWithForm(popupProfileSelector, (formData) => {
  userInfo.setUserInfo(formData);
  popupProfile.close();
});

popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (formData) => {
  section.addItem(section.renderer(formData));
  popupAddCard.close();
});

popupAddCard.setEventListeners();

// Запуск валидации
const formPersonalDataValidator = new FormValidator(
  validationConfig,
  formPersonalDataElement
);
formPersonalDataValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, addCardsForm);
formAddCardValidator.enableValidation();

// formElement.addEventListener('submit', handleProfileFormSubmit);
