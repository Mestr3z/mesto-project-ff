import { config } from "../scripts/index.js";
import { getRes } from "../scripts/index.js";
//функция удаления карточки
export const handleDeleteCard = (_id) => {
  return fetch(`${config.url}/cards/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then(getRes)
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
};
//функция лайка карточки
export const sendLikeToServer = (_id) => {
  return fetch(`${config.url}/cards/likes/${_id}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then(getRes)
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
};

export const removeLikeFromServer = (_id) => {
  return fetch(`${config.url}/cards/likes/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  })
    .then(getRes)
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    });
};

export const sendUserDataServer = (profileName, profileJob) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: profileName.textContent,
      about: profileJob.textContent,
    }),
  }).then(getRes);
};

export const sendUserAvatarServer = (userAvatarLink) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: userAvatarLink,
    }),
  }).then(getRes);
};
