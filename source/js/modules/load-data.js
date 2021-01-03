import {setupModal} from '../utils/modal';
import {setCard, renderCard, productsList, modalSuccess} from './products';
import {stepper} from './stepper';

const DATA_URL = 'https://kenakula.github.io/testTask/build/data/products.json';

const errorHandler = (error) => {
  const pageContainer = document.querySelector('.products');
  const elem = document.createElement('p');
  elem.setAttribute('class', 'products__error');
  elem.textContent = `Ошибка: ${error}`;

  pageContainer.appendChild(elem);
};

fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) {
        errorHandler(response.statusText);
        throw Error(response.statusText);
      }
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
      stepper();
    });
