Array.prototype.myFilter = function(callback){
    let newArr = [];
    for(let i=0; i<this.length; i++){
        if(callback(this[i],i,this)){
            newArr.push(this[i]);
        }
    }
    return newArr;
}

let arr = [2,4,5,6,7,8];
let ank = arr.myFilter((num)=>{
    return num % 2 === 0;
});
console.log(ank);