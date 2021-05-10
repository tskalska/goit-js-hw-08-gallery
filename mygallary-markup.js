import cards from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const gallaryMarkup = makeCardsGallery(cards);
const lightboxEl = document.querySelector('div.lightbox');
const imgElOpen = document.querySelector('img.lightbox__image');
const closeButton = document.querySelector('button[data-action="close-lightbox"]');
const overlayEl = document.querySelector('div.lightbox__overlay');

galleryContainer.insertAdjacentHTML('afterbegin', gallaryMarkup);
galleryContainer.addEventListener('click', onClick);
closeButton.addEventListener('click', onClickClose);
overlayEl.addEventListener('click', onClickClose);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    return onClickClose();
  }
});

/**
 * Создание галереи
 */
function makeCardsGallery(cards) {
  return cards.map(({preview, original, description}) => { 
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
      </a>
    </li>`
  }).join('');
}

/**
 *  Окрытие модального окна (делегирование)
 */
function onClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  lightboxEl.classList.add('is-open');
  imgElOpen.src=event.target.dataset.source;
}
 
/**
 * Закрытие модального окна
 */
function onClickClose(event) {
  lightboxEl.classList.remove('is-open');
  imgElOpen.src='';
}