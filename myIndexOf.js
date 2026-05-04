String.prototype.myIndexOf = function(x){
    for(let i=0; i<this.length; i++){
        if(this[i] == x){
            return i;
        }
    }
    return -1;
}

//this function only works for single characters but does not find substrings like "lo" in "hello"