let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  //! clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //! check if we should stop it
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //! display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function timeSelect(time) {
  const hour = time.getHours() + 5;
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const mins = time.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${mins < 10 ? '0' : ''}${mins}`;
}

function timeSelectTimer(time) {
  const now = Date.now();
  const then = time.setTime(time);
  console.log({now}, {then});
  // displayTimeLeft(then);

}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customTimeForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const time = this.timeReturn.valueAsDate;
  if (!time) {
    endTime.textContent = `Please select a time to return.`;
    return;
  }
  clearInterval(countdown);
  timerDisplay.textContent = '';
  timeSelect(time);
  timeSelectTimer(time);
  this.reset();
});
