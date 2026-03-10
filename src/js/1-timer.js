import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');



const start = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");

let userSelectedDate;
start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= Date.now()) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      start.disabled = true;
      return;
    } else {
            userSelectedDate = selectedDate;
    start.disabled = false;
    }


  },
};
const clockface = document.querySelector(".timer");
let intervalID;
flatpickr(input, options);
start.addEventListener(`click`, () => {
    start.disabled = true;
    input.disabled = true;
    const oldTime = Date.now();
console.log(`start`);

intervalID = setInterval(() => {
    console.log(`tick`);
const newTime = Date.now();
const time = newTime - oldTime;
console.log(time);


const diff = userSelectedDate - Date.now();
if (diff <= 0) {
clearInterval(intervalID);

input.disabled = false;
 return; 
};
addLeadingZero(convertMs(diff));



}, 1000);

});


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero({ days, hours, minutes, seconds }) {
daysValue.textContent = String(days).padStart(2, `0`);
hoursValue.textContent = String(hours).padStart(2, `0`);
minutesValue.textContent = String(minutes).padStart(2, `0`);
secondsValue.textContent = String(seconds).padStart(2, `0`);
}