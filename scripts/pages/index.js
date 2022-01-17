"use strict";
//ELEMENTS TO ADD ELEMENTS UNDER WITH THE FACTORY
const recipeGallery = document.querySelector(".recipe-gallery")
const ingredientDropList = document.querySelector("#ingredientDropList")
const appareilDropList = document.querySelector("#appareilDropList")
const ustensilsDropList = document.querySelector("#ustensilsDropList")
//IDS OF RECIPES TO DISPAY (CURRENTLY MATCH RECIPES ARRAY INDEXES+1, THEY MIGHT STOP MATCHING IF YOU SORT THEM)
//THIS IS THE ID OF THE RECIPE ITSELF NOT OF IT'S POSITION IN ITS ARRAY
let recipeToDisplay = [1,2,3,4,5,6,7,8]
/*for(let i = 0 ; i<50;i++){
if(recipeToDisplay.includes(recipes[i].id)){ <<<< OPTIONAL LONGER LOOP VERSION (USE IF I DECIDE TO SORT THE RECIPES)
HAPPENS FOR EVERY RECIPE THAT IS IN THE ARRAY*/
recipeToDisplay.forEach(element => {
    let recipe = recipes[element-1];
    //NEW FACTORY AND GALLERY ELEMENT FOR >>>EVERY RECIPE<<<
    const recipeFac = recipeFactory(recipe);
    const card = recipeFac.getUserCardDOM();
    recipeGallery.appendChild(card);
    //LOOPS EVERY INGREDIENT
    recipe.ingredients.forEach((element) => {
        //RESIZES THE BOX
        let width = Math.trunc(recipeToDisplay.length / 4) * 200 + 20;
        //document.querySelector('#ingredientsMenuButton').style.width = width; << RESIZES BUTTON
        ingredientDropList.firstElementChild.style.width = width;
        ingredientDropList.style.width = width;
        //NEW FACTORY AND OPTION FOR >>>EVERY INGREDIENT<<<
        const ingredientDropdownFac = recipeFactory(element);
        const ingredientOption = ingredientDropdownFac.getIngredientOptionDom();
        ingredientDropList.firstElementChild.appendChild(ingredientOption);
    });
    //NO LOOP NEEDED BC 1 APPLIANCE PER RECIPE
    //RESIZES THE BOX
    let width = Math.trunc(recipeToDisplay.length / 10) * 200 + 20;
    //document.querySelector('#appareilMenuButton').style.width = width; << RESIZES BUTTON
    appareilDropList.firstElementChild.style.width = width;
    appareilDropList.style.width = width;
    //NEW FACTORY AND APPLIANCE FOR >>>EVERY RECIPE<<<
    const appareilDropdownFac = recipeFactory(recipe);
    const appareilOption = appareilDropdownFac.getAppareilOptionDom();
    appareilDropList.firstElementChild.appendChild(appareilOption);
    //LOOPS THROUGH EVERY USTENSIL (MULTIPLE PER RECIPE)
    recipe.ustensils.forEach((element) => {
        //RESIZES THE BOX
        let width = Math.trunc(recipeToDisplay.length / 8) * 200 + 20;
        //document.querySelector('#ustensilsMenuButton').style.width = width; << RESIZES BUTTON
        ustensilsDropList.firstElementChild.style.width = width;
        ustensilsDropList.style.width = width;
        //NEW FACTORY AND OPTION FOR >>>EVERY USTENSIL<<<
        const ustensilsDropdownFac = recipeFactory(element);
        const ustensilsOption = ustensilsDropdownFac.getUstensilsOptionDom();
        ustensilsDropList.firstElementChild.appendChild(ustensilsOption);
    });
});
    //}
