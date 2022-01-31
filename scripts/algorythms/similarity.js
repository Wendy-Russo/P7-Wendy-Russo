function compareString(string1, string2){
    let sim = 0
    let arrayString1 = Array.from(string1.toLowerCase());
    let arrayString2 = Array.from(string2.toLowerCase());

    for(let i = 0; i <= Math.min(string1.length,string2.length)-1; i++){
        if(arrayString1[i] == arrayString2[i]){
            sim += 1;
        }

        else if(arrayString1[i] == arrayString2[i+1] || arrayString1[i+1] == arrayString2[i]){
            sim += 0.5;
        }

    }
    return Math.trunc(sim / Math.max(string1.length,string2.length)*100);
}


console.log(compareString("Casserole.","Casserole")+" %")
console.log(compareString("Casserole","Casserole.")+" %")