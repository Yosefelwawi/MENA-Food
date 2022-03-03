"use strict";

// Creates a new dog object and then returns it
function createNewDog(name, breed, age) {
    let dog = {
        name: name,
        breed: breed,
        age: age,
    };

    return dog;
}

// Adds a new dog to our database
function addDogToDatabase(database, dog) {
    database.push(dog);
}

// Removes a dog based on its name from our database
function removeDogById(dogs, id) {
    for (let i = 0; i < dogs.length; i++) {
        // This is the current dog of our loop
        let dog = dogs[i];
        // Check if this dogs name is the same a the name
        // that the function received
        if (dog.id == id) {
            // If so, remove the dog from the array
            dogs.splice(i, 1);
            return;
        }
    }
}

// Returns all dogs based on their breed
function getDogsByBreed(dogs, breed) {
    let dogsByBreed = [];

    for (let dog of dogs) {
        if (dog.breed.toLowerCase() == breed.toLowerCase()) {
            dogsByBreed.push(dog);
        }
    }

    return dogsByBreed;
}

// Returns all dogs based on their age
function getDogsByAge(dogs, age) {
    let dogsByAge = [];

    for (let dog of dogs) {
        if (dog.age == age) {
            dogsByAge.push(dog);
        }
    }

    return dogsByAge;
}

// Calculates the average age of our dogs
function getAverageDogAge(dogs) {
    let sumOfAges = 0;

    // For each dog we increase `sumOfAges` with that dog`s age
    for (let dog of dogs) {
        sumOfAges = sumOfAges + dog.age;
    }

    // Take the average age (total / number of dogs) and then round it to the
    // nearest number (otherwise we'd get lots of decimals)
    return Math.round(sumOfAges / dogs.length);
}

// Renders a dog object into a HTML element
function renderDog(dog) {
    let div = document.createElement("div");
    div.classList.add("dog");
    div.id = dog.id;

    div.innerHTML = `
        <div>${dog.name}</div>
        <div>${dog.breed}</div>
        <div>${dog.age}</div>
        <button type="button">Remove</button>
    `;

    return div;
}

// Renders an array of dogs into HTML
function renderDogs(dogs) {
    let dogsElement = document.getElementById("dogs");
    dogsElement.innerHTML = "";

    // Go through all dogs and insert their HTML
    for (let dog of dogs) {
        let dogElement = renderDog(dog);
        dogsElement.appendChild(dogElement);
    }
    // Add remove-handlers for our dogs
    setRemoveDogHandlers();
}

// When <form id="add-dog-form"> is submitted
function onAddDogSubmit(event) {
    // Prevent the form from sending us to a new page
    event.preventDefault();

    let name = document.getElementById("name").value;
    let breed = document.getElementById("breed").value;
    let age = Number(document.getElementById("age").value);

    let dog = createNewDog(name, breed, age);

    // Calculate the newly created dogs ID
    dog.id = database[database.length - 1].id + 1;

    addDogToDatabase(database, dog)
    renderDogs(database);

    // Reset (empty) all form fields
    let form = document.getElementById("add-dog-form");
    form.reset();
}

// Add "click" event handler to <button id="add">
function setAddDogHandler() {
    let form = document.getElementById("add-dog-form");
    form.addEventListener("submit", onAddDogSubmit);
}

// When a user clicks the remove-dog-button
function onRemoveDogClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    // Uses the global variable `database`
    removeDogById(database, id);
    // Re-render (without the newly deleted dog)
    renderDogs(database);
}

// Add "click" event handler to all remove-buttons
function setRemoveDogHandlers() {
    let buttons = document.querySelectorAll(".dog button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveDogClick);
    }
}

// Filter dogs by breed
function onFilterByBreedSubmit(event) {
    event.preventDefault();
    // What breed?
    let breed = document.getElementById("filter-breed").value;
    // Get the dogs by breed
    let dogs = getDogsByBreed(database, breed);
    // Re-render them
    renderDogs(dogs);
}

// Filter dogs by age
function onFilterByAgeSubmit(event) {
    event.preventDefault();
    // What age?
    let age = document.getElementById("filter-age").value;
    // Get the dogs by breed
    let dogs = getDogsByAge(database, age);
    // Re-render them
    renderDogs(dogs);
}

function onShowAllClick() {
    document.getElementById("filter-breed").value = "";
    document.getElementById("filter-age").value = "";
    renderDogs(database);
}

function setFilterDogHandlers() {
    let breedForm = document.getElementById("filter-by-breed");
    let ageForm = document.getElementById("filter-by-age");
    let showAll = document.getElementById("show-all");

    breedForm.addEventListener("submit", onFilterByBreedSubmit);
    ageForm.addEventListener("submit", onFilterByAgeSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

// Initialize the page
renderDogs(database);
setAddDogHandler();
setFilterDogHandlers();