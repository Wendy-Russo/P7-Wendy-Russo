"use strict";
const recipeGallery = document.querySelector(".recipe-gallery")
let recipeToDisplay = [1,26,50,2]

for(let i = 0 ; i<50;i++){
    if(recipeToDisplay.includes(recipes[i].id)){
        const recipeFac = recipeFactory(recipes[i]);
        const card = recipeFac.getUserCardDOM();
        recipeGallery.appendChild(card);
    }
}
