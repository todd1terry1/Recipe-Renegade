var buttonEl = document.querySelector("button");
var inputEl = document.querySelector(".form-input");

var queryInput = function (event) {
    event.preventDefault();
    var inputval = document.querySelector("input").value;
    window.location.href = "./second-page.html?q=" + inputval;
};

inputEl.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        buttonEl.click();
    }
});
buttonEl.addEventListener("click", queryInput);