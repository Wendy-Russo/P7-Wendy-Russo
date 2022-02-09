"use strict";

const recipesGallery = document.querySelector(".recipe-gallery");

const recipesInput = document.querySelector("#mainSearchBar");
const ingredientsInput = document.querySelector("#ingredientsMenuButton");
const appliancesInput = document.querySelector("#appareilMenuButton");
const ustensilsInput = document.querySelector("#ustensilsMenuButton");

const ingredientsDropdown = document.querySelector("#ingredientDropList");
const appliancesDropdown = document.querySelector("#appareilDropList");
const ustensilsDropdown = document.querySelector("#ustensilsDropList");

const ingredientsTagsDom = document.querySelector("#ingredientsTags");
const appliancesTagsDom = document.querySelector("#appliancesTags");
const ustensilsTagsDom = document.querySelector("#ustensilsTags");

let allRecipes = recipes;
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

function isUnique(testArray,testString){
    return ! testArray.some(element => compareString(element,testString) > 77);
}

function pushIfUnique(pushArray,pushString){
    if(isUnique(pushArray,pushString)){
        pushArray.push(pushString);
    }
}

function removeAllChild(dom){
    while(dom.firstElementChild){
        dom.firstElementChild.remove();
    }
}

allRecipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredientObject => {
        pushIfUnique(allIngredients,ingredientObject.ingredient);
    })
    pushIfUnique(allAppliances,recipe.appliance);
    recipe.ustensils.forEach(ustensil => {
        pushIfUnique(allUstensils,ustensil);
    });
});

allRecipes.forEach(recipe =>{
    recipesGallery.appendChild(recipeFactory(recipe).getRecipeDom())
})

allIngredients.forEach(ingredient =>{
    ingredientsDropdown.firstElementChild.appendChild(recipeFactory(ingredient).getDropdownOptionDom());
})

ingredientsInput.addEventListener("input",function(e){

    removeAllChild(ingredientsDropdown.firstElementChild)

    allIngredients.forEach(ingredient => {
        if(ingredient.includes(e.target.value)){
            ingredientsDropdown.firstElementChild.appendChild(recipeFactory(ingredient).getDropdownOptionDom());
        }
    })

})

allAppliances.forEach(appliance =>{
    appliancesDropdown.firstElementChild.appendChild(recipeFactory(appliance).getDropdownOptionDom());
})

allUstensils.forEach(ustensils =>{
    ustensilsDropdown.firstElementChild.appendChild(recipeFactory(ustensils).getDropdownOptionDom());
})

console.log(allIngredients);
console.log(allAppliances);
console.log(allUstensils);












/*

function makeSearchString(recipe,type){
    let searchString = "";
    switch (type){
        case "main":
            searchString += recipe.name + "," + recipe.description;
        case "main":
        case "ingredient":
            searchString += recipe.ingredients.map(ingredientObject => ingredientObject.ingredient);
        case"appliance":
            searchString += recipe.appliance;
        case "ustensil":
            searchString += recipe.ustensils.map(ustensil => ustensil)
    }
    return searchString;
}

recipesInput.addEventListener("input",function(e){

    resetDomArrays()

    recipes.forEach(recipe => {
        if(formatString(makeSearchString(recipe,"main")).includes(formatString(e.target.value))){
            displayRecipe(recipe);
        }
    });
})

ingredientsInput.addEventListener("input",function(e){

    removeAllChild(ingredientsDropdown.firstElementChild);

    ingredientsFound.forEach(ingredient => {

        if(formatString(ingredient).includes(formatString(e.target.value))){
            displayIngredient(ingredient);
        }
    });
})

appliancesInput.addEventListener("input",function(e){

    removeAllChild(appliancesDropdown.firstElementChild);

    appliancesFound.forEach(appliance => {

        if(formatString(appliance).includes(formatString(e.target.value))){
            displayAppliance(appliance);
        }
    });
})

ustensilsInput.addEventListener("input",function(e){

    removeAllChild(ustensilsDropdown.firstElementChild);

    ustensilsFound.forEach(ingredient => {
        if(formatString(ingredient).includes(formatString(e.target.value))){
            displayUstensil(ingredient);
        }
    });
})*/




//
















