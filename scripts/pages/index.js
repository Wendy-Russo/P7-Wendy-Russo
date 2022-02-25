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

let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

let mainSearchStrings = [];
let ingredientsSearchStrings = [];
let appliancesSearchStrings = [];
let ustensilsSearchStrings = [];

function formatString(string) {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function isUnique(testArray, testString) {
    return !testArray.some(element => compareString(element, testString) > 77);
}

function pushIfUnique(pushArray, pushString) {
    if (isUnique(pushArray, pushString)) {
        pushArray.push(pushString);
    }
}

function getDisplayedRecipesIDs() {
    return Array.from(recipesGallery.children).map(x => x.classList[0].substring(8, 10))
}


//_______DOM FUNCTIONS_______
function displayGallery(recipe) {
    recipesGallery.appendChild(recipeFactory(recipe).getRecipeDom());
}

function displayTag(dom, tag) {
    dom.firstElementChild.appendChild(recipeFactory(tag).getDropdownOptionDom());
}

function displayUniqueTag(dom, tag) {
    const addedTags = Array.from(dom.firstElementChild.children).map(child => child.innerHTML);
    if (isUnique(addedTags, tag)) {
        displayTag(dom, tag);
    }
}

function removeAllChild(dom) {
    while (dom.firstElementChild) {
        dom.firstElementChild.remove();
    }
}

function removeAllDom() {
    removeAllChild(recipesGallery);
    removeAllChild(ingredientsDropdown.firstElementChild);
    removeAllChild(appliancesDropdown.firstElementChild);
    removeAllChild(ustensilsDropdown.firstElementChild);
    if(document.getElementById("error-message")){
        document.getElementById("error-message").remove();
    }
}

function displayRecipeAndTag(recipe) {

    displayGallery(recipe);

    recipe.ingredients.forEach(ingredient => {
        displayUniqueTag(ingredientsDropdown, ingredient.ingredient);
    });

    displayUniqueTag(appliancesDropdown, recipe.appliance);

    recipe.ustensils.forEach(ustensil => {
        displayUniqueTag(ustensilsDropdown, ustensil);
    });
}

//___________________________________________________________________________________
//_____________________________Tags Functions__________________________________________
//___________________________________________________________________________________


function searchInTags(dropdownDom, inputDOM, tagsArray) {
    let search = formatString(inputDOM.value);

    removeAllChild(dropdownDom.firstElementChild)


    tagsArray.forEach(tag => {

        if (typeof (tag) === "string" && formatString(tag).includes(search)) {
            displayTag(dropdownDom, tag);
        }
    })
}

function searchFromTag(searchStringArray, DISPLAYED_IDS, searchTag) {

    searchStringArray.forEach(searchString => {

        const SEARCH_STRING_ID = parseInt(searchString.substring(0, 2)) - 1;

        if (DISPLAYED_IDS.some(id => id == SEARCH_STRING_ID) && formatString(searchString).includes(formatString(searchTag))) {

            displayRecipeAndTag(recipes[SEARCH_STRING_ID])

        }
    })
}

function addTags(dom, color, e, searchStringArray, DISPLAYED_IDS) {

    removeAllDom();

    if (e.path[0].outerHTML[1] === "a") {

        if (!Array.from(dom.children).some(a => a.innerHTML.includes(e.target.innerHTML))) {
            dom.appendChild(recipeFactory(e.target.innerHTML).getSelectedTagsDom(color))
        }
    }
    searchFromTag(searchStringArray, DISPLAYED_IDS, e.target.innerHTML)

    e.stopPropagation();
}

function searchFromTags(dom, searchString, searchIds) {

    let allTags = Array.from(dom.children).map(x => x.firstElementChild.innerHTML);

    if(allTags.length >0){
        removeAllDom();

        allTags.forEach(tag => {
            removeAllDom();

            searchFromTag(searchString, searchIds, tag)
        });
    }
}

function removeTags(e) {

    if (e.path[0].outerHTML[1] === "i") {
        removeAllDom();
        e.target.parentElement.remove();

        mainSearch(ALL_RECIPE_IDS);

        let searchIds = getDisplayedRecipesIDs();

        searchFromTags(ingredientsTagsDom, ingredientsSearchStrings, searchIds);
        searchFromTags(appliancesTagsDom, appliancesSearchStrings, searchIds);
        searchFromTags(ustensilsTagsDom, ustensilsSearchStrings, searchIds);

    }
}

//_______________________________________________________________________________

function splitRecipes(recipes, ) {
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredientObject => {

            pushIfUnique(allIngredients, ingredientObject.ingredient);

        })


        pushIfUnique(allAppliances, recipe.appliance);
        recipe.ustensils.forEach(ustensil => {
            pushIfUnique(allUstensils, ustensil);

        });
    });
}

