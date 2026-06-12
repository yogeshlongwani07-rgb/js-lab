let arr = [1,3,4,5,6,7];

function checkFirstMissingNumber(arr){
    for(let i=0; i<arr.length; i++){
        if((arr[i]-arr[i+1])!==-1){
            return arr[i]+1;
        }
    }
    return -1;
}

let ank = checkFirstMissingNumber(arr);
console.log(ank); 