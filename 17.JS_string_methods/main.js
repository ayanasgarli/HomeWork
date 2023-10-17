// task 1
// let text = "Javascript_string_methods" ;
//     result = text.replace(/_/g, "-");
// console.log(result);


// task 2
// let string = (text) => {
//     return text.toLowerCase();
//   };
  
//   let orgText = "This is a sample text.";
//   result = string(orgText);
  
//   console.log(result); 
  

//task 3
// let word = "  hey  ";  
// let result = (function(text) {
//                 text = text.trim();
//                 let letter = text.split('');
//                 return letter;
//             })  
//             (word);
// console.log(result);


//task 4
// let string = (input) => {
//     let newString = input.toLowerCase().replaceAll(/\s/g, '-');
//     return newString;
//   };
// let inputString = "Robin Singh from USA";
// let newText = string(inputString);
// console.log(newText); 
  

// task 5
// function capitalizeFirstLetter(input) {
//     return input.charAt(0).toUpperCase() + input.slice(1);
//   }

// let inputText = 'js string exercises';
// let capitalizeOutput = capitalizeFirstLetter(inputText);
// console.log(capitalizeOutput);
  

// task 6
// let countUpperLetters = (input) => {
//     let upperCount = (input.match(/[A-Z]/g) || []).length;
//     return upperCount;
//   };

//   let inputString = 'There Are Two Types Of Web Development';
//   let upperCount = countUpperLetters(inputString);
//   console.log(upperCount);
  

// task 7
// function findWordInSentence(word, sentence) {
//     let index = sentence.indexOf(word);
//     if (index !== -1) {
//       return {
//         isFound: true,
//         index: index
//       };
//     } else {
//       return {
//         isFound: false,
//         index: -1
//       };
//     }
//   }
// let check = 'development'; 
// let sentence = 'There Are Two Types Of Web development'; 
// let result = findWordInSentence(check, sentence);
// console.log(result); 
  

// task 8
// function human(name, surname, birthYear, birthCity) {
//     this.name = name;
//     this.surname = surname;
//     this.birthYear = birthYear;
//     this.birthCity = birthCity;
//     this.getFullName = function() {
//       return this.name + ' ' + this.surname;
//     };
//   }
  
// let person1 = new human('Ayan', 'Asgarli', 2004, 'Baku');
// let person2 = new human('Nurana', 'Orudjova', 2003, 'Ankara');
// let person3 = new human('Fidan', 'Valiyeva', 2001, 'Tbilisi');
// let person4 = new human('Rasul', 'Huseynov', 2005, 'Moscow');
// let person5 = new human('Vasiv', 'Huseynov', 2002, 'Istanbul');
  
// let people = [person1, person2, person3, person4, person5];
  
// function searchByFullName(searchString, peopleArray) {
//     searchString = searchString.toLowerCase();
  
//     let results = [];

//     for (let person of peopleArray) {
//       let fullName = person.getFullName().toLowerCase();
  
//       if (fullName.includes(searchString)) {
//         results.push(person);
//       }
//     }
//     return results;
//   }
  
// let searchInput = prompt('Axtarmaq istediyiniz ad soyadi daxil edin').toLowerCase();

// let searchResults = searchByFullName(searchInput, people);
//   if (searchResults.length === 0) {
//     console.log('Netice tapilmadi');
//   } else {
//     console.log('Neticeler:');
//     for (let result of searchResults) {
//       console.log(result.getFullName());
//     }
//   }
  