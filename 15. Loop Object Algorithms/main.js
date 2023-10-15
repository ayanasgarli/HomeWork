// JS task 1

// for (let x=10 ; x<100; x++) {
// if (x % 10 === 7) {
//     console.log(x);
// }
// }

// task 2

// for (let x = 11; x <= 99; x++) {
//     if (x % 11 === 0){
//     alert(x);
//     }
// }


// task 3

// let num = "210223"
// result = ""
// for(let i = 0; i < num.length; i++) {
//     result += num[i] + " "
// }
// console.log(result);

// task 4

// let num = "14325";
// let max = num [0];
// for (let i = 1; i < num.length; i++){
//     if (num[i] > max){
//         max = num[i]
//     }
// }
// console.log(max);


// task 5

// let num = "134";
// let sum = 0;
// let hasil = 1;

// for (let i = 0; i < num.length; i++) {
//     sum +=Number(num[i]);
//     hasil *= +num[i];
// }
// console.log(sum);
// console.log( hasil );
// console.log(sum / +num.length);


// task 6

// let num = "100"

// for(let i=1; i<= num; i++) {
//     if (num % i == 0){
//         console.log(i);
//     }
// }


// task 7

// let num = "100";
// let counter =  0

// for (let i = 1; i <= num; i++) {
//     if (num % i == 0) {
//         counter++;
//     }
// }
// console.log("counter", counter);


// task 8

// let arr = [5, 3, 6, 14, 1, 2, 9]
// console.log(arr);

// for(let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 == 1) {

//     console.log(`${arr[i]} elementinin indeksi = ${i}`);
//     }

// }


// task 9

// let arr = [5, 3, 6, 14, 1, 2, 9]
// console.log(arr);

// for(let i = 0; i < arr.length; i++) {
//     if (i % 2 == 1) {

//     console.log(`${arr[i]} elementinin indeksi = ${i}`);
//     }
// }


// task 10

// let arr = [5, 3, 6, 14, 1, 2, 9];
// let max = arr[0];

// console.log(arr);
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > max) {
//         max = arr[i];
//     }
// }
// console.log("max=", max);


// task 11

// let arr = [5, 3, 6, 14, 1, 2, 9];
// let maxeven = arr[0];

// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 === 0 && arr[i] > maxeven) {
//       maxeven = arr[i];
//     }
//   }
//   console.log("Cüt elementlərin maksimumu=", maxeven)


// task 12

// let arr = [5, 3, 6, 14, 1, 2, 9];
// let minindex = arr[0];

// let minelement = arr[9];
// let minelementindex = 0;

// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < minelement) {
//         minelement = arr[i];
//         minelementindex = i;
//     }
// }
// console.log( minindex );


// task 15

// let num = 3;
// let array = [8, 3, 4, 11, 9, 10];

// if (num, array) {
//   console.log(`${num} array'de var.`);
// } 
// else {
//   console.log(`${num} array'de yoxdur.`);
// }


// task 16

// let arr = [2, 9, -5, -4, "AzerBayCan", true, 12, "LANKARAN", "LimOn", 182, 4];
// let sum = 0;

// for (let i = 0; i < arr.length; i++) {
//   if ( arr[i] === 'number' && !isNaN(arr[i])) {
//     sum += arr[i];
//   }
// }

// console.log("Min ve max bashga sum=", sum);


// task 17

// let arr = [2, true, 9];

// for (let i = 0; i < arr.length; i++) {
//     if (typeof arr[i] === 'boolean') {
//       if (i > 0) {
//         console.log("Sol=", arr[i - 1]);
//       }
//       if (i < arr.length - 1) {
//         console.log("Sağ=", arr[i + 1]);
//       }
//     }
//   }


// task 18

// let arr = ["Azerbaycan", "Turkiya", "Rusiya"];
// let longword = arr[0];

//   for (let i = 1; i < arr.length; i++) {
//     if (typeof arr[i] === 'string' && arr[i].length > longword.length) {
//       longword = arr[i];
//     }
//     console.log("En uzun soz=", longword);
//   }
  


