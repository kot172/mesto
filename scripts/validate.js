//Показать ошибку
const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__error-active');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

const resetError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('popup__error-active');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};
const checkValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        resetError(formElement, inputElement);
    }
};

const setEventListener = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const submitBtn = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputList, submitBtn, obj);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkValidity(formElement, inputElement);
            toggleButtonState(inputList, submitBtn, obj);
        });
    });
};

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListener(formElement, obj);
    });
};

function hasIvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

export const activateButton = (buttonElement, obj) => {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
}

export const disableButton = (buttonElement, obj) => {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
}

function toggleButtonState(inputList, buttonElement, obj) {
    if (hasIvalidInput(inputList)) {
        disableButton(buttonElement, obj);
    } else {
        activateButton(buttonElement, obj);
    }
}

enableValidation({
    formSelector: '.popup__info',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__error',
    errorClass: 'popup__error_visible',
});
