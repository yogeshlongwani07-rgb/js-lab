let myConcat = function(arr1,arr2){
    let arr = [];
    for(let i=0; i<arr1.length; i++){
        arr.push(arr1[i]);
    }
    for(let j=0; j<arr2.length; j++){
        arr.push(arr2[j]);
    }
    return arr;
}

let arr1 = [1,4,5];
let arr2 = [2,3,6];

let ank = myConcat(arr1,arr2);
console.log(ank);