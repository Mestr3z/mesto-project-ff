import { closePopup, openPopup, setClosePopupEventListeners } from "./modal";

//темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//учзел
export const cardList = document.querySelector(".places__list");

//попап добавления новой карточки
export const addCardPopup = document.querySelector(".popup_type_new-card");

//попап с картинкой
export const imagePopup = document.querySelector(".popup_type_image");

//инпут названия карточки
const popupAddCardNameInput = document.querySelector(
  ".popup__input_type_card-name"
);

//инпут ссылки на картинку
const popupAddCardLinkInput = document.querySelector(".popup__input_type_url");

//кнопка открытия попапа с добавлением новой карточки на страницу
const addButton = document.querySelector(".profile__add-button");

//функция создания карточки
export function createCard(
  { name, link },
  deleteCardFunction,
  handleLikeCardfunction,
  handleImagePopupOpenFunction
) {
  const cardLayout = cardTemplate.cloneNode(true);
  const cardElement = cardLayout.querySelector(".card");
  const deleteButton = cardLayout.querySelector(".card__delete-button");
  const cardImage = cardLayout.querySelector(".card__image");
  const cardTitle = cardLayout.querySelector(".card__title");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  deleteButton.addEventListener("click", function () {
    deleteCardFunction(cardElement);
  });

  handleLikeCardfunction(cardElement);

  cardImage.addEventListener("click", function () {
    handleImagePopupOpenFunction({ name, link });
  });

  return cardLayout;
}
//функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
//функция лайка карточки
export function handleLikeCard(cardElement) {
  cardElement.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("card__like-button")) {
      evt.target.classList.toggle("card__like-button_is-active");
    }
  });
}

export function handleImagePopupOpen({ name, link }) {
  const popupImageLink = document.querySelector(".popup__image");
  const popupImageDescription = document.querySelector(".popup__caption");
  popupImageDescription.textContent = name;
  popupImageLink.alt = name;
  popupImageLink.src = link;

  openPopup(imagePopup);
}

export function addCard(evt) {
  evt.preventDefault();

  const newCard = createCard(
    { name: popupAddCardNameInput.value, link: popupAddCardLinkInput.value },
    deleteCard,
    handleLikeCard,
    handleImagePopupOpen
  );
  cardList.prepend(newCard);

  popupAddCardNameInput.value = "";
  popupAddCardLinkInput.value = "";

  closePopup(addCardPopup);
}

addCardPopup.addEventListener("submit", addCard);
addCardPopup.addEventListener("click", () =>
  setClosePopupEventListeners(addCardPopup)
);
imagePopup.addEventListener("click", setClosePopupEventListeners(imagePopup));
addButton.addEventListener("click", function () {
  popupAddCardLinkInput.value = "";
  popupAddCardNameInput.value = "";
  openPopup(addCardPopup);
});
