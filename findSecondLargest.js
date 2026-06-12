function findSecondLargest(arr) {
    if (arr.length < 2) return null;

    let largest = arr[0];
    for(let i=1; i<arr.length; i++){
        if(arr[i]>largest){
            largest = arr[i];
        }
    }
    let n = arr.indexOf(largest);
    let copy = [...arr];
    copy.splice(n,1);
    let secondLargest = copy[0];
    for(let i=1; i<copy.length; i++){
        if(copy[i]>secondLargest){
            secondLargest = copy[i];
        }
    }
    return secondLargest;
}

let arr = [2,5,6,11,23,9,34,28,31,89,99];
let ank = findSecondLargest(arr);
console.log(ank);

