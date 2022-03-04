"use strict";
let ids = 0;
// Skapar ett nytt matobjekt och dörefter returnerar variabeln
function createNewFood(name, region, country, main, sides) {
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

// Adderar in en ny maträtt i vår databas
function addFoodToDatabase(database, food) {
    database.push(food);
}

// Tar bort en maträtt baserat på dess namn från vår databas
function removeFoodById(dishes, id) {
    for (let i = 0; i < dishes.length; i++) {
        // Här asignerar vi ett matobjekt till vår "food" variabel, beroende på loop-index värdet 
        let food = dishes[i];

        if (food.id == id) {
            // Detta "if" påstående kontrollerar ifall vi verkligen har ett matobjekt "id" som är == det givna "id" argument
            dishes.splice(i, 1);
            return;
        }
    }
}

// Returnerar all matobjekt baserat på dess region
function getDishesByRegion(dishes, region) {
    let dishesByRegion = [];

    for (let food of dishes) {
        if (food.region.toLowerCase() == region.toLowerCase()) {
            dishesByRegion.push(food);
        }
    }

    return dishesByRegion;
}

// Returnerar all matobjekt baserat på deras land
function getDishesByCountry(dishes, country) {
    let dishesByCountry = [];

    for (let food of dishes) {
        if (food.country == country) {
            dishesByCountry.push(food);
        }
    }

    return dishesByCountry;
}

// Renderar ett matobjekt i ett HTML element
function renderFood(food, id) {
    let div = document.createElement("div");
    div.classList.add("food");
    div.id = food.id;

    div.innerHTML = `
         <div>${id}</div>
        <div>${food.name}</div>
        <div>${food.country}</div>
        <div>${food.region}</div>
        <div>${food.main}</div>
        <div>${food.sides}</div>
        <button type="button">Remove</button>
    `;

    return div;
}

// Renderar en array av matobjekt i HTML
function renderDishes(dishes) {
    let dishesElement = document.getElementById("dishes");
    dishesElement.innerHTML = "";

    // Go through all dishes and insert their HTML Går igenom alla matobjekt och appendar ett HTML element med deras data 
    for (let i = 0; i < dishes.length; i++) {
        let foodElement = renderFood(dishes[i], i + 1);
        dishesElement.appendChild(foodElement);
    }
 
    setRemoveFoodHandlers();
}

// Ett HTML-form element submittar data, denna funktion får tillgång till form-data därav sparar vi de nya matobjektet till vår databas. 
function onAddDishesSubmit(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let region = document.getElementById("region").value;
    let country = document.getElementById("country").value;
    let main = document.getElementById("main-ingredient").value;
    let sides = document.getElementById("sides").value;

    if (name == "" || region == "" || country == "" || main == "" || sides == "" )  {
        alert ("You need to fill in the fields!");

        return;
    };

    let food = createNewFood(name, region, country, main, sides);
   
    if (database.length <= 0) {
        food.id = 0;
    }
    else {
        food.id = database[database.length - 1].id + 1;
    }
   
    addFoodToDatabase(database, food)
    renderDishes(database);

    // Här tömmer vi form-fields
    let form = document.getElementById("add-food");
    form.reset();
}

// Skapat en eventhandler 
function setAddFoodHandler() {
    let form = document.getElementById("add-food");
    form.addEventListener("submit", onAddDishesSubmit);
}

// Denna funktionen får tillgång till "id" så att vi kan radera det valda matobjekt.
function onRemoveFoodClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    // Skapat en "Confirm alert" där användaren blir tillfrågad om en bekräftelse
    if (confirm ("Are you sure you want to remove this field?")){
        removeFoodById(database, id);
        
        renderDishes(database);
    }
}

// Skapat en remove-food eventhandler
function setRemoveFoodHandlers() {
    let buttons = document.querySelectorAll(".food button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveFoodClick);
    }
}

// Filtrerar matobjektet baserat på dess region
function onFilterByRegionSubmit(event) {
    event.preventDefault();
    // Region-värdet
    let region = document.getElementById("filter-region").value;
    // Hämtar matobjektet baserat på dess region
    let dishes = getDishesByRegion(database, region);
    
    renderDishes(dishes);
}

// Filtrerar matobjekten baserat på dess land
function onFilterByCountriesubmit(event) {
    event.preventDefault();
    // land-värdet
    let country = document.getElementById("filter-from").value;
    // Hämtar matobjektet baserat på dess land
    let dishes = getDishesByCountry(database, country);

    renderDishes(dishes);
}

function onDisplayAllClick() {
    document.getElementById("filter-region").value = "";
    document.getElementById("filter-from").value = "";
    renderDishes(database);
}

function setFilterFoodHandlers() {
    let regionForm = document.getElementById("filter-by-region");
    let countryForm = document.getElementById("filter-by-country");
    let displayAll = document.getElementById("display-all");

    regionForm.addEventListener("submit", onFilterByRegionSubmit);
    countryForm.addEventListener("submit", onFilterByCountriesubmit);
    displayAll.addEventListener("click", onDisplayAllClick);
}

// initialiserar vår sida och dessutom fyller på med data
renderDishes(database);
setAddFoodHandler();
setFilterFoodHandlers();