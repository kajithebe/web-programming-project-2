import {useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import CategoryFilter from '../components/CategoryFilter';
import './Recipes.css';

function Recipes() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch recipes from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes')
      .then((response) => response.json())
      .then((data) => {
        // Transform data to match frontend format
        const transformedData = data.map((recipe) => ({
          ...recipe,
          category: recipe.categories || 'Uncategorized',
          rating: Math.round(recipe.avg_rating),
        }));
        setAllRecipes(transformedData);
        setRecipes(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);

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
      filtered = filtered.filter(
        (recipe) => recipe.category && recipe.category.includes(category)
      );
    }

    // Filter by search term
    if (term.trim() !== '') {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setRecipes(filtered);
  };

  if (loading) {
    return (
      <div className="recipes-page">
        <h1>Loading recipes...</h1>
      </div>
    );
  }

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
