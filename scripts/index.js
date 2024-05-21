// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list'); 


// функция перебора массива карточке, 
// добавления их на страницу 
// и их удаления через кнопку deleteButton

initialCards.forEach(function (element) {

    const cardElements = cardTemplate.cloneNode(true);
    const cardElement = cardElements.querySelector('.card')
    const deleteButton = cardElements.querySelector('.card__delete-button');

    cardElements.querySelector('.card__title').textContent = element.name;
    cardElements.querySelector('.card__image').src = element.link;

    deleteButton.addEventListener('click', function() {
        cardElement.remove();
    })
    
    cardList.append(cardElements);
});




