Array.prototype.myEvery = function(callback){
    for(let i=0; i<this.length; i++){
        if(!callback(this[i],i,this)){
            return false;
        }
    }
    return true;
}

let arr = [2,4,6,8,10];
let ank = arr.myEvery((num)=>{
    return num%2===0;
});
console.log(ank);