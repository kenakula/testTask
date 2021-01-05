import {setupModal} from '../utils/modal';
import {setCard, renderCard, productsList, modalSuccess} from './products';
import {stepper} from './stepper';

const DATA_URL = 'https://kenakula.github.io/testTask/build/data/products.json';

const TIMEOUT_IN_MS = 10000;
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const RESPONSE_TYPE = 'text';
const ResponseCode = {
  OK: 200,
  NOT_FOUND: 404,
  UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const responseHandler = function (xhr, onLoad, onError) {
  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case ResponseCode.OK:
        onLoad(xhr.response);
        break;
      case ResponseCode.NOT_FOUND:
        onError('Запрашиваемыe данные не существуют!');
        break;
      case ResponseCode.UNAVAILABLE:
        onError('Ошибка сервера, попробуйте снова позже');
        break;
      case ResponseCode.GATEWAY_TIMEOUT:
        onError('Слишком долгое ожидание ответа сервера, возможно медленное интернет-соединение');
        break;
      default:
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Проверьте соединение');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });
};

const createXhr = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = RESPONSE_TYPE;
  xhr.timeout = TIMEOUT_IN_MS;
  responseHandler(xhr, onSuccess, onError);

  return xhr;
};

const load = function (onSuccess, onError) {
  const xhr = createXhr(onSuccess, onError);

  xhr.open(Method.GET, DATA_URL);
  xhr.send();
};


const errorHandler = (error) => {
  const pageContainer = document.querySelector('.products');
  const elem = document.createElement('p');
  elem.setAttribute('class', 'products__error');
  elem.textContent = `Ошибка: ${error}`;

  pageContainer.appendChild(elem);
};

const handleSuccess = (data) => {
  const products = JSON.parse(data);
  console.log('products:', products)
  products.forEach((product) => {
    const card = setCard(product);
    renderCard(card, productsList);
  });
  const modalSuccessBtns = document.querySelectorAll('[data-modal="success"]');
  if (modalSuccess && modalSuccessBtns.length) {
    setupModal(modalSuccess, false, modalSuccessBtns);
  }
  stepper();
};

load(handleSuccess, errorHandler);
