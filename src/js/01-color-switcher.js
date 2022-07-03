const refs = {
  startBtnRef: document.querySelector('[data-start]'),
  stopBtnRef: document.querySelector('[data-stop]'),
};

const DELAY = 1000;

let timerId = null;

refs.stopBtnRef.disabled = true;

refs.startBtnRef.addEventListener('click', onStartBtnRef);
refs.stopBtnRef.addEventListener('click', onStopBtnRef);

function onStartBtnRef() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);

  refs.startBtnRef.disabled = true;
  refs.stopBtnRef.disabled = false;
}

function onStopBtnRef() {
  clearInterval(timerId);

  refs.startBtnRef.disabled = false;
  refs.stopBtnRef.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
