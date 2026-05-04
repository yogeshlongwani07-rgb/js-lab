Array.prototype.myPush = function(x){
    this[this.length] = x;
    return this.length;
}
//Using push here please update when you see this code from another file

Array.prototype.mySlice = function(start,end){
    let total = start + end;
    
    if(total>this.length){
        total = this.length;
    }
    let newArr = [];
    for(let i=start; i<(total); i++){
        newArr.myPush(this[i]);
    }
    return newArr;
}

let arr = ["yogesh","heena","shanu"];
let ank = arr.mySlice(0,1);
console.log(ank);

//does not allow negative values and need improvment