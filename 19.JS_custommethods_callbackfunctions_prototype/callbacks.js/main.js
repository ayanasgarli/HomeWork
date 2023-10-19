//1
function greet(fullname, clb) {
    console.log('Hello' + ' ' + fullname);
    clb();
}
function callMe() {
    console.log('I am clb function');
}
greet('Ayan Asgarli', callMe);

//2
function displaySum(sum) {
    console.log(`sum is: ${sum}`);
}
function sum(num1, num2, clback) {
    let result = num1+num2;
    clback(result)
    return result;
}
let result = sum(4,9,displaySum);

//3
let arr = [1, 2, 3, 4, 5]
arr.forEach((item) => {
    console.log(item);
}
)