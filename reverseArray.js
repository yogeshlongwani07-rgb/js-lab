function reverseArray(arr) {
    // Your code here
    let start = 0;
    let end = arr.length -1;
    while(start<end){
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
    return arr;
}

function reverseArray2(arr) {
    // Your code here
    let newArr = [];
    for(let i=arr.length-1; i>=0; i--){
        newArr.push(arr[i]);
    }
    return newArr;
}


let arr = [1, 2, 3, 4, 5];
let ans = reverseArra(arr); // Output: [5, 4, 3, 2, 1]
console.log(ans);
