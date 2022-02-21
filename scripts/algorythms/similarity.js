"use strict";

/**
 * @param {String} string1
 * @param {String} string2
 * @returns number
 */
function compareString( string1, string2){

    if(string1 === string2){
        return 100;
    }

    let sim = 0;

    for(let i = 0; i <= Math.min(string1.length,string2.length)-1; i++){

        if(string1[i] === string2[i]){
            sim += 1;
        }

        else if(string1[i] === string2[i+1] || string1[i+1] === string2[i]){
            sim += 0.5;
        }

    }
    return Math.trunc((sim / ( Math.max(string1.length,string2.length ) ) ) * 100);
}
