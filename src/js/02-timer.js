import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const dataDaysEl = document.querySelector('span[data-days]')
const dataHoursEl = document.querySelector('span[data-hours')
const dataMinutesEl = document.querySelector('span[data-minutes]')
const dtatSecondsEl = document.querySelector('span[data-seconds]')
const btnStart = document.querySelector('button[data-start]');



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
     if (selectedDates[0] <= new Date()) {
      window.alert('"Please choose a date in the future"')
    } else { 
       btnStart.disabled = false;
    }
  },
};
flatpickr("input#datetime-picker", options);


const fp = flatpickr("input#datetime-picker", options);

const newTimer = {
  isActive: false,
  startTimer() { 
    if (this.isActive) { 
      return;
    }
    this.isActive = true;
    setInterval(function () { 
        const chooseDate = fp.selectedDates[0];
      const delta = chooseDate - new Date()
      const { days, hours, minutes, seconds } = convertMs(delta)
      dataDaysEl.textContent = days
      dataHoursEl.textContent = hours
      dataMinutesEl.textContent = minutes
      dtatSecondsEl.textContent = seconds
    },1000)

  }
}


btnStart.addEventListener('click', onBtnStart)
function onBtnStart() {
  newTimer.startTimer();
}

function addLeadingZero(value) { 
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}