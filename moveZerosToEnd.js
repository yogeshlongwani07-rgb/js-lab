function moveZerosToEnd(arr) {
    // Your code here
    for(let i=0; i<arr.length; i++){
        if(arr[i]===0){
            let ann = arr.splice(i,1);
            arr.push(ann[0]);
        }
    }
    return arr;
}

let arr = [0, 1, 3, 12, 0, 8];
let ank = moveZerosToEnd(arr); // Output: [1, 3, 12, 0, 0]
console.log(ank);
