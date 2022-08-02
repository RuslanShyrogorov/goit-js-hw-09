import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]')
}

const DELAY_INTERVAL = 1000

refs.startBtn.setAttribute('disabled', 'disabled')

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future', {position: "center-center"},);
      return
    }

    refs.startBtn.removeAttribute('disabled')
    Notify.success('Please, press to "Start"', {position: "center-center"},);
  },
};

const date = flatpickr("#datetime-picker", options);

class Timer {
  constructor ({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  

  start() {
    if (this.isActive) {
      return
    }

    this.isActive = true
    const finishTime = date.selectedDates[0]

    this.intervalId = setInterval(() => {
      const deltaTime = finishTime - Date.now()
      const time = convertMs(deltaTime)
      this.onTick(time)



      if (deltaTime <= 0) {
      clearInterval(this.intervalID);
        const endTime = convertMs(0);
        this.onTick(endTime)
        this.isActive = false
    }
      
    }, DELAY_INTERVAL)

    refs.startBtn.setAttribute('disabled', 'disabled')

    
  }
}

const timer = new Timer({
  onTick: updateClockFace,
})

refs.startBtn.addEventListener('click', startTimer)

function startTimer() {
  timer.start()
}


function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days
  refs.hours.textContent = hours
  refs.minutes.textContent = minutes
  refs.seconds.textContent = seconds
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}