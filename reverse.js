Array.prototype.myReverse = function(){
    let start = 0;
    let end = this.length-1;
    while(start<end){
        let temp = this[start];
        this[start] = this[end];
        this[end] = temp;
        end--;
        start++;
    }
    return this;
}

let arr = [4,7,9];
let ank = arr.myReverse();
console.log(ank);