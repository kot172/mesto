const editButton = document.querySelector('.profile__edit-Button') // Клавиша редактирования

// Находим форму в DOM
let formElement = document.querySelector('.popup')

let nameInput = document.querySelector('.popup__field_name') // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__field_job') // Воспользуйтесь инструментом .querySelector()

let name = document.querySelector('.profile__name')
let job = document.querySelector('.profile__job')

// Находим поля формы в DOM
function showPopup (evt) {
    formElement.classList.add('popup__opened')
    nameInput.value = name.textContent   // вставили имя
    jobInput.value = job.textContent //вставили джоб
} 
editButton.addEventListener('click', showPopup);

// закрытие
const closeButton = document.querySelector('.popup__button-exit')
function exitButton (evt) {
    formElement.classList.remove('popup__opened') 
}
closeButton.addEventListener('click', exitButton);



function handleFormSubmit (evt) {
    evt.preventDefault(); 
    name.textContent = nameInput.value
    job.textContent = jobInput.value
    exitButton()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
console.log(nameInput.value)


