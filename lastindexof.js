Array.prototype.myLastIndexOf = function(x){
    for(let i=this.length-1; i>=0; i--){
        if(this[i]===x){
            return i;
        }
    }
    return -1;
}

let arr = [2,4,5,6,8,2];
let ank = arr.myLastIndexOf(2);
