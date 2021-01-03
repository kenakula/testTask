const switchButtons = (container, target) => {
  const activeButton = container.querySelector('button.active');
  activeButton.classList.remove('active');
  target.classList.add('active');
};

const buttonSwitch = () => {
  const buttonsContainer = document.querySelectorAll('.product-price__switch');

  if (!buttonsContainer) {
    return;
  }

  const buttonClickHandler = (target) => {
    const card = target.closest('.product-card');
    const container = target.closest('.product-price__switch');
    const button = target.closest('.product-price__switch button');

    if (button) {
      switchButtons(container, button);
      setPrices(card);
    }
  };

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    buttonClickHandler(evt.target);
  });
};

const setPrices = (card) => {
  const activeUnitButton = card.querySelector('.product-price__switch .active');
  const activeUnitValue = activeUnitButton.dataset.unit;

  const goldPriceContainer = card.querySelector('.product-price__price--gold dd');
  const retailPriceContainer = card.querySelector('.product-price__price--retail dd');

  goldPriceContainer.textContent = goldPriceContainer.dataset[activeUnitValue];
  retailPriceContainer.textContent = retailPriceContainer.dataset[activeUnitValue];
};

export {buttonSwitch, switchButtons, setPrices};
