//функция открытия попапа с картинкой
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  //если обработчик добавляется на **document**, то он должен и удаляться с этого же элемента.
  document.removeEventListener("keydown", closePopupEsc);
}
function closePopupEsc(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
export function setClosePopupEventListeners(popupElement) {
  const closeButtonElement = popupElement.querySelector(".popup__close");
  closeButtonElement.addEventListener("click", () => {
    closePopup(popupElement);
  });
  /* для оверлея можно использовать событие клик, но лучше mousedown */
  popupElement.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popupElement);
    }
  });
}
