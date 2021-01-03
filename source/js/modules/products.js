const DATA_URL = '../data/products.json';
const DATA_METHOD = 'GET';
const TIMEOUT = 100000;
const RESPONSE_TYPE = 'json';

const xhr = new XMLHttpRequest();
xhr.timeout = TIMEOUT;
xhr.responseType = RESPONSE_TYPE;

xhr.open(DATA_METHOD, DATA_URL);
xhr.send();

xhr.onload = function () {
  if (xhr.status !== 200) {
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
  } else {
    console.log(xhr.response);
  }
};
