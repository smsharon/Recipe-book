//fetch the API key from the backend and store it in a variable
const apiKey = '1';

// Function to fetch recipes based on search keyword
async function fetchRecipesByKeyword(keyword) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${keyword}`);
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

  return recipeCard;
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
