// // task 1
// String.prototype.isBlank = function() {
//     for (let i = 0; i < this.length; i++) {
//       if (this[i] !== ' ') {
//         return false;
//       }
//       else {
//         return true; 
//       }
//     }
//   };
  
// let firstString = "   ";
// let secondString = "Hello, World!";
// console.log(firstString.isBlank());    
// console.log(secondString.isBlank());   
  

// // task 2
// String.prototype.wavy = function() {
//     let result = "";
//     for (let i = 0; i < this.length; i++) {
//       if (i % 2 === 0) {
//         result += this[i].toLowerCase();
//       } else {
//         result += this[i].toUpperCase();
//       }
//     }
//     return result;
//   };
// let inputString = "salam";
// let wavyString = inputString.wavy();
// console.log(wavyString);


// // task 3
// Array.prototype.min = function() {
//   if (this.length === 0) {
//     return undefined;
//   }
//   let min = this[0];
//   for (let i = 1; i < this.length; i++) {
//     if (this[i] < min) {
//       min = this[i];
//     }
//   }
//   return min;
// };

// Array.prototype.max = function() {
//   if (this.length === 0) {
//     return undefined; //
//   }
//   let max = this[0];
//   for (let i = 1; i < this.length; i++) {
//     if (this[i] > max) {
//       max = this[i];
//     }
//   }
//   return max;
// };
// let num = [8, 3, 5, 12, 6, 35];
// console.log(num.min());
// console.log(num.max()); 


// // task 4
// Array.prototype.numbers = function() {
//   let count = 0;
//   for (let i = 0; i < this.length; i++) {
//     if (typeof this[i] === 'number') {
//       count++;
//     }
//   }
//   return count;
// };
// let arr = [1, "salam", 2, 7, true, 12, false];
// let numberOfNumbers = arr.numbers();
// console.log(numberOfNumbers); 


// // task 5
// Array.prototype.myFind = function(valueToFind) {
//   for (let i = 0; i < this.length; i++) {
//     if (this[i] === valueToFind) {
//       return true;
//     }
//   }
//   return false;
// };
// let arr = [1,3,5,7];
// let valueToFind = 5;
// console.log(arrr.myFind(valueToFind)); 


// // task 6
// Array.prototype.myFindAll = function(valueToFind) {
//   let count = 0;
//   for (let i = 0; i < this.length; i++) {
//     if (this[i] === valueToFind) {
//       count++;
//     }
//   }
//   return count === 0 ? -1 : count;
// };
// let arr = [1, 3, 5, 7];
// let valueToFind = 2;
// console.log(arr.myFindAll(valueToFind));


// // task 7
// Array.prototype.myFilter = function(min, max) {
//   const filteredArray = [];
//   for (let i = 0; i < this.length; i++) {
//     if (this[i] >= min && this[i] <= max) {
//       filteredArray.push(this[i]);
//     }
//   }
//   return filteredArray;
// };
// let arr = [2, 1, 4, 3, 7, 9, 5];
// arr.sort(function(a, b) {
//   return a - b;
// });
// console.log(arr);
// let filteredArray = arr.myFilter(3, 8);
// console.log(filteredArray);


// // task 8
// Array.prototype.myIndexOf = function(valueToFind) {
//   for (let i = 0; i < this.length; i++) {
//     if (this[i] === valueToFind) {
//       return i;
//     } 
//   }
//   return -1; 
// };
// let arr = [2, 1, 5, 4, 3, 7, 9, 5];
// let valueToFind = 5;
// console.log(arr.myIndexOf(valueToFind)); 


// // task 9
// Array.prototype.myLastIndexOf = function(valueToFind) {
//   for (let i = this.length - 1; i >= 0; i--) {
//     if (this[i] === valueToFind) {
//       return i;
//     }
//   }
//   return -1; 
// };
// let arr = [2, 1, 5, 4, 3, 7, 9, 5];
// let valueToFind = 5;
// console.log(arr.myLastIndexOf(valueToFind));


// // task 10
// Array.prototype.myMap = function() {
//   return this.slice();
// };
// let arr = [1, 2, 3, 4, 5];
// let copyArr = arr.myMap();
// console.log(copyArr);
// console.log(arr === copyArr); 





