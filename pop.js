Array.prototype.myPop = function(){
    if(this.length === 0 ) return undefined;
    let lastElement = this[this.length-1];
    this.length = this.length - 1;
    return lastElement;
}