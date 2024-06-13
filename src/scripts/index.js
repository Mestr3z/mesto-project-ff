import "../pages/index.css";
import { createCard, deleteCard, handleLikeCard } from "../components/card";
import { openPopup, setClosePopupEventListeners, closePopup } from "../components/modal";
import { initialCards } from "../scripts/cards";

//попап с редактированием имени и сферы деятельности
const editPopup = document.querySelector(".popup_type_edit");

//кнопка открытия попапа с редактированием имени и сферы деятельности
const editButton = document.querySelector(".profile__edit-button");

// поля формы editPopup
let nameInput = editPopup.querySelector(".popup__input_type_name");
let jobInput = editPopup.querySelector(".popup__input_type_description");

//элементы имени и сферы деятельности
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//узел
const cardList = document.querySelector(".places__list");

//попап добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");

//попап с картинкой
const imagePopup = document.querySelector(".popup_type_image");

//инпут названия карточки
const popupAddCardNameInput = document.querySelector(
  ".popup__input_type_card-name"
);

//инпут ссылки на картинку
const popupAddCardLinkInput = document.querySelector(".popup__input_type_url");

//кнопка открытия попапа с добавлением новой карточки на страницу
const addButton = document.querySelector(".profile__add-button");

//функция изменения имени и сферы деятельности
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editPopup.classList.remove("popup_is-opened");
}

//функция открытия попапа с изображением
function handleImagePopupOpen({ name, link }) {
  const popupImageLink = document.querySelector(".popup__image");
  const popupImageDescription = document.querySelector(".popup__caption");
  popupImageDescription.textContent = name;
  popupImageLink.alt = name;
  popupImageLink.src = link;
  openPopup(imagePopup);
}

//функция создания новой карточки
function addCard(evt) {
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

//обработчики сабмита форм
addCardPopup.addEventListener("submit", addCard);
editPopup.addEventListener("submit", handleFormSubmit);

//слушатель на кнопку открытия попапа с добавлением новой карточки
addButton.addEventListener("click", function () {
  popupAddCardLinkInput.value = "";
  popupAddCardNameInput.value = "";
  openPopup(addCardPopup);
});

//слушатель на кнопку открытия попапа с редактирование имени
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

setClosePopupEventListeners(imagePopup);
setClosePopupEventListeners(addCardPopup);
setClosePopupEventListeners(editPopup);

//вывод карточки на страницу
initialCards.forEach(function (cardData) {
  cardList.append(
    createCard(cardData, deleteCard, handleLikeCard, handleImagePopupOpen)
  );
});