/*
function splitRecipe(recipe){

    for (let ingredientsID = 0; ingredientsID < recipe.ingredients.length; ingredientsID++) {
        if(isUnique(ingredientsFound,recipe.ingredients[ingredientsID].ingredient , false)){
            ingredientsFound.push(recipe.ingredients[ingredientsID].ingredient)
        }
    }

    if(isUnique(appliancesFound,recipe.appliance , false)){
        appliancesFound.push(recipe.appliance)
    }

    for (let ustensilsID = 0; ustensilsID < recipe.ustensils.length; ustensilsID++) {
        if(isUnique(ustensilsFound,recipe.ustensils[ustensilsID] , false)){
            ustensilsFound.push(recipe.ustensils[ustensilsID])
        }
    }
}

function isInString(searchIn , search){

    for (let letterID = 0; letterID < searchIn.length; letterID++) {

        if( formatString(searchIn.slice(letterID,letterID + search.length)) === formatString(search)){
            return true;
        }
    }
    return false;
}

function searchInArray(inputArray , search , dom , useRecipe){

    removeChildren(dom);

    for (let arrayID = 0; arrayID < inputArray.length; arrayID++) {

        let searchIn = inputArray[arrayID];
        let domChild = recipeFactory(inputArray[arrayID]).getDropdownOptionDom();

        if(useRecipe){
            searchIn = returnRecipeCombined(recipesFound(arrayID));
            domChild = recipeFactory(inputArray[arrayID]).getRecipeDom();
        }

        if(isInString(searchIn , search)){

            dom.appendChild(domChild);

        }
        else{
            console.log(0)
        }
    }
}

function returnRecipeCombined(recipe,type){

    let recipeCombined = "";

    if(type === "recipe"){
        recipeCombined = recipe.description + " " + recipe.name;
    }
    if(type === "recipe" || type === "ingredient"){
        for (let ingredientID = 0; ingredientID < recipe.ingredients.length; ingredientID++) {
            recipeCombined += recipe.ingredients[ingredientID].ingredient + " ";
        }
    }
    if(type === "appliance"){
        recipeCombined += recipe.appliance;
    }
    if(type === "ustensil"){
        for (let ustensilsID = 0; ustensilsID < recipe.ustensils.length; ustensilsID++) {
            recipeCombined += recipe.ustensils[ustensilsID];
        }
    }

    return recipeCombined;
}

function searchRecipes(searchString , type){

    ingredientsFound = [] ;
    appliancesFound = [] ;
    ustensilsFound = [] ;
    currentRecipes = [] ;

    removeChildren(recipesGallery);

    for (let arrayID = 0; arrayID < recipesFound.length; arrayID++) {

        let search = returnRecipeCombined(recipesFound[arrayID],type);

        if(isInString( search , searchString)){

            recipesGallery.appendChild(recipeFactory(recipesFound[arrayID]).getRecipeDom());
            currentRecipes.push(recipesFound[arrayID]);

            splitRecipe(recipesFound[arrayID]);
        }
    }

    refreshIngredients();
    refreshAppliances();
    refreshUstensils();
}

function mutiSearchRecipes(searchList,type){

    //recipesFound = recipes;

    for (let searchId = 0; searchId < searchList.length; searchId++) {

        searchRecipes(searchList[searchId],type);

        recipesFound = currentRecipes;
    }
}

function addTag(e,tagsArray,tagsDom,color){
    if(e.path[0].outerHTML[1] === "a"){

        if(isUnique(tagsArray,e.path[0].innerHTML)){
            tagsArray.push(e.path[0].innerHTML);
        }

        refreshTags(tagsArray,tagsDom,color)
    }
}

function removeTag(e,tagsDom,tagsList,color){

    for (let appliancesID = 0; appliancesID < tagsList.length; appliancesID++) {

        if(e.path[0].outerHTML[1] === "i" && e.target.previousElementSibling.innerHTML === tagsList[appliancesID]){

            tagsList.splice(appliancesID,1);

            refreshTags(tagsList,tagsDom,color);
        }
    }
}

function searchFromAllSources(){
    recipesFound = recipes;
    if(ingredientsTags.length > 0){
        mutiSearchRecipes(ingredientsTags,"ingredient");
    }
    if(appliancesTags.length > 0){
        mutiSearchRecipes(appliancesTags,"appliance");
    }
    if(ustensilsTags.length > 0){
        mutiSearchRecipes(ustensilsTags,"ustensil");
    }
    if(currentSearch.length > 0){
        searchRecipes(currentSearch,"recipe");
    }
    else if (ingredientsTags.length === 0 && appliancesTags.length === 0 && ustensilsTags.length === 0 && currentSearch.length === 0){
        recipesFound = recipes;
        searchRecipes("a","recipe");
    }
}

recipesFound = recipes;

refreshRecipes();

for (let recipesID = 0; recipesID < recipesFound.length; recipesID++) {
    splitRecipe(recipesFound[recipesID]);

}

refreshIngredients();
refreshAppliances();
refreshUstensils();

ingredientsInput.addEventListener("input",function(e){
    searchInArray(ingredientsFound , e.target.value ,  ingredientsDropdown);
})

appliancesInput.addEventListener("input",function(e){
    searchInArray(appliancesFound , e.target.value ,  appliancesDropdown);
})

ustensilsInput.addEventListener("input",function(e){
    searchInArray(ustensilsFound , e.target.value ,  ustensilsDropdown);
})

recipesInput.addEventListener("input", function(e){
    recipesFound = recipes;

    currentSearch = e.target.value;

    searchFromAllSources();

    recipesFound = currentRecipes;
})

ingredientsDropdown.addEventListener("click", function(e){
    addTag(e,ingredientsTags, ingredientsTagsDom ,"blue");
    searchFromAllSources();
})

appliancesDropdown.addEventListener("click", function(e){
    addTag(e,appliancesTags, appliancesTagsDom ,"green");
    searchFromAllSources();
})

ustensilsDropdown.addEventListener("click", function(e){
    addTag(e,ustensilsTags, ustensilsTagsDom ,"coral");
    searchFromAllSources();
})

ingredientsTagsDom.addEventListener("click", function(e) {
    removeTag(e,ingredientsTagsDom, ingredientsTags,"blue");
    searchFromAllSources();
})

appliancesTagsDom.addEventListener("click", function(e){
    removeTag(e,appliancesTagsDom, appliancesTags, "green");
    searchFromAllSources();
})

ustensilsTagsDom.addEventListener("click", function(e){
    removeTag(e,ustensilsTagsDom,ustensilsTags, "coral");
    searchFromAllSources();
})
console.log(ingredientsFound.every((element) => compareString("ananas", element) < similarityTreshold))
*/