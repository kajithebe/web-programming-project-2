import {useState} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import './AddRecipe.css';

function AddRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    instructions: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recipe submitted:', formData);
    setSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        title: '',
        description: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        instructions: '',
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="add-recipe-page">
      <h1>Add New Recipe</h1>

      {submitted && (
        <div className="success-message">✓ Recipe added successfully!</div>
      )}

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

        <div className="input-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Step by step instructions..."
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
