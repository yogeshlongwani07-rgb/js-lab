String.prototype.myToUpperCase = function(){
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for(let i=0; i<this.length; i++){
        let char = this[i];
        let index = lower.indexOf(char);
        if(index === -1){
            result += char;
        }else{
            result += upper[index];
        }
    }
    return result;
}
