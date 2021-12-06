var recipeListEl = document.querySelector("#recipe-list");
var searchResuleTitleEl = document.querySelector(".search-results-header");

var getRecipeInput = function () {
    var queryRecipeNameString = document.location.search;
    var recipeName = queryRecipeNameString.split("=")[1];

    if (recipeName) {
        generateRecipes(recipeName);
        saveRecentSearch(recipeName);
    } else {
        document.location.replace("./index.html");
    }
};

function saveRecentSearch(recipeName) {
    var recentSearches = JSON.parse(localStorage.getItem("recent-search")) || [];
    // Save typed in Recipe Searches
    recentSearches.push(recipeName);
    localStorage.setItem("recent-search", JSON.stringify(recentSearches));
}

function loadRecentSearch() {
    var loadedRecent = JSON.parse(localStorage.getItem("recent-search")) || [];
    loadedRecent.reverse();

    for (var i = 0 ; i < 6; i++) {
        var listEl = $("<li>").addClass("collection-item avatar");
        var anchorEl = $("<a>").attr("href", "./second-page.html?q=" + loadedRecent[i]);
        var imgEl = $("<i>").addClass("material-icons circle").text("folder");
        var pEl = $("<p>").addClass("black-text");
        var spanEl = $("<span>").addClass("recent-title").text(loadedRecent[i]);
        pEl.append(spanEl);
        anchorEl.append(imgEl,pEl)
        listEl.append(anchorEl);
        $(".collection").append(listEl);
    }

}

var displayDrinks = function (data, recipe) {
    searchResuleTitleEl.textContent = "Search Results: " + recipe;
    recipeListEl.innerHTML = "";

    for (var i = 0; i < data.drinks.length; i++) {

        // Create the elements to hold the recipe title, image and bake time.
        var recipeListItemEl = document.createElement("a");
        recipeListItemEl.classList.add("result");
        recipeListItemEl.setAttribute("href", "./fourth-page.html?id=" + data.drinks[i].idDrink);
        recipeListItemEl.setAttribute("data-id", data.drinks[i].idDrink);

        var recipeImgEl = document.createElement("img");
        recipeImgEl.setAttribute("src", data.drinks[i].strDrinkThumb);
        recipeImgEl.setAttribute("id", "placeholder")
        var recipeInfoEl = document.createElement("div");
        recipeInfoEl.classList.add("recipe-info");
        var recipeTitleName = document.createElement("p");

        // Setting the names of both the title and bake time.
        recipeTitleName.textContent = data.drinks[i].strDrink;

        // Appending the elements to their appropriate sections.
        recipeInfoEl.append(recipeTitleName);
        recipeListItemEl.append(recipeImgEl, recipeInfoEl);
        recipeListEl.append(recipeListItemEl);
    }
}

var generateCocktails = function (drink) {
    fetch("https://the-cocktail-db.p.rapidapi.com/randomselection.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "2c6a28b8bamsh4fa138d603fa741p192f0ajsn19a4adcc2247",
                "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
            }
        })
        .then(response => {
            response.json().then(function (data) {
                console.log(data);
                displayDrinks(data, "Cocktails");
            });
        })
        .catch(err => {
            console.error(err);
        });
}
var displayRecipes = function (data, recipe) {
    searchResuleTitleEl.textContent = "Search Results: " + recipe;
    recipeListEl.innerHTML = "";
    for (var i = 0; i < data.results.length; i++) {

        // Create the elements to hold the recipe title, image and bake time.
        var recipeListItemEl = document.createElement("a");
        recipeListItemEl.classList.add("result");
        recipeListItemEl.setAttribute("href", "./third-page.html?q=" + recipe + "&id=" + data.results[i].id);
        recipeListItemEl.setAttribute("data-id", data.results[i].id);

        var recipeImgEl = document.createElement("img");
        recipeImgEl.setAttribute("src", data.baseUri + data.results[i].image);
        recipeImgEl.setAttribute("id", "placeholder")
        var recipeInfoEl = document.createElement("div");
        recipeInfoEl.classList.add("recipe-info");
        var recipeTitleName = document.createElement("p");
        var recipeBakeTime = document.createElement("p");

        // Setting the names of both the title and bake time.
        recipeTitleName.textContent = data.results[i].title;
        recipeBakeTime.innerHTML = "Bake Time: " + data.results[i].readyInMinutes + " mins";

        // Appending the elements to their appropriate sections.
        recipeInfoEl.append(recipeTitleName, recipeBakeTime);
        recipeListItemEl.append(recipeImgEl, recipeInfoEl);
        recipeListEl.appendChild(recipeListItemEl);
    }
}
var generateTypeRecipes = function (type, recipe) {
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?type=" + type, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "91b01c1641mshdc2dde83b163e1ep177e07jsn1e7eabbac250",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(response => {
            response.json().then(function (data) {
                displayRecipes(data, recipe);
            });
        })
        .catch(err => {
            console.error(err);
        });
};
var generateRecipes = function (recipe) {
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + recipe, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "91b01c1641mshdc2dde83b163e1ep177e07jsn1e7eabbac250",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(response => {
            response.json().then(function (data) {
                displayRecipes(data, recipe);
            });
        })
        .catch(err => {
            console.error(err);
        });
};

$(".breakfast").click(() => generateTypeRecipes("breakfast", "Breakfast"));
$(".main-course").click(() => generateTypeRecipes("main course", "Main Course"));
$(".appetizer").click(() => generateTypeRecipes("appetizer", "Appetizer"));
$(".dessert").click(() => generateTypeRecipes("dessert", "Dessert"));
$(".cocktails").click(() => generateCocktails());

getRecipeInput();
loadRecentSearch();
$(document).ready(function () {
    $('.modal').modal();
});