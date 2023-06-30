// import { activateButton, disableButton } from './validate.js';
import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Api from "../scripts/components/Api.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete.js";
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
  editBtnAvatar,
  popupAvatar,
  popupDelete,
  editAvatar,
} from "../scripts/utils/constants.js";

let userId;
const userInfo = new UserInfo(configInfo);

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
    authorization: "35294db3-72ed-4381-957a-6db1f54d4026",
    "Content-Type": "application/json",
  },
});

// Открытие попап редактирование нэйма
editButton.addEventListener("click", () => {
  formPersonalDataValidator.resetErrorForm();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
});

editBtnAvatar.addEventListener("click", () => {
  formAvatarValidator.resetErrorForm();
  popupAvatarEdit.open();
});

const popupAvatarEdit = new PopupWithForm(popupAvatar, (formData) => {
  popupAvatarEdit.renderLoading(true);
  api
    .editUserAvatar(formData.avatar)
    .then((res) => {
      userInfo.setUserAvatar({
        username: res.name,
        job: res.about,
        avatar: res.avatar,
      });
      popupAvatarEdit.close();
    })
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => popupAvatarEdit.renderLoading(false));
});

popupAvatarEdit.setEventListeners();

//Открытие попап с добавлением карточек
addButton.addEventListener("click", () => {
  addCardsForm.reset();
  formAddCardValidator.resetErrorForm();
  popupAddCard.open();
});

function createCard(element) {
  const card = new Card(
    element,
    photoTemplate,
    popupImage.open,
    (likeElement, cardId) => {
      if (likeElement.classList.contains("element__main-vector_active")) {
        api
          .deleteLike(element._id)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((error) => console.error(`ошибка при снятии лайка ${error}`));
      } else {
        api
          .addLike(element._id)
          .then((res) => {

            card.toggleLike(res.likes);
          })
          .catch((error) =>
            console.error(`ошибка при добавлении лайка ${error}`)
          );
      }
    },
    userId,
    popupDeleteCard.open
  );
  return card.createNewCard();
}

// отрисовываем элементы на стр
const section = new Section(
  {
    items: initialCards,
    renderer: (element) => createCard(element)
  },
  gridPhotoList
);

// формы
const popupProfile = new PopupWithForm(popupProfileSelector, (formData) => {
  popupProfile.renderLoading(true);
  api.editUserInfo(formData)
  .then(res => {
    userInfo.setUserInfo({
    name: res.name, 
      job: res.about, 
      avatar: res.avatar });
  
  popupProfile.close();
})
.catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => popupProfile.renderLoading(false));
});

popupProfile.setEventListeners();

const popupDeleteCard = new PopupWithDelete(
  ".delete-popup",
  ({ card, cardId }) => {
    popupDeleteCard.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        popupDeleteCard.close();
        console.log(popupDeleteCard.close());
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally(() => popupDeleteCard.renderLoading(false));
  }
);

popupDeleteCard.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, (formData) => {
  api.addCard(formData)
    .then((dataCard) => {
      dataCard.myid = userId;
      section.addItem(section.renderer(dataCard));
      popupAddCard.close();
    })
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => popupAddCard.renderLoading(false));
});

popupAddCard.setEventListeners();

// Запуск валидации
const formPersonalDataValidator = new FormValidator(validationConfig, formPersonalDataElement);
formPersonalDataValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, editAvatar);
formAvatarValidator.enableValidation();

const formAddCardValidator = new FormValidator(validationConfig, addCardsForm);
formAddCardValidator.enableValidation();

Promise.all([api.getInfo(), api.getCards()]).then(([dataUser, dataCard]) => {
  dataCard.forEach((element) => (element.myid = dataUser._id));
  userId = dataUser._id;
  userInfo.setUserInfo({
    name: dataUser.name,
    job: dataUser.about,
    avatar: dataUser.avatar,
  });
  userInfo.setUserAvatar(dataUser.avatar);
  section.renderItems(dataCard);
});
