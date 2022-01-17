"use strict";
const recipeGallery = document.querySelector(".recipe-gallery")
const ingredientDropList = document.querySelector("#ingredientDropList")
const appareilDropList = document.querySelector("#appareilDropList")
const ustensilsDropList = document.querySelector("#ustensilsDropList")
let recipeToDisplay = [1,2,3,4,5,6,7,8]

for(let i = 0 ; i<50;i++){
    if(recipeToDisplay.includes(recipes[i].id)){
        const recipeFac = recipeFactory(recipes[i]);
        const card = recipeFac.getUserCardDOM();
        recipeGallery.appendChild(card);
        recipes[i].ingredients.forEach((element) => {
            let width = Math.trunc(recipeToDisplay.length / 4) * 200 + 20
            //document.querySelector('#ingredientsMenuButton').style.width = width;
            ingredientDropList.firstElementChild.style.width = width;
            ingredientDropList.style.width = width;
            const ingredientDropdownFac = recipeFactory(element);
            const ingredientOption = ingredientDropdownFac.getIngredientOptionDom();
            ingredientDropList.firstElementChild.appendChild(ingredientOption);
        });

        let width = Math.trunc(recipeToDisplay.length / 10) * 200 + 20
        //document.querySelector('#appareilMenuButton').style.width = width;
        appareilDropList.firstElementChild.style.width = width;
        appareilDropList.style.width = width;
        const appareilDropdownFac = recipeFactory(recipes[i]);
        const appareilOption = appareilDropdownFac.getAppareilOptionDom();
        appareilDropList.firstElementChild.appendChild(appareilOption);

        recipes[i].ustensils.forEach((element) => {
            let width = Math.trunc(recipeToDisplay.length / 8) * 200 + 20
            //document.querySelector('#ustensilsMenuButton').style.width = width;
            ustensilsDropList.firstElementChild.style.width = width;
            ustensilsDropList.style.width = width;
            const ustensilsDropdownFac = recipeFactory(element);
            const ustensilsOption = ustensilsDropdownFac.getUstensilsOptionDom();
            ustensilsDropList.firstElementChild.appendChild(ustensilsOption);
        });

    }
}
