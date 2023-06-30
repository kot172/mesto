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
  userId,
  popupDelete,
} from "../scripts/utils/constants.js";

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
  popupAvatarEdit.open();
});

const popupAvatarEdit = new PopupWithForm(popupAvatar, (formData) => {
  api.editUserAvatar(formData.avatar);
  userInfo.setUserAvatar(formData.avatar);
  popupAvatarEdit.close();
});

popupAvatarEdit.setEventListeners();

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
      const card = new Card(
        element,
        photoTemplate,
        popupImage.open,
        (likeElement, cardId) => {
          if (likeElement.classList.contains("element__main-vector_active")) {
            api
              .deleteLike(element._id)
              .then((res) => {
                console.log(res);
                card.toggleLike(res.likes);
              })
              .catch((error) =>
                console.error(`ошибка при снятии лайка ${error}`)
              );
          } else {
            api
              .addLike(element._id)
              .then((res) => {
                console.log(res);

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
    },
  },
  gridPhotoList
);

// формы
const popupProfile = new PopupWithForm(popupProfileSelector, (formData) => {
  userInfo.setUserInfo(formData);
  api.editUserInfo(formData);
  popupProfile.close();
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
  Promise.all([api.getInfo(), api.addCard(formData)]).then(
    ([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      section.addItem(section.renderer(dataCard));
      popupAddCard.close();
    }
  );
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

Promise.all([api.getInfo(), api.getCards()]).then(([dataUser, dataCard]) => {
  dataCard.forEach((element) => (element.myid = dataUser._id));
  userInfo.setUserInfo({
    name: dataUser.name,
    job: dataUser.about,
    avatar: dataUser.avatar,
  });
  userInfo.setUserAvatar(dataUser.avatar);
  section.renderItems(dataCard);
});
