const stepper = () => {
  const stepperContent = document.querySelectorAll('.stepper');

  if (!stepperContent.length) {
    return;
  }

  const incrementValue = (input, current) => {
    input.value = +current + 1;
  };

  const decrementValue = (input, current) => {
    input.value = +current - 1;

    if (input.value <= 0) {
      input.value = 1;
    }
  };

  const stepperClickHandler = (target) => {
    const stepperContainer = target.closest('.stepper');

    if (stepperContainer) {
      const stepperInput = stepperContainer.querySelector('.stepper input[type="number"]');
      const stepperUp = target.closest('.stepper__button--up');
      const stepperDown = target.closest('.stepper__button--down');

      if (stepperUp) {
        incrementValue(stepperInput, stepperInput.value);
      }

      if (stepperDown) {
        decrementValue(stepperInput, stepperInput.value);
      }
    }
  };

  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    stepperClickHandler(evt.target);
  });
};

export {stepper};
