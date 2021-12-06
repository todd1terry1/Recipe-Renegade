var recipeDetailsEl = document.querySelector("#recipe-article")

var getRecipeId = function () {
    // Grab recipe id from url query string.
    var queryString = document.location.search;
    // var recipeID = queryString.split("=");
    // var recipeSearch = queryString.split("=")[1];
    var array = [];
    queryString.split('=').forEach(function (value) {
        array.push(value.split('&'));
    });

    var recipeID = array[2][0];
    var recipeSearch = array[1][0];

    if (recipeID) {
        loadRecipe(recipeID);
        updateBackBtn(recipeSearch);
    } else {
        document.location.replace("./index.html");
    }
};

function updateBackBtn (recipeSearch){
    $(".backbtn").attr("href", "./second-page.html?q=" + recipeSearch);
}
// function to display recipe data
var detailedRecipe = function (data) {

    // create h2 for recipe title, add class for styling, and pull title from data.title
    var recipeTitleEl = document.createElement("h2");
    recipeTitleEl.classList.add("recipe-name");
    recipeTitleEl.textContent = data.title;
    // create img for recipe image, add src Attribute assigning URL from data.image
    var recipeImgEl = document.createElement("img");
    recipeImgEl.setAttribute("src", data.image);
    recipeImgEl.setAttribute("id", "placeholder")
    // container for recipe overview and class for styling
    var recipeOverviewEl = document.createElement("div");
    recipeOverviewEl.classList.add("recipe-overview");
    // create p to display prep time pulled from data
    var recipePrepTime = document.createElement("p");
    recipePrepTime.textContent = "Prep: " + data.preparationMinutes;
    // create p to display cook time pulled from data
    var recipeCookTime = document.createElement("p");
    recipeCookTime.textContent = "Cook: " + data.cookingMinutes + " mins";
    // create p to display total time pulled from data
    var recipeTotalTime = document.createElement("p");
    recipeTotalTime.textContent = "Total: " + data.readyInMinutes + " mins";
    // create p to display servings pulled from data
    var recipeServings = document.createElement("p");
    recipeServings.textContent = "Servings: " + data.servings;
    // container for recipe ingredients
    var recipeIngredients = document.createElement("div");
    recipeIngredients.classList.add("recipe-ingredients");
    var recipeIngredientsList = document.createElement("ul");
    var recipeIngredientListItem = document.createElement("li");
    // container for recipe directions
    var recipeDirections = document.createElement("div");
    recipeDirections.classList.add("recipe-directions");
    recipeDirections.textContent = data.instructions;
    
    // for loop to create and append li to show each ingredient
    for (var i = 0; i < data.extendedIngredients.length; i++) {
        var recipeIngredientListItem = document.createElement("li");
        recipeIngredientListItem.textContent = data.extendedIngredients[i].original;

        recipeIngredientsList.append(recipeIngredientListItem)
    }

    // Append the recipe overview elements to their appropriate sections.
    recipeOverviewEl.append(recipePrepTime, recipeCookTime, recipeTotalTime, recipeServings);
    recipeIngredients.append(recipeIngredientsList)
    recipeDetailsEl.append(recipeTitleEl, recipeImgEl, recipeOverviewEl, recipeIngredients, recipeDirections);
};

// spoonacular api call for recipe information
var loadRecipe = function (id) {
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "2c6a28b8bamsh4fa138d603fa741p192f0ajsn19a4adcc2247",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(response => {
            response.json().then(function (data) {
                console.log(data);
                detailedRecipe(data);
            });
        })
        .catch(err => {
            console.error(err);
        });
};

getRecipeId();