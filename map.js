Array.prototype.myPush = function(x){
    this[this.length] = x;
    return this.length;
}

Array.prototype.myMap = function(callback){
    let newArr = [];
    for(let i=0; i<this.length; i++){
        newArr.myPush(callback(this[i],i,this));
    }
    return newArr;
}

let arr = [2,5,6,2,1];
let ank = arr.myMap((num)=>{
    return num*2;
});
console.log(ank);

