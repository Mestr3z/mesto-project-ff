//темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

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
  const cardLikeButton = cardLayout.querySelector('.card__like-button')

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  deleteButton.addEventListener("click", function () {
    deleteCardFunction(cardElement);
  });

  cardLikeButton.addEventListener('click', handleLikeCard);

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
export function handleLikeCard(evt) {
      evt.target.classList.toggle("card__like-button_is-active");
}


