const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body')
}

let intervalId = null
let isActive = false
const DELAY_INTERVAL = 1000

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', handlerStartBtn)

function handlerStartBtn() {
  if (isActive) {
    return
  }

  isActive = true

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor()
  }, DELAY_INTERVAL)
}

refs.stopBtn.addEventListener('click', handlerStopBtn)

function handlerStopBtn() {
  clearInterval(intervalId)

  isActive = false
}
