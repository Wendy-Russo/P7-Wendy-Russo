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
let foundIngredientsTagsArray = [];
let foundUstensilsTagsArray = [];


function searchInArray(treshold,inputArray,search,outputArray){
    if(search.length > treshold){
        for (let ingredientID = 0; ingredientID < inputArray.length; ingredientID++) {
            let add = false;
            let ingredient = inputArray[ingredientID];

            for (let letterID = 0; letterID < ingredient.length; letterID++) {

                if(ingredient[letterID] === search[0] && ingredient.slice(letterID,letterID+(search.length)) === search){
                    add = true;
                }
            }
            if(add){
                outputArray.push(inputArray[ingredientID]);
            }
        }
    }
    else{
        outputArray = []
        outputArray = inputArray;

        console.log(inputArray);

    }
}


function search(type,search){
    search = search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let searchArray = [];
    foundRecipesArray = [];

    foundUstensilsTagsArray = [];
    foundIngredientsTagsArray = [];
    //let resultsArray = [];

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
            for (let letterID = 0; letterID < searchString.length; letterID++) {
                if(searchString[letterID] === search[0] && searchString.slice(letterID,letterID+(search.length)) === search){
                    add = true;
                }
            }

            //Adds the right recipes to the page
            if(add){

                foundRecipesArray.push(recipes[recipeID]);
                for (let ingredientID = 0; ingredientID < recipes[recipeID].ingredients.length; ingredientID++) {
                    filterDifferent(foundIngredientsArray,recipes[recipeID].ingredients[ingredientID].ingredient,83);
                }

                filterDifferent(foundAppliancesArray,recipes[recipeID].appliance,77);

                for (let ustensilsID = 0; ustensilsID < recipes[recipeID].ustensils.length; ustensilsID++) {
                    filterDifferent(foundUstensilsArray,recipes[recipeID].ustensils[ustensilsID],83);
                }
            }
        }
    }
    if(type === 2){
        if(search.length > 0){
            for (let ingredientID = 0; ingredientID < foundIngredientsArray.length; ingredientID++) {
                let add = false;

                let ingredient = foundIngredientsArray[ingredientID];

                for (let letterID = 0; letterID < ingredient.length; letterID++) {

                    if(ingredient[letterID] === search[0] && ingredient.slice(letterID,letterID+(search.length)) === search){
                        add = true;
                        console.log(ingredient)
                    }
                }
                if(add){
                    foundIngredientsTagsArray.push(foundIngredientsArray[ingredientID]);
                }
            }
        }
        else{
            foundIngredientsTagsArray = foundIngredientsArray;
        }
    }
    if(type === 3){
        searchInArray(0,foundUstensilsArray,search,foundUstensilsTagsArray);
    }
}



function removeAllChildren(dom){
    while(dom.firstElementChild){
        dom.firstElementChild.remove();
    }
};

function displayRecipes(array){
    removeAllChildren(recipeGallery);
    for (let foundRecipesID = 0; foundRecipesID < array.length; foundRecipesID++) {
        const ingredientDropdownFac = recipeFactory(array[foundRecipesID]);
        const recipeOption = ingredientDropdownFac.getUserCardDOM();
        recipeGallery.appendChild(recipeOption);
    }
}

