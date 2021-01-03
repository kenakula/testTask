import {switchButtons, setPrices} from './card-price-switch';

const IMAGE_MOD = '_220x220_1';

const productsList = document.querySelector('.products__list');
const cardTemplate = document.querySelector('#card').content.querySelector('.product-card');

const modalSuccess = document.querySelector('.modal--success');

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

const setCardTitle = (card, title) => {
  const titleElem = card.querySelector('.product-card__title a');
  titleElem.textContent = title;
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

const setPriceSwitchButtons = (card, hasAlt, unitFull, unitFullAlt) => {
  const buttonsContainer = card.querySelector('.product-price__switch');
  const defaultButton = card.querySelector('.js-default-unit');
  const altButton = card.querySelector('.js-alt-unit');

  defaultButton.dataset.unitName = unitFull;
  altButton.dataset.unitName = unitFullAlt;

  if (hasAlt) {
    const disabledButton = buttonsContainer.querySelector('.disabled');
    disabledButton.classList.remove('disabled');
    switchButtons(buttonsContainer, disabledButton);
  }
};

const setBonusPrice = (card, bonus) => {
  const bonusPriceElem = card.querySelector('.product-price__points span');
  bonusPriceElem.textContent = bonus;
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

const setAltUnitRatio = (card, unit, unitRatio, altUnit, altRatio) => {
  const container = card.querySelector('.js-ratio');
  const string = `${unitRatio} ${unit} = ${(unitRatio / altRatio).toFixed(3)} ${altUnit}`;

  container.textContent = string;
};

const setCardDetails = (card, details) => {
  const container = card.querySelector('.product-card__details p');

  container.textContent = details;
};

const setCard = (dataObj) => {
  const cardElement = cardTemplate.cloneNode(true);
  const {priceGold, priceGoldAlt, priceRetail, priceRetailAlt} = dataObj;

  cardElement.dataset.modified = dataObj.modified;

  setCardImg(cardElement, dataObj.primaryImageUrl);
  setCardCode(cardElement, dataObj.code);
  setCardTitle(cardElement, dataObj.title);
  setAssociatedProducts(cardElement, dataObj.assocProducts);
  setProductId(cardElement, dataObj.productId);
  setPriceSwitchButtons(cardElement, dataObj.hasAlternateUnit, dataObj.unitFull, dataObj.unitFullAlt);
  setPrice(cardElement, priceGold, priceGoldAlt, priceRetail, priceRetailAlt);
  setBonusPrice(cardElement, dataObj.bonusAmount);
  setAltUnitRatio(cardElement, dataObj.unit, dataObj.unitRatio, dataObj.unitAlt, dataObj.unitRatioAlt);
  setCardDetails(cardElement, dataObj.description);

  return cardElement;
};

const renderCard = (elem, list) => {
  list.insertAdjacentElement('beforeend', elem);
};

export {setCard, renderCard, productsList, modalSuccess};
