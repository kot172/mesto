const initialCards = [
  {
    place: "Тюмень",
    link: "https://images.unsplash.com/photo-1621878983992-bac95a1e8dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80",
  },
  {
    place: "Казань",
    link: "https://sportishka.com/uploads/posts/2022-04/1650703214_61-sportishka-com-p-gorodskoi-okrug-gorod-kazan-krasivo-foto-64.jpg",
  },
  {
    place: "Челябинская область",
    link: "https://uralpress.ru/sites/default/files/200903_12.jpg",
  },
  {
    place: "Алтайский край",
    link: "https://i01.fotocdn.net/s132/9a48b8b2506a3205/public_pin_l/2965567406.jpg",
  },
  {
    place: "Свердловская область",
    link: "https://pibig.info/uploads/posts/2022-11/1669323198_1-pibig-info-p-uralskii-mars-pod-bogdanovichem-krasivo-1.jpg",
  },
  {
    place: "Дагестан",
    link: "https://vsegda-pomnim.com/uploads/posts/2022-04/1649123676_28-vsegda-pomnim-com-p-dagestan-dostoprimechatelnosti-prirodnie-f-28.jpg",
  },
];

const popupProfileSelector = ".profile-popup";
const popupAddCardSelector = ".photo-popup";
const popupImageSelector = ".images-popup";
const gridPhotoList = ".elements";
const popupAvatar = ".avatar-popup";
const popupDelete = ".delete-popup"
const userId = "322e5216bbc96ee2ee0cb16b"


const configInfo = {
  name: ".profile__name",
  job: ".profile__job",
  avatar: ".profile__avatar",
};

const validationConfig = {
  formSelector: ".popup__info",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__error-active",
  errorClass: "popup__error_visible",
};

const editButton = document.querySelector(".profile__edit-button"); // Клавиша редактирования
const editBtnAvatar = document.querySelector(".profile__avatar-edit"); // Клавиша ред.аватара
const addButton = document.querySelector(".profile__rectangle"); // Клавиша добавления
const popupImages = document.querySelector(".images-popup");
const cardPopupp = document.querySelector(".photo-popup"); // Нашел форму с добавлением картинок
const photoTemplate = document.querySelector(".element_template"); // Нашли card
const formPersonalDataElement = document.forms.editProfile;
const addCardsForm = document.forms["cardProfile"];
const editAvatar = document.forms["AvatarProfile"];

export {
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
  editAvatar,
};
