

document.getElementById('search-button').addEventListener('click', function () {
    document.getElementById('foods-container').innerText = '';
    const searchInput = document.getElementById('search-input');
    let url =`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput.value}`;
    
    if (searchInput.value.length === 1){
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput.value}` //if search by first key
    }
    else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}` //if search by full name
    } 
    displayFoods(url);      // display food items by calling function
})

const displayFoods = url => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const foods = data['meals'];
            const foodsContainer = document.getElementById('foods-container');
            foods.forEach(food => {     //accessing array by for each loop
                const foodDiv = document.createElement('div');  //creating a div 
                
                foodDiv.className = "food" //adding a class in foodDiv
                const foodInfo = `
                    <img src = ${food.strMealThumb}>
                    <h4>${food.strMeal}</h4>
                `
                foodDiv.innerHTML = foodInfo;   //set template string into foodDiv div
                foodsContainer.appendChild(foodDiv);    //adding foodDiv into foodsContainer div by append

                //display food ingredients 
                let foodIngredients = document.getElementById('food-ingredients');
                foodDiv.addEventListener('click',function(){
                    foodIngredients.innerText = '';
                    const ingredientInfo = document.createElement('div');
                    ingredientInfo.className = "ingredient-info";
                    console.log(food);
                    ingredientInfo.innerHTML = `
                        <img src = ${food.strMealThumb}>
                        <h2>${food.strMeal}</h2>
                        <p><b>Ingredients</b></p>                        
                        <!-- <p>${food.strIngredient1} : ${food.strMeasure1}</p>
                        <p>${food.strIngredient2} : ${food.strMeasure2}</p>
                        <p>${food.strIngredient3} : ${food.strMeasure3}</p>
                        <p>${food.strIngredient4} : ${food.strMeasure4}</p>
                        <p>${food.strIngredient5} : ${food.strMeasure5}</p>
                        <p>${food.strIngredient6} : ${food.strMeasure6}</p>
                        <p>${food.strIngredient7} : ${food.strMeasure7}</p>
                        <p>${food.strIngredient8} : ${food.strMeasure8}</p>
                        <p>${food.strIngredient9} : ${food.strMeasure9}</p> -->

                        <ul id="ingredients-ul"></ul>
                    `
                    foodIngredients.appendChild(ingredientInfo);    //adding ingredients into foodIngredients div by append
                });
            });
        })
        .catch(error => alert('No items found'))
}

