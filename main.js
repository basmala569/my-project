let meals = [
    {
        name: "Vegetable Curry",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554",
        description: "A delicious and healthy vegetable curry full of fresh vegetables.",
        category: "Healthy",
        rating: "★★★★★ 4.8 (120 Reviews)",
        prep: "15 min",
        cook: "25 min",
        servings: "4 People",
        ingredients: ["2 cups mixed vegetables", "1 onion", "2 tomatoes", "Olive oil", "Salt and pepper"],
        instructions: ["Cut all vegetables.", "Heat olive oil in a pan.", "Add vegetables and spices.", "Cook until soft and serve."],
        nutrition: {
            Calories: "250 kcal",
            Protein: "8g",
            Carbs: "30g",
            Fat: "10g"
        },
        tips: ["Use fresh vegetables.", "Add your favorite spices."]
    },
 
    {
        name: "Italian Pasta",
        image: "  https://tse3.mm.bing.net/th/id/OIP.wjmwzDQ87Zl1Lt1mLswrFgHaE7?r=0&pid=Api&h=220&P=0",
        description: "Delicious Italian pasta with tomato sauce and cheese.",
        category: "Italian",
        rating: "★★★★★ 4.9 (150 Reviews)",
        prep: "10 min",
        cook: "20 min",
        servings: "3 People",
        ingredients: ["Pasta", "Tomato sauce", "Cheese", "Olive oil"],
        instructions: ["Boil the pasta.", "Prepare the tomato sauce.", "Mix pasta with sauce.", "Add cheese and serve."],
        nutrition: {
            Calories: "320 kcal",
            Protein: "12g",
            Carbs: "45g",
            Fat: "9g"
        },
        tips: ["Do not overcook the pasta.", "Add fresh basil."]
    },
 
    {
        name: "Chicken Burger",
        image: "https://tse1.mm.bing.net/th/id/OIP.3f4uw03GjHN2wa2tSeNc4wHaIu?r=0&pid=Api&h=220&P=0",
        description: "A tasty chicken burger with fresh vegetables and sauce.",
        category: "Fast Food",
        rating: "★★★★★ 4.7 (100 Reviews)",
        prep: "15 min",
        cook: "20 min",
        servings: "2 People",
        ingredients: ["Chicken", "Burger buns", "Lettuce", "Tomato", "Cheese"],
        instructions: ["Prepare the chicken.", "Cook it well.", "Prepare the buns.", "Add vegetables and serve."],
        nutrition: {
            Calories: "400 kcal",
            Protein: "25g",
            Carbs: "35g",
            Fat: "15g"
        },
        tips: ["Use fresh lettuce.", "Add your favorite sauce."]
    }
];
 
let currentMeal = 0;
let currentTab = "ingredients";
 
function displayMeal() {
 
    let meal = meals[currentMeal];
 
    document.getElementById("mealImage").src = meal.image;
    document.getElementById("mealName").innerText = meal.name;
    document.getElementById("description").innerText = meal.description;
    document.getElementById("category").innerText = meal.category;
    document.getElementById("rating").innerText = meal.rating;
    document.getElementById("prepTime").innerText = meal.prep;
    document.getElementById("cookTime").innerText = meal.cook;
    document.getElementById("servings").innerText = meal.servings;
 
    showContent(currentTab);
}
 
function showContent(tab) {
 
    let meal = meals[currentMeal];
    let content = document.getElementById("content");
 
    if (tab === "ingredients") {
 
        content.innerHTML = "<h3>Ingredients</h3><ul>";
 
        for (let i = 0; i < meal.ingredients.length; i++) {
            content.innerHTML += "<li>" + meal.ingredients[i] + "</li>";
        }
 
        content.innerHTML += "</ul>";
 
    } else if (tab === "instructions") {
 
        content.innerHTML = "<h3>Instructions</h3><ol>";
 
        for (let i = 0; i < meal.instructions.length; i++) {
            content.innerHTML += "<li>" + meal.instructions[i] + "</li>";
        }
 
        content.innerHTML += "</ol>";
 
    } else if (tab === "nutrition") {
 
        content.innerHTML = "<h3>Nutrition</h3>";
 
        for (let item in meal.nutrition) {
            content.innerHTML += "<p>" + item + ": " + meal.nutrition[item] + "</p>";
        }
 
    } else if (tab === "tips") {
 
        content.innerHTML = "<h3>Chef's Tips</h3><ul>";
 
        for (let i = 0; i < meal.tips.length; i++) {
            content.innerHTML += "<li>" + meal.tips[i] + "</li>";
        }
 
        content.innerHTML += "</ul>";
    }
}
 
function showTab(tab, button) {
 
    currentTab = tab;
 
    showContent(tab);
 
}
  
function randomMeal() {
 
    let newMeal = Math.floor(Math.random() * meals.length);
 
    while (newMeal === currentMeal) {
        newMeal = Math.floor(Math.random() * meals.length);
    }
 
    currentMeal = newMeal;
 
    displayMeal();
}
 
function saveMeal() {
    alert("Recipe Saved!");
}
 
function shareMeal() {
    alert("Share this recipe with your friends!");
}
 
displayMeal();
 
 