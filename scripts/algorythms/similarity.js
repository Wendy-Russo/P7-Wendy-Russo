"use strict";

function compareString( string1, string2){

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

function isUnique(testArray,testString){
    for (let arrayID = 0; arrayID < testArray.length; arrayID++) {
        if(compareString(testString,testArray[arrayID]) > similarityTreshold){
            return false;
        }
    }
    return true;
}


console.log(compareString("lait de coco","lait de coco")+" %")