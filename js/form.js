const form = document.getElementById('form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('invalid');
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let isFormValid = true;

  inputs.forEach(input => {
    console.log(input);
    const errorEl = input.parentElement.querySelector('.form__error');
    if (!input.checkValidity()) {
      input.classList.remove('valid');
      input.classList.add('invalid');
      isFormValid = false;

      if (input.validity.valueMissing) {
        errorEl.textContent = 'The field is required.';
      } else if (input.type === 'email' && input.validity.typeMismatch) {
        errorEl.textContent = 'Please enter a valid email address.';
      } else if (input.id === 'phone' && input.validity.patternMismatch) {
        errorEl.textContent = 'Please enter a valid phone number.';
      } else {
        errorEl.textContent = 'Invalid entry.';
      }
    } else {
      input.classList.add('valid');
      input.classList.remove('invalid');
      errorEl.textContent = '';
    }
  });

  if (isFormValid) {
    form.reset();
    inputs.forEach(input => input.classList.remove('valid'));
  }
});
