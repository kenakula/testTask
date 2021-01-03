import {setupModal} from '../utils/modal';
import {setCard, renderCard, productsList, modalSuccess, errorHandler} from './products';

const DATA_URL = '../data/products.json';

fetch(DATA_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((obj) => {
        const card = setCard(obj);
        renderCard(card, productsList);
      });
      const modalSuccessBtns = document.querySelectorAll('[data-modal="success"]');
      if (modalSuccess && modalSuccessBtns.length) {
        setupModal(modalSuccess, false, modalSuccessBtns);
      }
    })
    .catch((error) => {
      errorHandler(error);
    });
