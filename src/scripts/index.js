import "../pages/index.css";
import { createCard, handleLikeCard } from "../components/card";
import {
  openPopup,
  setClosePopupEventListeners,
  closePopup,
} from "../components/modal";
import { enableValidation, clearValidation } from "../components/validation";
import {
  handleDeleteCard,
  sendUserDataServer,
  sendUserAvatarServer,
  getInitialCards,
  postCard,
  getUserInfo,
} from "../components/api.js";
//попап с редактированием имени и сферы деятельности
const editPopup = document.querySelector(".popup_type_edit");

//кнопка открытия попапа с редактированием имени и сферы деятельности
const editButton = document.querySelector(".profile__edit-button");

// поля формы editPopup
const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");

export let userId = "";

//элементы имени, аватара и сферы деятельности
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
//узел
const cardsContainer = document.querySelector(".places__list");

//попап добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");

//попап с картинкой
const imagePopup = document.querySelector(".popup_type_image");

//Попап с аватаром
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarPopupInput = document.querySelector(".popup__input_type_avatar");

//инпут названия карточки
const popupAddCardNameInput = document.querySelector(
  ".popup__input_type_card-name"
);

//попап изображения карточки
const popupImageLink = document.querySelector(".popup__image");
const popupImageDescription = document.querySelector(".popup__caption");

//инпут ссылки на картинку
const popupAddCardLinkInput = document.querySelector(".popup__input_type_url");

//кнопка открытия попапа с добавлением новой карточки на страницу
const addButton = document.querySelector(".profile__add-button");

export const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "d3146c36-d302-4c3a-a516-c0ba96e51301",
    "Content-Type": "application/json",
  },
};

const initialDataRequestPromises = [getUserInfo(), getInitialCards()];

const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popups = document.querySelectorAll(".popup");
popups.forEach((el) => {
  setClosePopupEventListeners(el);
});

//функция открытия попапа с изображением
function handleImagePopupOpen(data) {
  popupImageDescription.textContent = data.name;
  popupImageLink.alt = data.name;
  popupImageLink.src = data.link;
  openPopup(imagePopup);
}

//функция создания новой карточки
function addCard(evt) {
  evt.preventDefault();
  renderLoading(addCardPopup, "Сохранение...");
  const newCard = {};
  newCard.name = popupAddCardNameInput.value;
  newCard.link = popupAddCardLinkInput.value;

  postCard(newCard)
    .then((res) => {
      cardsContainer.prepend(
        createCard(res, handleImagePopupOpen, handleDeleteCard, handleLikeCard)
      );
      popupAddCardNameInput.value = "";
      popupAddCardLinkInput.value = "";
      closePopup(addCardPopup);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    })
    .finally(() => {
      renderLoading(addCardPopup, "Сохранить");
    });
}

function editProfileData(evt) {
  evt.preventDefault();
  renderLoading(editPopup, "Сохранение...");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  sendUserDataServer(profileName.textContent, profileJob.textContent)
    .then(() => {
      closePopup(editPopup);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    })
    .finally(() => {
      renderLoading(editPopup, "Сохранить");
    });
}

function sendUserAvatar(evt) {
  evt.preventDefault();
  renderLoading(avatarPopup, "Сохранение...");
  sendUserAvatarServer(avatarPopupInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url("${res.avatar}")`;
      avatarPopupInput.value = "";
      closePopup(avatarPopup);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    })
    .finally(() => {
      renderLoading(avatarPopup, "Сохранить");
    });
}

function renderLoading(popup, saving) {
  popup.querySelector(configValidation.submitButtonSelector).textContent =
    saving;
}

//обработчики сабмита форм
addCardPopup.addEventListener("submit", (evt) => {
  addCard(evt);
});

editPopup.addEventListener("submit", (evt) => {
  editProfileData(evt);
});

profileAvatar.addEventListener("click", () => {
  openPopup(avatarPopup);
  clearValidation(avatarPopup, configValidation);
});

//слушатель на кнопку открытия попапа с добавлением новой карточки
addButton.addEventListener("click", function () {
  openPopup(addCardPopup);
  clearValidation(addCardPopup, configValidation);
});

//слушатель на кнопку открытия попапа с редактирование имени
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
  clearValidation(editPopup, configValidation);
});

avatarPopup.addEventListener("submit", (evt) => {
  sendUserAvatar(evt);
});

//Загружаем данные о пользователе и карточки на страницу
Promise.all(initialDataRequestPromises).then((data) => {
  profileName.textContent = data[0].name;
  profileJob.textContent = data[0].about;
  profileAvatar.style.backgroundImage = `url("${data[0].avatar}")`;
  userId = data[0]._id;

  data[1].forEach((cardData) => {
    cardsContainer.append(
      createCard(
        cardData,
        handleImagePopupOpen,
        handleDeleteCard,
        handleLikeCard
      )
    );
  });
});

enableValidation(configValidation);
