import { userId } from "../scripts/index.js";
import {
  handleDeleteCard,
  sendLikeToServer,
  removeLikeFromServer,
} from "./api.js";
//темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//функция создания карточки
export function createCard(data, handleImagePopupOpenFunction) {
  const cardLayout = cardTemplate.cloneNode(true);
  const cardElement = cardLayout.querySelector(".card");
  const deleteButton = cardLayout.querySelector(".card__delete-button");
  const cardImage = cardLayout.querySelector(".card__image");
  const cardTitle = cardLayout.querySelector(".card__title");
  const cardLikeButton = cardLayout.querySelector(".card__like-button");
  const cardLikesNumber = cardLayout.querySelector(
    ".card__like-container_number"
  );
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLikesNumber.textContent = data.likes.length;

  cardLikeButton.addEventListener("click", () => {
    handleLikeCard(cardLikeButton, cardLikesNumber, data._id);
  });

  const standingLike = data.likes.some((likes) => {
    return likes._id === userId;
  });
  if (standingLike) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  if (data.owner._id !== userId) {
    deleteButton.remove();
  }
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement, data._id);
  });
  cardImage.addEventListener("click", function () {
    handleImagePopupOpenFunction(data);
  });

  return cardLayout;
}

function deleteCard(cardElement, id) {
  handleDeleteCard(id)
    .then(() => {
      cardElement.remove();
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
}

//функция добавления лайка карточки и его снятия
export function handleLikeCard(likeButton, cardLikesNumber, dataId) {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    sendLikeToServer(dataId)
      .then((res) => {
        cardLikesNumber.textContent = res.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      });
  } else {
    removeLikeFromServer(dataId)
      .then((res) => {
        cardLikesNumber.textContent = res.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      });
  }
}
