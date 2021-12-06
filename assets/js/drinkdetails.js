var drinkDetailsEl = document.querySelector("#recipe-article")

var getCocktailID = function () {
    var queryCocktailIdString = document.location.search;
    var cocktailID = queryCocktailIdString.split("=")[1];

    if (cocktailID) {
        loadDrink(cocktailID);
        updateBackBtn();
    } else {
        document.location.replace("./index.html");
    }
};
function updateBackBtn (drinkSearch){
    $(".backbtn").attr("href", "./second-page.html?q=Cocktails");
}
// function to display drink data
var detailedDrink = function (data) {

    // create h2 for drink title, add class for styling, and pull title from data.title
    var drinkTitleEl = document.createElement("h2");
    drinkTitleEl.classList.add("recipe-name");
    drinkTitleEl.textContent = data.drinks[0].strDrink;
    // create img for drink image, add src Attribute assigning URL from data.image
    var drinkImgEl = document.createElement("img");
    drinkImgEl.setAttribute("src", data.drinks[0].strDrinkThumb);
    drinkImgEl.setAttribute("id", "placeholder")
    // container for drink ingredients
    var drinkIngredients = document.createElement("div");
    drinkIngredients.classList.add("recipe-ingredients");
    var drinkIngredientsList = document.createElement("ul");
    var drinkIngredientListItem = document.createElement("li");
    // container for drink directions
    var drinkDirections = document.createElement("div");
    drinkDirections.classList.add("recipe-directions");
    drinkDirections.textContent = data.drinks[0].strInstructions;
    // arrays to grab strIngredient and strMeasure values
    var ingredientArray = [data.drinks[0].strIngredient1, data.drinks[0].strIngredient2, data.drinks[0].strIngredient3, data.drinks[0].strIngredient4, data.drinks[0].strIngredient5, data.drinks[0].strIngredient6, data.drinks[0].strIngredient7, data.drinks[0].strIngredient8, data.drinks[0].strIngredient9, data.drinks[0].strIngredient10, data.drinks[0].strIngredient11, data.drinks[0].strIngredient12, data.drinks[0].strIngredient13, data.drinks[0].strIngredient14, data.drinks[0].strIngredient15];
    var ingredientMeasurement = [data.drinks[0].strMeasure1, data.drinks[0].strMeasure2, data.drinks[0].strMeasure3, data.drinks[0].strMeasure4, data.drinks[0].strMeasure5, data.drinks[0].strMeasure6, data.drinks[0].strMeasure7, data.drinks[0].strMeasure8, data.drinks[0].strMeasure9, data.drinks[0].strMeasure10, data.drinks[0].strMeasure11, data.drinks[0].strMeasure12, data.drinks[0].strMeasure13, data.drinks[0].strMeasure14, data.drinks[0].strMeasure15];
    // loop through ingredientArray and add all ingredients as list items
    for (var i = 0; i < ingredientArray.length; i++) {
        if (ingredientArray[i] === null) {
            break;
        }
        else {
        var drinkIngredientListItem = document.createElement("li");
        drinkIngredientListItem.textContent = ingredientMeasurement[i] + ingredientArray[i];

        drinkIngredientsList.append(drinkIngredientListItem)
        }
    };

    drinkIngredients.append(drinkIngredientsList)
    drinkDetailsEl.append(drinkTitleEl, drinkImgEl, drinkIngredients, drinkDirections);
};

//  api call for drink information
var loadDrink = function (id) {
    fetch("https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2c6a28b8bamsh4fa138d603fa741p192f0ajsn19a4adcc2247",
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
        }
    })        
    .then(response => {
            response.json().then(function (data) {
                console.log(data);
                detailedDrink(data);
            });
        })
        .catch(err => {
            console.error(err);
        });
};

getCocktailID();