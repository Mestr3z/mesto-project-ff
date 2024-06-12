import "../pages/index.css";
import {
  createCard,
  deleteCard,
  handleLikeCard,
  handleImagePopupOpen,
  cardList,
} from "../components/card";
import { openPopup, setClosePopupEventListeners } from "../components/modal";
import { initialCards } from "../scripts/cards";

//попап с редактированием имени и сферы деятельности
const editPopup = document.querySelector(".popup_type_edit");

//кнопка открытия попапа с редактированием имени и сферы деятельности
const editButton = document.querySelector(".profile__edit-button");

// Находим поля формы в DOM
let nameInput = editPopup.querySelector(".popup__input_type_name");
let jobInput = editPopup.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//слушатель на кнопку открытия попапа с редактирование имени
editButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});
//слушатель на кнопку открытия попапа с добавлением новой карточки

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editPopup.addEventListener("submit", handleFormSubmit);

//вывод карточки на страницу
initialCards.forEach(function (cardData) {
  cardList.append(
    createCard(cardData, deleteCard, handleLikeCard, handleImagePopupOpen)
  );
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editPopup.classList.remove("popup_is-opened");
}

editPopup.addEventListener("click", setClosePopupEventListeners(editPopup));
