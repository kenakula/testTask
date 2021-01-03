import {switchButtons, setPrices} from './card-price-switch';

const DATA_URL = '../data/products.json';
const IMAGE_MOD = '_220x220_1';
const ERROR_MESSAGE = 'Проблемы с соединением, проверьте подключение';

const productsList = document.querySelector('.products__list');
const cardTemplate = document.querySelector('#card').content.querySelector('.product-card');

const setCardImg = (card, url) => {
  const cardImg = card.querySelector('.product-card__img-wrap img');
  const modIndex = url.lastIndexOf('.');

  const insert = (string, mod, index) => {
    return string.substring(0, index) + mod + string.substring(index);
  };

  const moddedUrl = insert(url, IMAGE_MOD, modIndex);

  cardImg.setAttribute('src', moddedUrl);
};

const setCardCode = (card, code) => {
  const codeElem = card.querySelector('.product-card__label p span');
  codeElem.textContent = code;
};

const setCardTitle = (card, title, desc) => {
  const titleElem = card.querySelector('.product-card__title a');
  titleElem.textContent = title;
  titleElem.title = desc;
};

const setAssociatedProducts = (card, products) => {
  let productsString = products.replace(/;$/g, '');
  const array = productsString.split('; ');
  const linksContainer = card.querySelector('.product-card__useful');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < array.length; i++) {
    const link = document.createElement('a');
    let linkText = array[i];
    link.href = '#';

    link.textContent = i < array.length - 1 ? link.textContent = `${linkText},` : `${linkText}.`;

    fragment.appendChild(link);
  }

  linksContainer.appendChild(fragment);
};

const setProductId = (card, id) => {
  const buyButton = card.querySelector('.product-card__form button[type=submit]');
  buyButton.dataset.productId = id;
};

const setPriceSwitchButtons = (card, hasAlt) => {
  const buttonsContainer = card.querySelector('.product-price__switch');

  if (hasAlt) {
    const disabledButton = buttonsContainer.querySelector('.disabled');
    disabledButton.classList.remove('disabled');
    switchButtons(buttonsContainer, disabledButton);
  }
};

const setPrice = (card, gold, goldAlt, retail, retailAlt) => {
  const goldPrice = card.querySelector('.product-price__price--gold dd');
  const retailPrice = card.querySelector('.product-price__price--retail dd');

  goldPrice.dataset.default = gold;
  goldPrice.dataset.alt = goldAlt;
  retailPrice.dataset.default = retail;
  retailPrice.dataset.alt = retailAlt;

  setPrices(card);
};

const setCard = (dataObj) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {priceGold, priceGoldAlt, priceRetail, priceRetailAlt} = dataObj;

  setCardImg(cardElement, dataObj.primaryImageUrl);
  setCardCode(cardElement, dataObj.code);
  setCardTitle(cardElement, dataObj.title, dataObj.description);
  setAssociatedProducts(cardElement, dataObj.assocProducts);
  setProductId(cardElement, dataObj.productId);
  setPriceSwitchButtons(cardElement, dataObj.hasAlternateUnit);
  setPrice(cardElement, priceGold, priceGoldAlt, priceRetail, priceRetailAlt);

  return cardElement;
};

const renderCard = (elem, list) => {
  list.insertAdjacentElement('beforeend', elem);
};

const errorHandler = (error) => {
  const pageContainer = document.querySelector('.products');
  const elem = document.createElement('p');
  elem.textContent = `${ERROR_MESSAGE}\n${error}`;

  pageContainer.appendChild(elem);
};

fetch(DATA_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((obj) => {
        const card = setCard(obj);
        renderCard(card, productsList);
      });
    })
    .catch((error) => {
      errorHandler(error);
    });
