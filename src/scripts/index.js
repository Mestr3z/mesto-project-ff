import "../pages/index.css";
import { createCard, handleDeleteCard, handleLikeCard } from "../components/card";
import { openPopup, setClosePopupEventListeners, closePopup } from "../components/modal";
import { enableValidation } from "../components/validation";
//попап с редактированием имени и сферы деятельности
const editPopup = document.querySelector(".popup_type_edit");

//кнопка открытия попапа с редактированием имени и сферы деятельности
const editButton = document.querySelector(".profile__edit-button");

// поля формы editPopup
const nameInput = editPopup.querySelector(".popup__input_type_name");
const jobInput = editPopup.querySelector(".popup__input_type_description");




enableValidation()





//вывод карточки на страницу


//элементы имени, аватара и сферы деятельности
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image")
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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}

//функция открытия попапа с изображением
function handleImagePopupOpen(data) {
  const popupImageLink = document.querySelector(".popup__image");
  const popupImageDescription = document.querySelector(".popup__caption");
  popupImageDescription.textContent = data.name;
  popupImageLink.alt = data.name;
  popupImageLink.src = data.link;
  openPopup(imagePopup);
}


editPopup.addEventListener("submit", handleProfileFormSubmit);

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


export const config = {
  url: 'https://mesto.nomoreparties.co/v1/wff-cohort-22',
  headers: {
    authorization: 'd3146c36-d302-4c3a-a516-c0ba96e51301',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers
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

const postCard = (newCard) => {
  return fetch(`${config.url}/cards`, {
    method: 'POST', 
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    }),
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    }
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

//функция создания новой карточки
function addCard(evt) {
  evt.preventDefault();
 
  
  const newCard = {};

  newCard.name = popupAddCardNameInput.value;
  newCard.link = popupAddCardLinkInput.value;
 
  cardList.prepend(createCard(newCard, handleDeleteCard, handleLikeCard,handleImagePopupOpen ));
  postCard(newCard);


  closePopup(addCardPopup);
}

//обработчики сабмита форм
addCardPopup.addEventListener("submit", (evt) => {
  addCard(evt)
});


export function getUserInfo() {
  return fetch(`${config.url}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((res) => {
    console.log(`Ошибка: ${res.status}`)
})
}


getUserInfo().then((data) => {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileAvatar.style.backgroundImage = data.avatar
})

getInitialCards().then((data) => {
  data.forEach((cardData) => {
    cardList.append(
      createCard(cardData, handleDeleteCard, handleLikeCard, handleImagePopupOpen)
    );
  })
})