function makeSearchStrings(recipes, type, array) {
    recipes.forEach(recipe => {
        let searchString = recipe.id + " ,";

        switch (type) {
            case "main":
                searchString += recipe.name + "," + recipe.description + ",";

            case "main":
            case "ingredients":
                searchString += recipe.ingredients.flatMap(ingredient => ingredient.ingredient).join();

            case "appliances":
                searchString += recipe.appliance;

            case "ustensils":
                searchString += recipe.ustensils.flatMap(ustensils => ustensils).join();
        }

        array.push(searchString);
    });
}

function displayDefault() {
    recipes.forEach(recipe => {
        recipesGallery.appendChild(recipeFactory(recipe).getRecipeDom());
        recipe.ingredients.forEach(ingredient => {

            displayUniqueTag(ingredientsDropdown, ingredient.ingredient);
        })

        displayUniqueTag(appliancesDropdown, recipe.appliance);

        recipe.ustensils.forEach(ustensil => {
            displayUniqueTag(ustensilsDropdown, ustensil)
        });
    })
}

function mainSearch(searchIds) {

    removeAllDom();

    if (recipesInput.value.length > 0) {

        mainSearchStrings.forEach(searchString => {

            if (formatString(searchString).includes(formatString( recipesInput.value))) {
                const recipeID = parseInt(searchString.substring(0, 2)-1);

                if(searchIds.includes(recipeID.toString())){
                    displayRecipeAndTag(recipes[recipeID]);
                }
            }
        })
    } else {
        searchIds.forEach(recipeID =>{
            displayRecipeAndTag(recipes[recipeID]);
        })
    }
}



splitRecipes(recipes);

makeSearchStrings(recipes, "main", mainSearchStrings);
makeSearchStrings(recipes, "ingredients", ingredientsSearchStrings);
makeSearchStrings(recipes, "appliances", appliancesSearchStrings);
makeSearchStrings(recipes, "ustensils", ustensilsSearchStrings);

displayDefault();

const ALL_RECIPE_IDS = getDisplayedRecipesIDs()

recipesInput.addEventListener("input", function (e) {
    if(e.target.value.length > 2){

        searchFromTags(ingredientsTagsDom, ingredientsSearchStrings, ALL_RECIPE_IDS);
        searchFromTags(appliancesTagsDom, appliancesSearchStrings, ALL_RECIPE_IDS);

        searchFromTags(ustensilsTagsDom, ustensilsSearchStrings, ALL_RECIPE_IDS);

        let recipesId = getDisplayedRecipesIDs();

        if(Array.from(ingredientsTagsDom.children).map(x => x.firstElementChild.innerHTML).length === 0){
            removeAllDom();
            recipesId = ALL_RECIPE_IDS;
        }

        mainSearch(recipesId);
    }

    if(! recipesGallery.firstElementChild && ! document.getElementById("error-message")){
        recipesGallery.parentElement.appendChild(recipeFactory().getErrorMessage());
    }


})

ingredientsInput.addEventListener("input", function () {
    searchInTags(ingredientsDropdown, ingredientsInput, allIngredients);
})

appliancesInput.addEventListener("input", function () {
    searchInTags(appliancesDropdown, allAppliances);
})

ustensilsInput.addEventListener("input", function () {
    searchInTags(ustensilsDropdown, allUstensils);
})

ingredientsDropdown.firstElementChild.addEventListener("click", function (e) {
    addTags(ingredientsTagsDom, "blue", e, ingredientsSearchStrings, getDisplayedRecipesIDs());
})

appliancesDropdown.firstElementChild.addEventListener("click", function (e) {
    addTags(appliancesTagsDom, "green", e, appliancesSearchStrings, getDisplayedRecipesIDs());
})

ustensilsDropdown.firstElementChild.addEventListener("click", function (e) {
    addTags(ustensilsTagsDom, "coral", e, ustensilsSearchStrings, getDisplayedRecipesIDs());
})

ingredientsTagsDom.addEventListener("click", function (e) {
    removeTags(e);
});

appliancesTagsDom.addEventListener("click", function (e) {
    removeTags(e);
});

ustensilsTagsDom.addEventListener("click", function (e) {
    removeTags(e);
});