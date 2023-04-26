const editButton = document.querySelector('.profile__edit-button') // Клавиша редактирования
const addButton = document.querySelector('.profile__rectangle')  // Клавиша добавления
const popupImages = document.querySelector('.images-popup');
const closePopupImages = popupImages.querySelector('.popup__button-exit_image');
const popupImagesContent = popupImages.querySelector('.popup__image');
const popupImagesParagraph = popupImages.querySelector('.popup__heading');

// Находим форму в DOM
let formElement = document.querySelector('.profile-popup')  // Нашел форму с именем и фамилией
let cardPopupp = document.querySelector('.photo-popup')  // Нашел форму с добавлением картинок
let closeButtonPlace = cardPopupp.querySelector('.popup__button-exit') // клавиша закрытия попапа
let gridPhoto = document.querySelector('.elements')  // Нашли блок фото
let photoTemplate = document.querySelector('.element_template') // Нашли card
let likeCard = document.querySelector('.element__main-vector') // Нашли like
let nameInput = document.querySelector('.popup__field_type_name')
let jobInput = document.querySelector('.popup__field_type_job')
let placeInput = document.querySelector('.popup__field_type_place')
let linkInput = document.querySelector('.popup__field_type_link')
let name = document.querySelector('.profile__name')
let job = document.querySelector('.profile__job')

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened')
}

editButton.addEventListener('click', () => {
  openPopup(formElement)
  nameInput.value = name.textContent   // вставили имя
  jobInput.value = job.textContent //вставили джоб
});

addButton.addEventListener('click', () => {
  openPopup(cardPopupp)
})

// закрытие
const closeButton = document.querySelector('.popup__button-exit')
function exitButton(popupElement) {
  popupElement.classList.remove('popup_opened')
}
closeButton.addEventListener('click', () => exitButton(formElement));
closeButtonPlace.addEventListener('click', () => exitButton(cardPopupp));
closePopupImages.addEventListener('click', () => exitButton(popupImages));


function createNewCards(card) {
  const newEl = photoTemplate.content.querySelector('.element').cloneNode(true)
  const imgEl = newEl.querySelector('.element__mask-group')
  const titleEl = newEl.querySelector('.element__main-text')
  const deleteButton = newEl.querySelector('.element__delete')
  const likeButton = newEl.querySelector('.element__main-vector') // Клавиша лайка
  titleEl.textContent = card.name
  imgEl.src = card.link

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


function handleFormSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value
  job.textContent = jobInput.value
  exitButton()
}

formElement.addEventListener('submit', handleFormSubmit);

cardPopupp.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const groupCard = { name: placeInput.value, link: linkInput.value }
  const element = createNewCards(groupCard)
  gridPhoto.prepend(element)
  exitButton(cardPopupp)
})

const openPopupImage = (card) => {
  popupImagesContent.src = card.link;
  popupImagesContent.alt = card.name;
  popupImagesParagraph.textContent = card.name;
  openPopup(popupImages);
};