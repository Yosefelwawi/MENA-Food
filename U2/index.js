"use strict";
let ids = 0;
// Creates a new food object and then returns it
function createNewfood(name, region, country, main, sides) {
    let food = {
        id: ids++,
        name: name,
        region: region,
        country: country,
        main: main,
        sides: sides
    };

    return food;
}

// Adds a new food to our database
function addFoodToDatabase(database, food) {
    database.push(food);
}

// Removes a food based on its name from our database
function removeFoodById(dishes, id) {
    for (let i = 0; i < dishes.length; i++) {
        // This is the current food of our loop
        let food = dishes[i];
        // Check if this dishes name is the same a the name
        // that the function received
        if (food.id == id) {
            // If so, remove the food from the array
            dishes.splice(i, 1);
            return;
        }
    }
}

// Returns all dishes based on their region
function getDishesByRegion(dishes, region) {
    let dishesByregion = [];

    for (let food of dishes) {
        if (food.region.toLowerCase() == region.toLowerCase()) {
            dishesByregion.push(food);
        }
    }

    return dishesByregion;
}

// Returns all dishes based on their country
function getDishesByCountry(dishes, country) {
    let dishesBycountry = [];

    for (let food of dishes) {
        if (food.country == country) {
            dishesBycountry.push(food);
        }
    }

    return dishesBycountry;
}

// Calculates the avercountry country of our dishes
function getAvercountryfoodcountry(dishes) {
    let sumOfcountrys = 0;

    // For each food we increase `sumOfcountrys` with that food`s country
    for (let food of dishes) {
        sumOfcountrys = sumOfcountrys + food.country;
    }

    // Take the avercountry country (total / number of dishes) and then round it to the
    // nearest number (otherwise we'd get lots of decimals)
    return Math.round(sumOfcountrys / dishes.length);
}

// Renders a food object into a HTML element
function renderfood(food) {
    let div = document.createElement("div");
    div.classList.add("food");
    div.id = food.id;

    div.innerHTML = `
        <div>${food.name}</div>
        <div>${food.region}</div>
        <div>${food.country}</div>
        <div>${food.main}</div>
        <div>${food.sides}</div>
        <button type="button">Remove</button>
    `;

    return div;
}

// Renders an array of dishes into HTML
function renderDishes(dishes) {
    let dishesElement = document.getElementById("dishes");
    dishesElement.innerHTML = "";

    // Go through all dishes and insert their HTML
    for (let food of dishes) {
        let foodElement = renderfood(food);
        dishesElement.appendChild(foodElement);
    }
    // Add remove-handlers for our dishes
    setRemoveFoodHandlers();
}

// When <form id="add-food"> is submitted
function onAddDishesSubmit(event) {
    // Prevent the form from sending us to a new page
    event.preventDefault();

    let name = document.getElementById("name").value;
    let region = document.getElementById("region").value;
    let country = document.getElementById("country").value;
    let main = document.getElementById("main-ingredient").value;
    let sides = document.getElementById("sides").value;

    if (name == "" || region == "" || country == "" || main == "" || sides == "" )  {
        alert ("WTF are u retarded, fill in the fields");
        console.log ("hej!")
        return;
    };

    let food = createNewfood(name, region, country, main, sides);

    // Calculate the newly created dishes ID
   
    if (database.length <= 0) {
        food.id = 0;
    }
    else {
        food.id = database[database.length - 1].id + 1;
    }
   


    addFoodToDatabase(database, food)
    renderDishes(database);

    // Reset (empty) all form fields
    let form = document.getElementById("add-food");
    form.reset();
}

// Add "click" event handler to <button id="add">
function setAddFoodHandler() {
    let form = document.getElementById("add-food");
    form.addEventListener("submit", onAddDishesSubmit);
}

// When a user clicks the remove-food-button
function onRemoveFoodClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    // Uses the global variable `database`
    if (confirm ("Are you sure you want to remove this field?")){
        removeFoodById(database, id);
        // Re-render (without the newly deleted food)
        renderDishes(database);
    }


}

// Add "click" event handler to all remove-buttons
function setRemoveFoodHandlers() {
    let buttons = document.querySelectorAll(".food button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveFoodClick);
    }
}

// Filter dishes by region
function onFilterByRegionSubmit(event) {
    event.preventDefault();
    // What region?
    let region = document.getElementById("filter-region").value;
    // Get the dishes by region
    let dishes = getDishesByRegion(database, region);
    // Re-render them
    renderDishes(dishes);
}

// Filter dishes by country
function onFilterBycountrySubmit(event) {
    event.preventDefault();
    // What country?
    let country = document.getElementById("filter-from").value;
    // Get the dishes by region
    let dishes = getDishesByCountry(database, country);
    // Re-render them
    renderDishes(dishes);
}

function onShowAllClick() {
    document.getElementById("filter-region").value = "";
    document.getElementById("filter-from").value = "";
    renderDishes(database);
}

function setFilterfoodHandlers() {
    let regionForm = document.getElementById("filter-by-region");
    let countryForm = document.getElementById("filter-by-country");
    let showAll = document.getElementById("display-all");

    regionForm.addEventListener("submit", onFilterByRegionSubmit);
    countryForm.addEventListener("submit", onFilterBycountrySubmit);
    showAll.addEventListener("click", onShowAllClick);
}

// Initialize the pcountry
renderDishes(database);
setAddFoodHandler();
setFilterfoodHandlers();