import {
  cardTemplate,
  cardList,
  imagePopup,
  editPopup,
  addCardPopup,
  popupElems,
  popupCloseButtons,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupImageDescription,
  popupImageLink,
  popupAddCardLinkInput,
  popupAddCardNameInput,
} from "../scripts/index";

import { handleLikeCard, deleteCard } from "./card";

//функция добавления карточки
export function addCard(evt) {
  evt.preventDefault();
  const cardLayout = cardTemplate.cloneNode(true);
  const cardElement = cardLayout.querySelector(".card");
  const cardImageLink = cardLayout.querySelector(".card__image");
  const cardImageDescription = cardLayout.querySelector(".card__title");
  const deleteButton = cardLayout.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  cardImageLink.src = popupAddCardLinkInput.value;
  cardImageDescription.textContent = popupAddCardNameInput.value;

  cardImageLink.addEventListener("click", function () {
    popupImageDescription.textContent = cardImageDescription.textContent;
    popupImageLink.src = cardImageLink.src;
    openPopup(imagePopup);
    handleOverlayClose(imagePopup);
  });

  addCardPopup.classList.remove("popup_is-opened");

  handleLikeCard(cardElement);

  cardList.prepend(cardElement);
}

//функция открытия попапа с картинкой
export function handleImagePopupOpen(cardData) {
  popupImageDescription.textContent = cardData.name;

  popupImageLink.src = cardData.link;

  openPopup(imagePopup);
  handleOverlayClose(imagePopup);
}

//функция закрытия на крестик и удаление слушателей
export function closePopup(popup) {
  popupCloseButtons.forEach((item) => {
    item.addEventListener("click", () => {
      popup.classList.remove("popup_is-opened");
    });
  });
  popup.removeEventListener("click", handleOverlayClose(editPopup));
  popup.removeEventListener("click", handleOverlayClose(addCardPopup));
  popup.removeEventListener("keydown", handleEscClose);
}

//функция закрытия на оверлей
export function handleOverlayClose(popup) {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup") &&
      !evt.target.classList.contains("popup__content")
    ) {
      popup.classList.remove("popup_is-opened");
    }
  });
}

//функция закрытия попапа на esc
export function handleEscClose(evt) {
  popupElems.forEach((item) => {
    if (evt.key === "Escape") {
      item.classList.remove("popup_is-opened");
    }
  });
}
//функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
  popupAddCardLinkInput.value = "";
  popupAddCardNameInput.value = "";

  closePopup(popup);
  handleOverlayClose(popup);
}

//функция редактирования имени и сферы деятельности
export function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editPopup.classList.remove("popup_is-opened");
}
