Array.prototype.myUnshift = function(x){
    for(let i=this.length-1; i>=0; i--){
        this[i+1] = this[i];
    }
    this[0] = x;
    return this.length;
}

//pending for multiple elments