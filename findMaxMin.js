function findMaxMin(arr) {
    // Your code here
    let min = arr[0];
    let max = arr[0];
    for(let i=1; i<arr.length; i++){
        if(arr[i]<min){
            min = arr[i]
        }
        if(arr[i]>max){
            max = arr[i];
        }
    }
    let result = `Min:${min},Max:${max}`
    return result;
}

let arr = [2, 5, 1, 8, 3, 10, 0];
let ank = findMaxMin(arr); // output is 0,10
console.log(ank);
