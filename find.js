Array.prototype.myFind = function(callback){
    for(let i=0; i<this.length; i++){
        if(callback(this[i],i,this)){
            return this[i];
        }
    }
    return undefined;
}

let arr = [1,5,4,2,5,6,8];
let ank = arr.myFind((num)=>{
    return num%2===0;
});
console.log(ank);