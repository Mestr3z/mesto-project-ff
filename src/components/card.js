import { config, getUserInfo } from "../scripts/index";

//темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//функция создания карточки
export function createCard(
  data,
  handleDeleteCardFunction,
  handleLikeCardfunction,
  handleImagePopupOpenFunction,
) {
  const cardLayout = cardTemplate.cloneNode(true);
  const cardElement = cardLayout.querySelector(".card");
  const deleteButton = cardLayout.querySelector(".card__delete-button");
  const cardImage = cardLayout.querySelector(".card__image");
  const cardTitle = cardLayout.querySelector(".card__title");
  const cardLikeButton = cardLayout.querySelector('.card__like-button')
  const cardLikesNumber = cardLayout.querySelector('.card__like-container_number')

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  

  
  
  cardLikeButton.addEventListener('click', (evt) => {
    
    handleLikeCard(evt);
    sendLikeToServer(data._id)
    // const likes = Object.values(data.likes);
    // cardLikesNumber.textContent 
  });

    

  deleteButton.addEventListener("click", function () {
    handleDeleteCardFunction(data._id);
    cardElement.remove()
  });

  // if(data.owner._id !== "1bc2d996f4a5c0b75a869967"){
  //   deleteButton.remove();
  // }

  cardImage.addEventListener("click", function () {
    handleImagePopupOpenFunction(data);
  });

  return cardLayout;
}
//функция удаления карточки
export const handleDeleteCard = (_id) => {
  return fetch(`${config.url}/cards/${_id}`, {
    method: 'DELETE', 
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
  })
  .then((res) => {
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((res) => {
    console.log(`Ошибка: ${res.status}`)
})
}
//функция лайка карточки
export function handleLikeCard(evt) {
      evt.target.classList.toggle("card__like-button_is-active");
}

const sendLikeToServer = (_id) => {
  return fetch(`${config.url}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
  }) 
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {
    console.log(`Ошибка: ${res.status}`)
  })
}
