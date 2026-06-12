function isSubarray(arr1, arr2) {
    // Your code here
    let count = 1;
    for(let i=0; i<arr1.length; i++){
        for(let j=0; j<arr2.length; j++){
            if(arr1[i]===arr2[j]){
                if(arr1[i+1]===arr2[j+1]){
                    count++;
                }
            }
        }
    }
    if(count>1){
        return true;
    }else{
        return false;
    }
}

let arr1 = [1, 2, 3];
let arr2 = [4, 1, 2, 3, 5];
let ank = isSubarray(arr1, arr2); // Output: true
console.log(ank);
