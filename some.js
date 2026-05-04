Array.prototype.mySome = function(callback){
    for(let i=0; i<this.length; i++){
        if(callback(this[i],i,this)){
            return true;
        }
    }
    return false;
}

let arr = [2,33,4,5,6];
let ank = arr.mySome((num)=>{
    return num%7===0;
});
console.log(ank);