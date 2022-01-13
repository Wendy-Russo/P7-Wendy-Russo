"use strict";
const recipeGallery = document.querySelector(".recipe-gallery")
let recipeToDisplay = [1,2,3,4,5,6,7,8,9]

for(let i = 0 ; i<50;i++){
    if(recipeToDisplay.includes(recipes[i].id)){
        const recipeFac = recipeFactory(recipes[i]);
        const card = recipeFac.getUserCardDOM();
        recipeGallery.appendChild(card);
    }
}
