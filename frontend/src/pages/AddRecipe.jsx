import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import './AddRecipe.css';

function AddRecipe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    instructions: '',
    image_url: '',
  });

  const [ingredients, setIngredients] = useState([
    {name: '', quantity: '', unit: ''},
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, {name: '', quantity: '', unit: ''}]);
  };

  const removeIngredientField = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, add the recipe
      const recipeResponse = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1,
          title: formData.title,
          description: formData.description,
          instructions: formData.instructions,
          prep_time: parseInt(formData.prep_time),
          cook_time: parseInt(formData.cook_time),
          servings: parseInt(formData.servings),
          image_url: formData.image_url || '/images/placeholder.jpg',
        }),
      });

      const recipeData = await recipeResponse.json();
      const recipeId = recipeData.id;

      // Then, add ingredients for this recipe
      const validIngredients = ingredients.filter(
        (ing) => ing.name.trim() !== ''
      );

      if (validIngredients.length > 0) {
        await fetch('http://localhost:5000/api/recipes/ingredients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipe_id: recipeId,
            ingredients: validIngredients,
          }),
        });
      }

      setSubmitted(true);

      setTimeout(() => {
        navigate('/recipes');
      }, 2000);
    } catch (error) {
      console.error('Error adding recipe:', error);
      setError('Failed to add recipe. Please try again.');
    }
  };

  return (
    <div className="add-recipe-page">
      <h1>Add New Recipe</h1>

      {submitted && (
        <div className="success-message">
          ✓ Recipe added successfully! Redirecting to recipes...
        </div>
      )}

      {error && <div className="error-message">❌ {error}</div>}

      <form onSubmit={handleSubmit} className="recipe-form">
        <Input
          label="Recipe Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Chocolate Chip Cookies"
          required
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of your recipe"
          required
        />

        <div className="form-row">
          <Input
            label="Prep Time (minutes)"
            type="number"
            name="prep_time"
            value={formData.prep_time}
            onChange={handleChange}
            placeholder="15"
            required
          />

          <Input
            label="Cook Time (minutes)"
            type="number"
            name="cook_time"
            value={formData.cook_time}
            onChange={handleChange}
            placeholder="30"
            required
          />

          <Input
            label="Servings"
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            placeholder="4"
            required
          />
        </div>

        <Input
          label="Image URL (optional)"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="/images/your-recipe.jpg"
        />

        {/* Ingredients Section */}
        <div className="ingredients-input-section">
          <h3>Ingredients</h3>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder="Ingredient name (e.g., flour)"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, 'name', e.target.value)
                }
                className="ingredient-name-input"
              />
              <input
                type="text"
                placeholder="Quantity (e.g., 2)"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, 'quantity', e.target.value)
                }
                className="ingredient-quantity-input"
              />
              <input
                type="text"
                placeholder="Unit (e.g., cups)"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, 'unit', e.target.value)
                }
                className="ingredient-unit-input"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredientField(index)}
                  className="remove-ingredient-btn"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredientField}
            className="add-ingredient-btn"
          >
            + Add Ingredient
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Step by step instructions (each step on a new line)..."
            required
          />
        </div>

        <Button type="submit" variant="primary">
          Add Recipe
        </Button>
      </form>
    </div>
  );
}

export default AddRecipe;
