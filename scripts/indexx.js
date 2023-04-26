let popupImg = document.querySelector(.images-popup)

function showCard(card) {
    const popupImages = document.querySelector('.images-popup');
    const closeBtnPopupImages = popupImages.querySelector('.popup__button-exit_image');
    const popupImagesContent = popupImages.querySelector('.popup__image');
    const popupImagesParagraph = popupImages.querySelector('.popup__heading');
    const openPopupImage = (card) => {
        popupImagesContent.src = card.link;
        popupImagesContent.alt = card.name;
        popupImagesParagraph.textContent = card.name;
        openPopup(popupImages);
    };
}