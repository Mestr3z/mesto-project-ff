import { cardTemplate } from "../scripts/index";

import { handleImagePopupOpen } from "./modal";

//функция создания карточки
export function createCard(
  cardData,
  deleteCardFunction,
  handleLikeCardfunction
) {
  const cardLayout = cardTemplate.cloneNode(true);
  const cardElement = cardLayout.querySelector(".card");
  const deleteButton = cardLayout.querySelector(".card__delete-button");
  const cardImage = cardLayout.querySelector(".card__image");

  cardLayout.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  deleteButton.addEventListener("click", function () {
    deleteCardFunction(cardElement);
  });

  handleLikeCardfunction(cardElement);

  cardImage.addEventListener("click", () => handleImagePopupOpen(cardData));

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
