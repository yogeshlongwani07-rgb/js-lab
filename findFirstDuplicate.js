let arr = [1, 2, 3, 3, 4, 5, 6];

function findFirstDuplicate(arr){
    let newArr = [];
    for(let i=0; i<arr.length; i++){
        if(newArr.includes(arr[i])){
            return arr[i];
        }else{
            newArr.push(arr[i]);
        }
    }
    return -1;
}

let ank = findFirstDuplicate(arr);
console.log(ank);