import Notiflix from 'notiflix';

//  Отслеживаю форму
const formEl = document.querySelector('.form')

//  Добавляю слушателя события  на форму 

formEl.addEventListener('submit', onSubmit)

function onSubmit(evt) {
  evt.preventDefault()


  let delayStep = Number(formEl.elements.step.value);
  let delay = Number(formEl.elements.delay.value);

  for (let i = 1; i <= formEl.elements.amount.value; i += 1) { 
    
  createPromise(i, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += delayStep;
  }

}

// После запуска генератора промисов, очищаю инпуты 
formEl.addEventListener('submit', reset)
function reset(evt) { 
  evt.currentTarget.elements.amount.value = ''
  evt.currentTarget.elements.step.value = ''
  evt.currentTarget.elements.delay.value = ''
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
    // Fulfill
        resolve({position, delay})
  } else {
    // Reject
        reject({position, delay})
  }
   },delay)
     })
  
}