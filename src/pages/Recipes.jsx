import {useState} from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import './Recipes.css';

function Recipes() {
  // Sample recipe data with categories
  const allRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta with eggs, cheese, and bacon',
      prep_time: 10,
      cook_time: 20,
      servings: 4,
      image_url: '/images/spaghetti.jpg',
      category: 'Dinner',
      rating: 5,
    },
    {
      id: 2,
      title: 'Chicken Curry',
      description: 'Spicy and flavorful Indian curry',
      prep_time: 15,
      cook_time: 30,
      servings: 6,
      image_url: '/images/curry.jpg',
      category: 'Lunch',
      rating: 4,
    },
    {
      id: 3,
      title: 'Chocolate Cake',
      description: 'Rich and moist chocolate dessert',
      prep_time: 20,
      cook_time: 35,
      servings: 8,
      image_url: '/images/cake.jpg',
      category: 'Dessert',
      rating: 5,
    },
  ];

  const [recipes, setRecipes] = useState(allRecipes);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterRecipes(selectedCategory, term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterRecipes(category, searchTerm);
  };

  const filterRecipes = (category, term) => {
    let filtered = allRecipes;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }

    // Filter by search term
    if (term.trim() !== '') {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setRecipes(filtered);
  };

  return (
    <div className="recipes-page">
      <h1>All Recipes</h1>

      <CategoryFilter onCategoryChange={handleCategoryChange} />

      <SearchBar onSearch={handleSearch} />

      <div className="recipes-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Recipes;
