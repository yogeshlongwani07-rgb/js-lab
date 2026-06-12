function intersection(arr1, arr2) {
    let newArr = [];
    // Your code here
    for(let i=0; i<arr1.length; i++){
        for(let j=0; j<arr2.length; j++){
            if(arr1[i]===arr2[j]){
                newArr.push(arr1[i]);
            }
        }
    }
    return newArr;
}

let arr1 = [1, 2, 3, 4];
let arr2 = [3, 4, 5, 6];
let ank = intersection(arr1, arr2); // Output: [3, 4]
console.log(ank);
