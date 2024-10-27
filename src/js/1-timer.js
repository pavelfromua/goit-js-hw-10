import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dateTimePicker = document.querySelector('#datetime-picker');
let userSelectedDate = null;

const displayErrorMessage = () => {
  iziToast.error({
    message: 'Please choose a date in the future',
    timeout: 1000,
    progressBar: false,
  });
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      displayErrorMessage();
      startButton.disabled = true;
      return;
    }

    userSelectedDate = selectedDates[0];
    startButton.disabled = false;
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const getFormatted = (value) => {
  return String(value).padStart(2, '0');
};

document.addEventListener('DOMContentLoaded', () => {
  startButton.disabled = true;
});

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  const intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(userSelectedDate - Date.now());

    dataDays.textContent = getFormatted(days);
    dataHours.textContent = getFormatted(hours);
    dataMinutes.textContent = getFormatted(minutes);
    dataSeconds.textContent = getFormatted(seconds);

    if ((days + hours + minutes + seconds) <= 0) {
      dateTimePicker.disabled = false;
      clearInterval(intervalId);
    }

  }, 1000);
});