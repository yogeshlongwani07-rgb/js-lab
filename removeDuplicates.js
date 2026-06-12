function removeDuplicates(arr) {
    // Your code here
    let newArr = [];
    for(let i=0; i<arr.length; i++){
        if(!newArr.includes(arr[i])){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

let arr = [1, 2, 2, 3, 4, 4, 5];
let ank = removeDuplicates(arr); // Output: [1, 2, 3, 4, 5]
console.log(ank);
