document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch recipes based on search keyword
  async function fetchRecipesByKeyword(keyword) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  }

  // Function to display the search results
  function displaySearchResults(recipes) {
    const featuredRecipesSection = document.getElementById('featuredRecipes');
    featuredRecipesSection.innerHTML = '';

    if (!recipes || recipes.length === 0) {
      featuredRecipesSection.innerHTML = '<p>No recipes found for this search.</p>';
      return;
    }

    recipes.forEach((recipe) => {
      const recipeCard = createRecipeCard(recipe);
      featuredRecipesSection.appendChild(recipeCard);
    });
  }

  // Function to create individual recipe cards
  function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('featured-recipe-card');

    const image = document.createElement('img');
    image.src = recipe.strMealThumb;
    image.alt = recipe.strMeal;
    recipeCard.appendChild(image);

    const name = document.createElement('h3');
    name.textContent = recipe.strMeal;
    recipeCard.appendChild(name);

    const category = document.createElement('p');
    category.textContent = `Category: ${recipe.strCategory}`;
    recipeCard.appendChild(category);

    // Create the "View Recipe" button
    const viewRecipeButton = document.createElement('button');
    viewRecipeButton.textContent = 'View Recipe';
    recipeCard.appendChild(viewRecipeButton);

    // Event listener for the "View Recipe" button
    viewRecipeButton.addEventListener('click', () => {
      // Display the popup with recipe details
      displayPopup(recipe);
    });

    return recipeCard;
  }

  // Function to display the recipe details in a popup
  function displayPopup(recipe) {
    const popupOverlay = document.createElement('div');
    popupOverlay.classList.add('popup-overlay');

    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;'; // Unicode for close (x) symbol

    closeButton.addEventListener('click', () => {
      // Close the popup when close button is clicked
      document.body.removeChild(popupOverlay);
    });

    const title = document.createElement('h3');
    title.textContent = recipe.strMeal;

     // Add "Ingredients" heading
  const ingredientsHeading = document.createElement('h4');
  ingredientsHeading.textContent = 'Ingredients';

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    const ingredientsList = document.createElement('ol');
    ingredients.forEach((ingredient) => {
      const listItem = document.createElement('li');
      listItem.textContent = ingredient;
      ingredientsList.appendChild(listItem);
    });
//add instructions heading
    const instructionsHeading = document.createElement('h4');
    instructionsHeading.textContent = 'Instructions';

    const instructions = document.createElement('p');
    instructions.textContent = `Instructions: ${recipe.strInstructions}`;

    // Append elements to the popup container
    popupContainer.appendChild(closeButton);
    popupContainer.appendChild(title);
    popupContainer.appendChild(ingredientsHeading); // Add ingredients heading
    popupContainer.appendChild(ingredientsList);
    popupContainer.appendChild(instructionsHeading); // Add instructions heading
    popupContainer.appendChild(instructions);

    // Append the popup container to the popup overlay
    popupOverlay.appendChild(popupContainer);

    // Append the popup overlay to the document body
    document.body.appendChild(popupOverlay);
  }

  // Function to handle the search event
  function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim();

    if (keyword === '') {
      alert('Please enter a search keyword.');
      return;
    }

    fetchRecipesByKeyword(keyword)
      .then((recipes) => displaySearchResults(recipes))
      .catch((error) => console.error('Error:', error));
  }

  // Add event listener to the search button
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', handleSearch);

  // Add event listener to the search input to enable searching on Enter key press
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
});
