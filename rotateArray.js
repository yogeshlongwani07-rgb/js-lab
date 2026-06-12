function rotateArray(arr, k) {
    // Your code here
    let res = arr.splice(arr.length - k, k);
    arr.unshift(...res);
    return arr;
}

let arr = [1, 2, 3, 4, 5];
let ank = rotateArray(arr, 2); // Output: [4, 5, 1, 2, 3]
console.log(ank);
