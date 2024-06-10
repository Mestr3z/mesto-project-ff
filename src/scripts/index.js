import "../pages/index.css";

import { createCard, deleteCard, handleLikeCard } from "../components/card";
import { addCard, openPopup, handleFormSubmit } from "../components/modal";

import { initialCards } from "../scripts/cards";

// темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// узел
export const cardList = document.querySelector(".places__list");

//попап с картинкой карточки и её описанием
export const imagePopup = document.querySelector(".popup_type_image");

//попап с редактированием имени и сферы деятельности
export const editPopup = document.querySelector(".popup_type_edit");

// попап добавления новой карточки на страницу
export const addCardPopup = document.querySelector(".popup_type_new-card");

//кнопка открытия попапа с редактированием имени и сферы деятельности
export const editButton = document.querySelector(".profile__edit-button");

//кнопка открытия попапа с добавлением новой карточки на страницу
export const addButton = document.querySelector(".profile__add-button");

//массив всех попапов
export const popupElems = document.querySelectorAll(".popup");

//массив всех кнопко закрытия у попапа
export const popupCloseButtons = document.querySelectorAll(".popup__close");

export const popupImageLink = document.querySelector(".popup__image");
export const popupImageDescription = document.querySelector(".popup__caption");
export const popupAddCardNameInput = document.querySelector(
  ".popup__input_type_card-name"
);
export const popupAddCardLinkInput = document.querySelector(
  ".popup__input_type_url"
);

// Находим поля формы в DOM
export const nameInput = editPopup.querySelector(".popup__input_type_name");
export const jobInput = editPopup.querySelector(
  ".popup__input_type_description"
);
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__description");

//функция создания и добавления новой карточки

//слушатель на кнопку добавление новой карточки
addCardPopup.addEventListener("submit", addCard);

//слушатель на кнопку открытия попапа с редактирование имени
editButton.addEventListener("click", () => openPopup(editPopup));
//слушатель на кнопку открытия попапа с добавлением новой карточки
addButton.addEventListener("click", () => openPopup(addCardPopup));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editPopup.addEventListener("submit", handleFormSubmit);

//вывод карточки на страницу

initialCards.forEach(function (cardData) {
  cardList.append(createCard(cardData, deleteCard, handleLikeCard));
});
