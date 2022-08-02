import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formEl = document.querySelector('.form')

formEl.addEventListener('submit', handleSubmitForm)

function handleSubmitForm(e) {
  e.preventDefault()
  const { elements: { delay, step, amount } } = e.currentTarget
  let delayInt = parseInt(delay.value)
  const stepInt = parseInt(step.value)
  const amountInt = parseInt(amount.value)
  
  if (delayInt <= 0 || stepInt <= 0 || amountInt <= 0) {
    Notify.failure(`You entered incorrect values, need more `)
  }

  for (let i = 0; i < amountInt; i += 1) {
    createPromise(amountInt, delayInt)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayInt += stepInt;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
    // Fulfill
      } else {
        reject({ position, delay })
    // Reject
  }
    }, delay)
  
  })
  
}
