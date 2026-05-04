Array.prototype.mySplice = function(start,deleteCount){
    for(let i=start; i<this.length; i++){
        this[i] = this[i+deleteCount];
    }
    this.length = this.length - deleteCount;
}

//Remove elements and store them in `deletedItems`
//Add new elements at the start index