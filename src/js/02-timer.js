import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

require('flatpickr/dist/themes/dark.css');

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtn);

let endDate = null;
let timerId = null;
let timerData = {};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    endDate = selectedDates[0].getTime();
    if (endDate < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    Notify.success('All good, let`s start');
    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.input, options);

function onStartBtn() {
  timerId = setInterval(() => {
    const diffDate = endDate - new Date().getTime();
    if (diffDate < 0) {
      clearInterval(timerId);
      return;
    }
    timerData = convertMs(diffDate);
    createTimerRefs(timerData);
  }, 1000);
}

function createTimerRefs({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// refs.startBtn.addEventListener('click', onStartBtn);
