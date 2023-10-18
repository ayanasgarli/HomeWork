const date = new Date("2023-02-21");
const formattedDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
console.log(formattedDate);

const now = moment();
const formattedNow = now.format('MMMM Do YYYY, HH:mm:ss');
console.log(formattedNow); 

const originalDate = moment('2023-02-21');
const newDate = originalDate.add(6, 'days');
console.log(newDate.format('MMMM Do YYYY')); 

const currentDate = new Date();
console.log(currentDate);


const datee = new Date();

const dayOfWeek = datee.getDay();
console.log(dayOfWeek);

const year = datee.getFullYear();
const month = datee.getMonth();
const day = datee.getDate();
const minute = datee.getMinutes();
const hour = datee.getHours();
console.log (year, month, day, hour, minute);