function displayTag(array,dom){

    sortAlphabet(array);
    removeAllChildren(dom);
    for (let foundTagID = 0; foundTagID < array.length; foundTagID++) {

        const ingredientDropdownFac = recipeFactory(array[foundTagID]);
        const tagOption = ingredientDropdownFac.getIngredientOptionDom();
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

mainSearchBar.addEventListener('input',function(e){

    search(1,e.target.value);

    displayRecipes(foundRecipesArray);
    displayTag(foundIngredientsArray,ingredientDropList.firstElementChild);
    displayTag(foundAppliancesArray, appareilDropList.firstElementChild);
    displayTag(foundUstensilsArray, ustensilsDropList.firstElementChild);
});

ingredientsTagsSearchBar.addEventListener('input',function(e){
    search(2,e.target.value);
    displayTag(foundIngredientsTagsArray,ingredientDropList.firstElementChild);
});

ustensilsTagsSearchBar.addEventListener('input',function(e){
    search(3,e.target.value);
    displayTag(foundUstensilsTagsArray,ustensilsDropList.firstElementChild);

    if(e.target.value.length === 0){
        displayTag(foundUstensilsArray,ustensilsDropList.firstElementChild);
    }
});

// COMPARES AN INPUT STRING TO ALL MEMBERS OF THE ARRAY AND ADDS IT TO THAT ARRAY IF NO MEMBER IS SIMILAR TO IT BEYOND THE THRESHOLD
function filterDifferent(addToArray,elementToAdd,treshold){
    //addToArray = [];
    if(!addToArray.length){
        addToArray.push(elementToAdd);
    }
    else{
        let add = true;

        for(let i = 0; i < addToArray.length;i++){
            if(compareString(elementToAdd,addToArray[i]) >= treshold){
                add = false;
            }
            else{
                //console.log(addToArray[i]+"/"+elementToAdd+"/"+compareString(elementToAdd,addToArray[i]))
            }

        }
        if(add){
            addToArray.push(elementToAdd);
        }
    }
}



/*
let allIngredientsFiltered = [];
let allAppliancesFiltered = [];
let allUstensilsFiltered = [];
let recipesToDisplay = []

let defaultRecipes = []
for(let i = 0 ; i < 10;i++){
    defaultRecipes.push(recipes[i])
}

//  IDS OF RECIPES TO DISPAY (CURRENTLY MATCH RECIPES ARRAY INDEXES+1, THEY MIGHT STOP MATCHING IF YOU SORT THEM)
//  THIS IS THE ID OF THE RECIPE ITSELF NOT OF IT'S POSITION IN ITS ARRAY

// COMPARES AN INPUT STRING TO ALL MEMBERS OF THE ARRAY AND ADDS IT TO THAT ARRAY IF NO MEMBER IS SIMILAR TO IT BEYOND THE THRESHOLD
function filterDifferent(addToArray,elementToAdd,treshold){
    if(addToArray.length == 0){
        addToArray.push(elementToAdd);
    }
    else{
        let add = true;
        for(let i = 0; i < addToArray.length;i++){
            if(compareString(elementToAdd,addToArray[i]) >=  treshold){
                add = false;
            }
        };
        if(add == true){
            addToArray.push(elementToAdd);
        }
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

function removeAllChildren(dom){
    while(dom.firstElementChild){
        dom.firstElementChild.remove();
    }
};

function refreshTags(recipesObjects){

    //allIngredientsFiltered = [];

    //FILLS THE 3 ARRAYS WITH THE RIGHT FILTERED STRINGS
    for (let i = 0; i < recipesObjects.length;i++){

        for (let j = 0; j < recipesObjects[i].ingredients.length;j++){
            filterDifferent(allIngredientsFiltered,recipesObjects[i].ingredients[j].ingredient,.83);
        }
        filterDifferent(allAppliancesFiltered,recipesObjects[i].appliance,.83);

        for (let j = 0; j < recipesObjects[i].ustensils.length;j++){
            filterDifferent(allUstensilsFiltered,recipesObjects[i].ustensils[j],.83);
        }
    }

    refreshOneTagMenu(allIngredientsFiltered,ingredientDropList);
    refreshOneTagMenu(allAppliancesFiltered,appareilDropList);
    refreshOneTagMenu(allUstensilsFiltered,ustensilsDropList);
}

function refreshOneTagMenu(array,dom){

    sortAlphabet(array);
    removeAllChildren(dom.firstElementChild);
    //LOOPS AN ARRAY OF STRINGS OF THE TAGS TO ADD
    for(let i = 0; i < array.length;i++){
        dom.firstElementChild.appendChild(recipeFactory(array[i]).getIngredientOptionDom());
        let width = Math.ceil(array.length / 15) * 200 + 20;
        dom.firstElementChild.style.width , dom.style.width = width;
    }
}



refreshRecipes(defaultRecipes);
refreshTags(defaultRecipes);

mainSearchBar.addEventListener('input',function(e){
    let search = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    console.log(search);

    if(search.length > 2){
        let recipesToKeep = [];
        //Loops on every recipe
        for (let i = 0; i < recipes.length; i++){
            //Combines name description and ingredients to create a searchstring
            let searchString = recipes[i].name + recipes[i].description;
            for(let j = 0 ; j < recipes[i].ingredients.length ; j++){
                searchString += " " + recipes[i].ingredients[j].ingredient;
            }
            searchString = searchString.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            //checks the searchstring for the search input and returns true if it is found


            let add = false;
            for(let letterID = 0 ; letterID < searchString.length; letterID++){
                if(searchString[letterID] === search[0] && searchString.slice(letterID,letterID+(search.length)) === search){
                    add = true;
                }
            }

            if(add){
                recipesToKeep.push(recipes[i]);
            }
        }

        if(recipesToKeep){
            refreshRecipes(recipesToKeep);
            refreshTags(recipesToKeep);
        }
    }
});

ingredientsTagsSearchBar.addEventListener('input',function(e){
    console.log("1")
    let search = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let ingredientsToKeep = [];
    console.log("2")
    for (let i = 0 ; i < allIngredientsFiltered.length ; i++){
        console.log("3")
        let ingredient = allIngredientsFiltered[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        let add = false;
        console.log("4")
        for(let letterID = 0 ; letterID < ingredient.length ; letterID++){
            console.log("5")
            if(ingredient[letterID] === search[0] && ingredient.slice(letterID,letterID+(search.length)) === search){
                add = true;
            }
        }

        if(add){
            ingredientsToKeep.push(ingredient);
        }

    }
    console.log(ingredientsToKeep)
    if(ingredientsToKeep.length > 0){
        refreshOneTagMenu(ingredientsToKeep,ingredientDropList);

    }
    else{
        refreshOneTagMenu(allIngredientsFiltered,ingredientDropList);
    }

});
*/