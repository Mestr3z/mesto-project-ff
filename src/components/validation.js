const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};

const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(configValidation.errorClass);
};

const checkInputValidity = (formElement, inputElement, configValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputSelector)
  );
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, configValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(configValidation.inactiveButtonClass)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(configValidation.inactiveButtonClass);
  }
}

export const enableValidation = (configValidation) => {
  const formList = Array.from(
    document.querySelectorAll(configValidation.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
};

export const clearValidation = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector))
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configValidation)
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configValidation)
  })
}
