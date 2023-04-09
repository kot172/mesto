const editButton = document.querySelector('.profile__editButton') // Клавиша редактирования

// Находим форму в DOM
let formElement = document.querySelector('.popup')

let nameInput = document.querySelector('.popup__name') // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__job') // Воспользуйтесь инструментом .querySelector()

let name = document.querySelector('.profile__name')
let job = document.querySelector('.profile__job')

// Находим поля формы в DOM
function showPopup (evt) {
    evt.preventDefault();
    formElement.classList.toggle('popup__opened')
    nameInput.value = (name.textContent)   // вставили имя
    jobInput.value = (job.textContent) //вставили джоб
} 
editButton.addEventListener('click', showPopup);

// закрытие
const closeButton = document.querySelector('.popup__button-exit')
function exitButton (evt) {
    evt.preventDefault ();
    formElement.classList.toggle('popup__opened') 
}
closeButton.addEventListener('click', exitButton);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    name.textContent = (nameInput.value)
    job.textContent = (jobInput.value)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
console.log(nameInput.value)


