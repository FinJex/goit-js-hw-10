// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const form = document.querySelector(`.form`);

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
        const delay = Number(form.delay.value);
        const state = form.state.value;
    
const promise = new Promise((res, rej) => {
    setTimeout(() => {
if(state===`fulfilled`){
    res(delay);
} else {
    rej(delay);
}
    }, delay);

}); 
promise.
then(delay => {
iziToast.show({
    color: `#59a10d`,
    message: `✅ Fulfilled promise in ${delay} ms`,
    position: `topRight`

});
})
.catch(delay => {
iziToast.show({
    message: `❌ Rejected promise in ${delay} ms`,
    color: `#ef4040`,
    position: `topRight`,
    

});
})
form.reset();

});
