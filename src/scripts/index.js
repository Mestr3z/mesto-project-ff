import "../pages/index.css";
import { createCard, handleLikeCard } from "../components/card";
import {
  openPopup,
  setClosePopupEventListeners,
  closePopup,
} from "../components/modal";
import { enableValidation } from "../components/validation";
import {
  handleDeleteCard,
  sendUserDataServer,
  sendUserAvatarServer,
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
const cardList = document.querySelector(".places__list");

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

//инпут ссылки на картинку
const popupAddCardLinkInput = document.querySelector(".popup__input_type_url");

//кнопка открытия попапа с добавлением новой карточки на страницу
const addButton = document.querySelector(".profile__add-button");

export const config = {
  url: "https://mesto.nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "d3146c36-d302-4c3a-a516-c0ba96e51301",
    "Content-Type": "application/json",
  },
};

export const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//функция открытия попапа с изображением
function handleImagePopupOpen(data) {
  const popupImageLink = document.querySelector(".popup__image");
  const popupImageDescription = document.querySelector(".popup__caption");
  popupImageDescription.textContent = data.name;
  popupImageLink.alt = data.name;
  popupImageLink.src = data.link;
  openPopup(imagePopup);
}

editPopup.addEventListener("submit", (evt) => {
  editProfileData(evt);
});

profileAvatar.addEventListener("click", () => {
  openPopup(avatarPopup);
  avatarPopupInput.value = "";
  renderLoading(editPopup, "Сохранить");
});

//слушатель на кнопку открытия попапа с добавлением новой карточки
addButton.addEventListener("click", function () {
  popupAddCardLinkInput.value = "";
  popupAddCardNameInput.value = "";
  openPopup(addCardPopup);
  renderLoading(editPopup, "Сохранить");
});

//слушатель на кнопку открытия попапа с редактирование имени
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
  renderLoading(editPopup, "Сохранить");
});

setClosePopupEventListeners(imagePopup);
setClosePopupEventListeners(addCardPopup);
setClosePopupEventListeners(editPopup);
setClosePopupEventListeners(avatarPopup);

export function getRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getInitialCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  })
    .then(getRes)
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
};

const postCard = (newCard) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then(getRes)
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
};

//функция создания новой карточки
function addCard(evt) {
  evt.preventDefault();
  renderLoading(editPopup, "Сохранение...");
  const newCard = {};

  newCard.name = popupAddCardNameInput.value;
  newCard.link = popupAddCardLinkInput.value;

  postCard(newCard).then((res) => {
    cardList.prepend(
      createCard(res, handleDeleteCard, handleLikeCard, handleImagePopupOpen)
    );
  });

  closePopup(addCardPopup);
}

function editProfileData(evt) {
  evt.preventDefault();
  renderLoading(editPopup, "Сохранение...");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  sendUserDataServer(profileName, profileJob)
    .then(() => {
      closePopup(editPopup);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
}

//обработчики сабмита форм
addCardPopup.addEventListener("submit", (evt) => {
  addCard(evt);
});

export function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers,
  })
    .then(getRes)
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
}

const userInfo = [getUserInfo(), getInitialCards()];

function sendUserAvatar(evt) {
  evt.preventDefault;
  renderLoading(editPopup, "Сохранение...");
  sendUserAvatarServer(avatarPopupInput.value)
    .then((res) => {
      profileAvatar.setAttribute(
        "style",
        `background-image: url(${res.avatar})`
      );
      closePopup(avatarPopup);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
}

avatarPopup.addEventListener("submit", (evt) => {
  sendUserAvatar(evt);
});

function renderLoading(popup, saving) {
  popup.querySelector(configValidation.submitButtonSelector).textContent =
    saving;
}

//Загружаем данные о пользователе и карточки на страницу
Promise.all(userInfo).then((data) => {
  profileName.textContent = data[0].name;
  profileJob.textContent = data[0].about;
  profileAvatar.style.backgroundImage = `url("${data[0].avatar}")`;
  userId = data[0]._id;

  data[1].forEach((cardData) => {
    cardList.append(
      createCard(
        cardData,
        handleDeleteCard,
        handleLikeCard,
        handleImagePopupOpen
      )
    );
  });
});

enableValidation(configValidation);
