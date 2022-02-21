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

function getDisplayedRecipesIDs() {
    return Array.from(recipesGallery.children).map(x => x.classList[0].substring(8, 10))
}

splitRecipes(recipes);

makeSearchStrings(recipes, "main", mainSearchStrings);
makeSearchStrings(recipes, "ingredients", ingredientsSearchStrings);
makeSearchStrings(recipes, "appliances", appliancesSearchStrings);
makeSearchStrings(recipes, "ustensils", ustensilsSearchStrings);

displayDefault();

const ALL_RECIPE_IDS = getDisplayedRecipesIDs()

recipesInput.addEventListener("input", function () {

    let time = (new Date().getSeconds()+new Date().getMilliseconds())
    //displayDefault()

    searchFromTags(ingredientsTagsDom, ingredientsSearchStrings, ALL_RECIPE_IDS);
    searchFromTags(appliancesTagsDom, appliancesSearchStrings, ALL_RECIPE_IDS);

    searchFromTags(ustensilsTagsDom, ustensilsSearchStrings, ALL_RECIPE_IDS);

    let recipesId = getDisplayedRecipesIDs();

    if(Array.from(ingredientsTagsDom.children).map(x => x.firstElementChild.innerHTML).length === 0){
        removeAllDom();
        recipesId = ALL_RECIPE_IDS;
    }

    mainSearch(recipesId);

    console.log((new Date().getSeconds()+new Date().getMilliseconds()) - time)
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



/*let mainSearchStrings = [];
let ingredientsSearchStrings = [];
let appliancesSearchStrings = [];
let ustensilsSearchStrings = [];

let allDisplayedIngredients = [];
let allDisplayedAppliances = [];
let allDisplayedUstensils = [];

recipes.forEach(recipe => {
    displayRecipeAndTags(recipe);
});

const ALL_RECIPES_IDS = getDisplayedRecipes();

let idsToSearchIn = ALL_RECIPES_IDS;

//_________UTILS FUNCTIONS__________

function formatString(string) {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getDisplayedRecipes() {
    return Array.from(recipesGallery.children).map(x => parseInt(x.classList[0].slice(8, 10)));
}

function makeSearchStrings(type, array) {
    recipes.forEach(recipe => {
        let searchString = recipe.id - 1 + " ,";

        switch (type) {
            case "main":
                searchString += recipe.name + "," + recipe.description + ",";

            case "main":
            case "ingredients":
                searchString += recipe.ingredients.flatMap(ingredient => ingredient.ingredient).join();

            case "appliances":
                searchString += "," + recipe.appliance + ",";

            case "ustensils":
                searchString += recipe.ustensils.flatMap(ustensils => ustensils).join();
        }

        array.push(searchString.toString());
    });
}

//_________DOM FUNCTIONS__________

function removeAllChild(dom) {
    while (dom.firstElementChild) {
        dom.firstElementChild.remove();
    }
}

function displayTag(dom, tag) {
    dom.firstElementChild.appendChild(recipeFactory(tag).getDropdownOptionDom());
}

function displayUniqueTag(dom, tag) {

    if (! getDisplayedTags(dom).some(displayedTag => compareString(displayedTag, tag) >= 77)) {
        displayTag(dom, tag);
    }
}

function displayRecipe(recipe) {
    recipesGallery.appendChild(recipeFactory(recipe).getRecipeDom());
}

function displaySelectedTag(dom, tag, color) {
    dom.appendChild(recipeFactory(tag).getSelectedTagsDom(color))
}

function displayUniqueSelectedTag(dom,tag,color) {

    if (! Array.from(dom.children).map(x => x.firstElementChild.innerHTML).some(displayedTag => compareString(displayedTag, tag) >= 77)) {
        displaySelectedTag(dom, tag, color);
    }
}

function displayRecipeAndTags(recipe) {
    displayRecipe(recipe);

    recipe.ingredients.forEach(ingredientObject => {
        displayUniqueTag(ingredientsDropdown, ingredientObject.ingredient);
    });

    displayUniqueTag(appliancesDropdown, recipe.appliance);

    recipe.ustensils.forEach(ustensil => {
        displayUniqueTag(ustensilsDropdown, ustensil)
    });
}

function getDisplayedTags(dom) {
    return Array.from(dom.firstElementChild.children).map(x => x.innerHTML);
}

//_________SEARCH FUNCTIONS__________
function isInString(string, search) {

    for (let letterID = 0; letterID < string.length - search.length + 1; letterID++) {

        const CROP_STRING = string.slice(letterID, letterID + search.length);

        if (compareString(formatString(CROP_STRING), formatString(search)) > 77) {
            return true;
        }
    }
    return false;
}

function searchDropdown(search, allDisplayed, dom) {

    removeAllChild(dom.firstElementChild);

    allDisplayed.forEach(tag => {

        if (isInString(tag, search)) {

            displayTag(dom, tag);

        }
    });

    if (search.length === 0) {

        allDisplayed.forEach(tag => {
            displayTag(dom, tag);
        });

    }
}

function searchInRecipes(search, searchStringArray, recipeIds,crop) {

    searchStringArray.forEach(searchString => {

        const ID = parseInt(searchString.slice(0, 2));

        if(recipeIds.includes(ID) && crop && searchString.split(",").some(x => compareString(formatString(x),search)>=70 )){ //formatString(x) === search
            displayRecipeAndTags(recipes[ID])
        }

        if (recipeIds.includes(ID) && !crop && formatString(searchString).includes(search)) {
            displayRecipeAndTags(recipes[ID])
        }
    })
};


function searchFromTags(e, displayedTagsDom, searchString, color,crop) {

    if (e.target.nodeName === "A") {
        removeAllChild(recipesGallery);
        removeAllChild(ingredientsDropdown.firstElementChild);
        removeAllChild(appliancesDropdown.firstElementChild);
        removeAllChild(ustensilsDropdown.firstElementChild);

        const CLICKED_TAG = e.target.innerHTML;

        displayUniqueSelectedTag(displayedTagsDom, CLICKED_TAG, color);

        searchInRecipes(formatString(CLICKED_TAG), searchString, idsToSearchIn,crop);
    }

    idsToSearchIn = getDisplayedRecipes();
}

//_________EVENT LISTENERS__________

makeSearchStrings("main", mainSearchStrings);
makeSearchStrings("ingredients", ingredientsSearchStrings);
makeSearchStrings("appliances", appliancesSearchStrings);
makeSearchStrings("ustensils", ustensilsSearchStrings);

recipesInput.addEventListener("input", function (e) { //__________MAIN SEARCH__________
    const timeA = new Date().getSeconds() + new Date().getMilliseconds()

    removeAllChild(recipesGallery);

    searchInRecipes(formatString(e.target.value), mainSearchStrings, idsToSearchIn);

    console.log((new Date().getSeconds() + new Date().getMilliseconds())-timeA)
})

ingredientsInput.addEventListener("input", function (e) { //__________INGREDIENT SEARCH__________

    searchDropdown(formatString(e.target.value), allDisplayedIngredients, ingredientsDropdown);

})

appliancesInput.addEventListener("input", function (e) { //__________APPLIANCES SEARCH__________
    searchDropdown(formatString(e.target.value), allDisplayedAppliances, appliancesDropdown);
})

ustensilsInput.addEventListener("input", function (e) { //__________USTENSILS SEARCH__________
    searchDropdown(formatString(e.target.value), allDisplayedUstensils, ustensilsDropdown);
})



ingredientsDropdown.addEventListener("click", function (e) { //__________INGREDIENT TAGS SEARCH__________
    //const DISPLAYED_IDS = Array.from(recipesGallery.children).map(x => x.classList[0].slice(8, 10))
    searchFromTags(e, ingredientsTagsDom, ingredientsSearchStrings, "blue",true);
    e.stopPropagation();
})

appliancesDropdown.addEventListener("click", function (e) { //__________APPLIANCES TAGS SEARCH__________

    searchFromTags(e, appliancesTagsDom, appliancesSearchStrings, "green",true);
    e.stopPropagation();
})

ustensilsDropdown.addEventListener("click", function (e) { //__________USTENSILS TAGS SEARCH__________

    searchFromTags(e, ustensilsTagsDom, ustensilsSearchStrings, "coral",true);
    e.stopPropagation();
})

ingredientsTagsDom.addEventListener("click", function (e) { //__________REMOVE TAGS__________

    if (e.target.nodeName === "I") {
        const SELECTED_TAGS = Array.from(ingredientsTagsDom.children).map(x => x.firstElementChild.innerHTML)
        e.target.parentElement.remove();

        Array.from(ingredientsTagsDom.children).map(x => x.firstElementChild.innerHTML)

        idsToSearchIn = ALL_RECIPES_IDS

        Array.from(ingredientsTagsDom.children).forEach(x => {
            searchInRecipes(formatString(x.firstElementChild.innerHTML), ingredientsSearchStrings, idsToSearchIn,true)
        });
        //searchFromTags(e, ustensilsTagsDom, ustensilsSearchStrings, "coral",true);

        //searchInRecipes(formatString(recipesInput.value), mainSearchStrings, ALL_RECIPES_IDS)
    }
})*/