function isPalindrome(arr) {
    // Your code here
    let newArr = [...arr].reverse();
    for(let i=0; i<arr.length; i++){
        if(newArr[i]!==arr[i]){
            return false;
        }
    }
    return true;
}

let arr = [1, 2, 3, 2, 1];
let ank = isPalindrome(arr); // Output: true
console.log(ank);
