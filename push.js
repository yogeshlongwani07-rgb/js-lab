Array.prototype.myPush = function(x){
    this[this.length] = x;
    return this.length;
}

//Only Supports Adding One Element 
//Need to fix this issue