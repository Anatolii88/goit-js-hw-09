import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

//  Отслеживаю  елементы 
const dataDaysEl = document.querySelector('span[data-days]')
const dataHoursEl = document.querySelector('span[data-hours')
const dataMinutesEl = document.querySelector('span[data-minutes]')
const dataSecondsEl = document.querySelector('span[data-seconds]')
const btnStart = document.querySelector('button[data-start]');



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
     if (selectedDates[0] <= new Date()) {
       Notiflix.Notify.failure('Please choose a date in the future');
    } else { 
       btnStart.disabled = false;
    }
  },
};

// Инициализация flatpickr
const fp = flatpickr("input#datetime-picker", options);


//  Таймер  который вызывается  при клике на кнопку Start
const newTimer = {
  isActive: false, 
  startTimer() { 
    if (this.isActive) { 
      return;
    }
    this.isActive = true;
      const timer = setInterval(function () { 
      const chooseDate = fp.selectedDates[0];
      const delta = chooseDate - new Date()
      const { days, hours, minutes, seconds } = convertMs(delta)
      dataDaysEl.textContent = days
      dataHoursEl.textContent = hours
      dataMinutesEl.textContent = minutes
      dataSecondsEl.textContent = seconds
     
       if (chooseDate.toString() === new Date().toString()) { 
      console.log(clearInterval(timer))
      dataDaysEl.textContent = '00'
      dataHoursEl.textContent = '00'
      dataMinutesEl.textContent = '00'
      dataSecondsEl.textContent = '00'
       }
       
    }, 1000)
  },

}

btnStart.addEventListener('click', onBtnStart)
function onBtnStart() {
  newTimer.startTimer();
  
}
//  Функция которая форматирует объект с рассчитанным оставшимся временем , добавляет 0 если в числе меньше двух символов
function addLeadingZero(value) { 
  return String(value).padStart(2, '0')
}


//  Функция которая возвращает объект - в котором разница между текущем и будущем временем 
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