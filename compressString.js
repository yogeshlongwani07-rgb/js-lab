// function compressString(str) {
//     // Your code here
//     let count = 1;
//     let newStr = "";
//     for(let i=0; i<str.length; i++){
//         if(str[i]===str[i+1]){
//             count++;
//         }else{
//             newStr += str[i] + count;
//             count = 1;
//         }
//     }

//     return newStr;
// }


function compressString(str) {
    let newStrstr = "";
    let count = 1;
    for(let i=0; i<str.length; i++){
        if(str[i]===str[i+1]){
            count++;
        }else{
            str += str[i] + count;
            count = 1;
        }
    }
    return newStrstr;
}

let str = "aaaaabbbcccc";
let ank = compressString(str); // Output: "a3b3c4"
console.log(ank);

