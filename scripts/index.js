// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// узел
const cardList = document.querySelector('.places__list'); 


// функция создания карточки

function createCard(cardData, deleteCardFunction) {
    const cardLayout = cardTemplate.cloneNode(true);
    const cardElement = cardLayout.querySelector('.card')
    const deleteButton = cardLayout.querySelector('.card__delete-button');
    const cardImage = cardLayout.querySelector('.card__image');

    cardLayout.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener('click', function() {
        deleteCardFunction(cardElement);
    })

    return cardLayout;
}

// функция удаления карточки

function deleteCard (cardElement) {
        cardElement.remove()
}

//вывод карточки на страницу

initialCards.forEach(function (cardData) {
    cardList.append(createCard(cardData, deleteCard));
});




