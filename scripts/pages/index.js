"use strict";
//  ELEMENTS TO ADD ELEMENTS UNDER WITH THE FACTORY
const recipeGallery = document.querySelector(".recipe-gallery");
const ingredientDropList = document.querySelector("#ingredientDropList");
const appareilDropList = document.querySelector("#appareilDropList");
const ustensilsDropList = document.querySelector("#ustensilsDropList");
const mainSearchBar = document.querySelector("#mainSearchBar");

const ingredientsTagsSearchBar = document.querySelector("#ingredientsMenuButton");
const ustensilsTagsSearchBar = document.querySelector("#ustensilsMenuButton");

let foundRecipesArray = [];
let foundIngredientsArray = [];
let foundAppliancesArray = [];
let foundUstensilsArray = [];

function search(type,search){
    search = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    foundRecipesArray = [];
    if(type === 1){

        foundIngredientsArray = [];
        foundAppliancesArray = [];
        foundUstensilsArray = [];

        for (let recipeID = 0; recipeID < recipes.length; recipeID++) {
            //Fills SearchArray with single strings made of Name Description and Ingredients

            //Creates SearchString made of Name Description and Ingredients
            let searchString = "";
            searchString += recipes[recipeID].id +" "+ recipes[recipeID].name +" "+ recipes[recipeID].description;
            for (let ingredientID = 0; ingredientID < recipes[recipeID].ingredients.length; ingredientID++) {
                searchString += " " + recipes[recipeID].ingredients[ingredientID].ingredient;
            }
            searchString = searchString.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            //Checks searchString for the search
            let add;
            for (let letterID = 2; letterID < searchString.length; letterID++) {
                if(searchString.slice(letterID,letterID+(search.length)) === search){
                    add = true;
                }
            }

            //Adds the right recipes to the page
            if(add){
                //Fills the foundRecipes Array
                foundRecipesArray.push(recipes[recipeID]);
                for (let ingredientID = 0; ingredientID < recipes[recipeID].ingredients.length; ingredientID++) {
                    filterDifferent(foundIngredientsArray,recipes[recipeID].id+" "+recipes[recipeID].ingredients[ingredientID].ingredient,83);
                }
                //Fills the foundRecipes Array
                filterDifferent(foundAppliancesArray,recipes[recipeID].id+" "+recipes[recipeID].appliance,77);
                //Fills the foundRecipes Array
                for (let ustensilsID = 0; ustensilsID < recipes[recipeID].ustensils.length; ustensilsID++) {
                    filterDifferent(foundUstensilsArray,recipes[recipeID].id+" "+recipes[recipeID].ustensils[ustensilsID],80);
                }
            }
        }
    }
}

function removeAllChildren(dom){
    while(dom.firstElementChild){
        dom.firstElementChild.remove();
    }
};

function displayDOM(array,dom,recipe){

    removeAllChildren(dom);

    for (let foundTagID = 0; foundTagID < array.length; foundTagID++) {
        const ingredientDropdownFac = recipeFactory(array[foundTagID]);
        let tagOption;
        if(recipe){
            tagOption = ingredientDropdownFac.getUserCardDOM();
        }
        else{
            tagOption = ingredientDropdownFac.getIngredientOptionDom();
        }
        dom.appendChild(tagOption);
    }
}

//SORTS ARRAY ALPHABETICALLY
function sortAlphabet(array){
    array.sort(function(a, b){
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })
};

function searchInArray(inputArray,search){
    search = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let foundUstensilsTagsArray = [];
    console.clear()
    if(search.length === 0){
        foundUstensilsTagsArray = inputArray;
    }
    else{
        console.log("-1")
        for (let ingredientID = 0; ingredientID < inputArray.length; ingredientID++) {
            console.log("0")
            let add = false;
            let ingredient = inputArray[ingredientID].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            console.log("1")
            for (let letterID = 2; letterID < ingredient.length; letterID++) {
                console.log("2")
                if(ingredient.slice(letterID,letterID+(search.length)) === search){
                    add = true;
                    console.log("found")
                }
            }
            if(add){
                foundUstensilsTagsArray.push(inputArray[ingredientID]);
                console.log('4')
            }
        }
    }
    return foundUstensilsTagsArray;
}


mainSearchBar.addEventListener('input',function(e){

    search(1,e.target.value);

    displayDOM(foundRecipesArray,recipeGallery,true);
    displayDOM(foundIngredientsArray,ingredientDropList.firstElementChild,false);
    displayDOM(foundAppliancesArray, appareilDropList.firstElementChild,false);
    displayDOM(foundUstensilsArray, ustensilsDropList.firstElementChild,false);
});

ingredientsTagsSearchBar.addEventListener('input',function(e){
    displayDOM(searchInArray(foundIngredientsArray,e.target.value),ingredientDropList.firstElementChild,false);
});

ustensilsTagsSearchBar.addEventListener('input',function(e){
    displayDOM(searchInArray(foundUstensilsArray,e.target.value),ustensilsDropList.firstElementChild,false);
});



// COMPARES AN INPUT STRING TO ALL MEMBERS OF THE ARRAY AND ADDS IT TO THAT ARRAY IF NO MEMBER IS SIMILAR TO IT BEYOND THE THRESHOLD
function filterDifferent(addToArray,elementToAdd,treshold){
    //You need at least 1 element in the array
    if(!addToArray.length){
        addToArray.push(elementToAdd);
    }
    else{
        let add = true;

        for(let i = 0; i < addToArray.length;i++){
            if(compareString(elementToAdd,addToArray[i]) >= treshold){
                add = false;
            }

        }
        if(add){
            addToArray.push(elementToAdd);
        }
    }
}
