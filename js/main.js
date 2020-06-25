//? main variables
//?------------------------------------
let countdown;
let timeout;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('[data-time]');

//? alarm variables
//?------------------------------------
const alarmButton = document.querySelector('#alarmButton');
const alarmAudio = document.querySelector('#alarm1');

//? main functions
//?------------------------------------
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
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  if (!minutes && !remainderSeconds) {
    turnAlarmOn();
  }
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

//? alarm functions
//?------------------------------------
function turnAlarmOff() {
  if (timeout) {
    alert('Alarm timed out after 60 seconds.');
  }
  clearTimeout(timeout);
  alarmAudio.pause();
  alarmButton.classList.remove('display__alarm-on');
  alarmButton.classList.add('display__alarm-off');
  timerDisplay.textContent = '';
  endTime.textContent = 'Select a preset timer or choose a return time';
}

function turnAlarmOn() {
  timerDisplay.textContent = 'Time\'s up!';
  endTime.textContent = '';
  alarmAudio.play();
  alarmButton.classList.remove('display__alarm-off');
  alarmButton.classList.add('display__alarm-on');
  timeout = setTimeout(turnAlarmOff, 60 * 1000);
}

//? event listeners
//?------------------------------------
timerButtons.forEach(button => button.addEventListener('click', startTimer));

document.customTimeForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const time = this.timeReturn.valueAsDate;
  if (!time) {
    endTime.textContent = `Please select a valid time to return`;
    return;
  }
  clearInterval(countdown);
  timerDisplay.textContent = '';
  timeSelect(time);
  this.reset();
});

alarmButton.addEventListener('click', function (e) {
  e.preventDefault();
  clearTimeout(timeout);
  timeout = null;
  turnAlarmOff();
});
