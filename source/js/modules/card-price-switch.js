const buttonSwitch = () => {
  const buttonsContainer = document.querySelectorAll('.product-price__switch');

  if (!buttonsContainer) {
    return;
  }

  const buttonClickHandler = (target) => {
    const container = target.closest('.product-price__switch');
    const button = target.closest('.product-price__switch button');

    if (button) {
      const activeButton = container.querySelector('button.active');
      activeButton.classList.remove('active');
      button.classList.add('active');
    }
  };

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    buttonClickHandler(evt.target);
  });
};

export {buttonSwitch};
