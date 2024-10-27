import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const displayErrorMessage = (title, message) => {
  iziToast.error({
    title,
    message,
    timeout: 1000,
    progressBar: false,
  });
};

const displaySuccessMessage = (title, message) => {
  iziToast.success({
    title,
    message: message,
    timeout: 1000,
    progressBar: false,
  });
};

const delayPromise = (state, delay) => {
  const response = {
    state,
    delay
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(response);
      } else {
        reject(response);
      }
    }, delay)});
};

const delay = document.querySelector(".input-field");

document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (delay.value <= 0) {
    displayErrorMessage('Bad request', 'Delay should be greater than 0');
    return;
  }

  const selectedState = document.querySelector('input[name="state"]:checked');
  if (selectedState) {
    delayPromise(selectedState.value, delay.value)
      .then(() => displaySuccessMessage('Success', `✅ Fulfilled promise in ${delay.value}ms`))
      .catch(() => displayErrorMessage('Fail', `❌ Rejected promise in ${delay.value}ms`));
  } else {
    displayErrorMessage('Bad request', 'No state selected');
  }
});
