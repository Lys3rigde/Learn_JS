
let num = 266219;
let str = String(num);
let arr = str.split('');

let result = arr.reduce(function(a,b) {
    "use strict";
    return a*b;
});
 
console.log(result);

let deg = result ** 3;
let degstr = String(deg);
console.log(degstr.substring(0,2));