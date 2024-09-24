import { apiConfig } from "../scripts/index.js";

//функция удаления карточки
export function getRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const handleDeleteCard = (id) => {
  return fetch(`${apiConfig.url}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": apiConfig.headers["Content-Type"],
    },
  })
    .then(getRes)
};
//функция лайка карточки
export const sendLikeToServer = (id) => {
  return fetch(`${apiConfig.url}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": apiConfig.headers["Content-Type"],
    },
  }).then(getRes);
};

export const removeLikeFromServer = (id) => {
  return fetch(`${apiConfig.url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": apiConfig.headers["Content-Type"],
    },
  }).then(getRes);
};

export const sendUserDataServer = (name, job) => {
  return fetch(`${apiConfig.url}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": apiConfig.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: name.textContent,
      about: job.textContent,
    }),
  }).then(getRes);
};

export const sendUserAvatarServer = (userAvatarLink) => {
  return fetch(`${apiConfig.url}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": apiConfig.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: userAvatarLink,
    }),
  }).then(getRes);
};

export const getInitialCards = () => {
  return fetch(`${apiConfig.url}/cards`, {
    headers: apiConfig.headers,
  })
    .then(getRes)
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
};

export const postCard = (newCard) => {
  return fetch(`${apiConfig.url}/cards`, {
    method: "POST",
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
    headers: {
      authorization: apiConfig.headers.authorization,
      "Content-Type": apiConfig.headers["Content-Type"],
    },
  })
    .then(getRes)
   
};

export function getUserInfo() {
  return fetch(`${apiConfig.url}/users/me`, {
    headers: apiConfig.headers,
  })
    .then(getRes)
 
}
