let arr = [2,3,4,5,6];

function checkFirstMissingNumber(arr){
    for(let i=0; i<arr.length-1; i++){
        if(arr[i + 1] - arr[i] !== 1){
            return arr[i] + 1;
        }
    }
    return -1;
}

let ank = checkFirstMissingNumber(arr);
console.log(ank); 
