String.prototype.myToLowerCase = function(){
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    for(let i=0; i<this.length; i++){
        let char = this[i];
        let index = upper.indexOf(char);
        if(index === -1){
            result += char;
        }else{
            result += lower[index];
        }
    }
    return result;
}
