function majorityElement(arr) {
    // Your code here
    let highest = 1;
    let ret;
    let count = 0;
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr.length; j++){
            if(arr[i]===arr[j]){
                count++;
            }
        }
        if(count>highest){
            highest = count;
            ret = arr[i];
        }
        count = 0;
    }
    return ret;
}

let arr = [3, 3, 4, 2, 4, 4, 2, 4, 4];
let ank = majorityElement(arr); // Output: 4
console.log(ank);
