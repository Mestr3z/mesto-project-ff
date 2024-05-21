// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// узел
const cardList = document.querySelector('.places__list'); 


// функция создания карточки

function createCard(cardData, deleteCardFunction) {
    const cardElements = cardTemplate.cloneNode(true);
    const cardElement = cardElements.querySelector('.card')
    const deleteButton = cardElements.querySelector('.card__delete-button');
    const cardImage = cardElements.querySelector('.card__image');

    cardElements.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener('click', function() {
        deleteCardFunction(cardElement);
    })

    return cardElements;
}

// функция удаления карточки

function deleteCard (cardElement) {
        cardElement.remove()
}

//вывод карточки на страницу

initialCards.forEach(function (cardData) {
    cardList.append(createCard(cardData, deleteCard));
});




