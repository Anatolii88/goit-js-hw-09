




function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
console.log(getRandomHexColor())


const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]')
const body = document.querySelector('body');

const changeBackgroundColor = function () { 
  body.style.backgroundColor = getRandomHexColor()
}
let  timerId ;

btnStart.addEventListener('click', onClick)
function onClick(evt) { 
  btnStart.disabled = true
  btnStop.disabled = false
 timerId = setInterval(changeBackgroundColor, 1000)
}

btnStop.addEventListener('click', onStop)
function onStop() { 
  btnStart.disabled = false
  btnStop.disabled = true
clearInterval(timerId)
}
