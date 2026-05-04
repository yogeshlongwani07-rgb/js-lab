Array.prototype.myFindIndex = function(callback){
    for(let i=0; i<this.length; i++){
        if(callback(this[i],i,this)){
            return i;
        }
    }
    return -1;
}

let arr = [1,5,7,4,2,5,6,8];
let ank = arr.myFindIndex((num)=>{
    return num%2===0;
});
console.log(ank);