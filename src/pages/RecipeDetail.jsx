import {useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import Button from '../components/Button';
import Rating from '../components/Rating';
import Input from '../components/Input';
import './RecipeDetail.css';

function RecipeDetail() {
  const {id} = useParams();

  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
  });

  const [submitMessage, setSubmitMessage] = useState('');

  // Sample recipe data
  const recipes = [
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
      ingredients: [
        '400g spaghetti',
        '200g pancetta or bacon',
        '4 large eggs',
        '100g Parmesan cheese, grated',
        '2 cloves garlic',
        'Salt and black pepper to taste',
      ],
      instructions: [
        'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
        'While pasta cooks, fry pancetta in a large skillet until crispy.',
        'In a bowl, whisk together eggs and Parmesan cheese.',
        'Drain pasta, reserving 1 cup of pasta water.',
        'Add hot pasta to the skillet with pancetta, remove from heat.',
        'Quickly stir in egg mixture, adding pasta water to create a creamy sauce.',
        'Season with black pepper and serve immediately.',
      ],
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
      ingredients: [
        '500g chicken breast, cubed',
        '2 onions, chopped',
        '3 cloves garlic, minced',
        '2 tbsp curry powder',
        '400ml coconut milk',
        '2 tomatoes, chopped',
        '2 tbsp vegetable oil',
        'Salt to taste',
        'Fresh cilantro for garnish',
      ],
      instructions: [
        'Heat oil in a large pot over medium heat.',
        'Add onions and cook until softened, about 5 minutes.',
        'Add garlic and curry powder, cook for 1 minute until fragrant.',
        'Add chicken and cook until lightly browned.',
        'Add tomatoes and cook for 5 minutes.',
        'Pour in coconut milk and bring to a simmer.',
        'Cook for 20 minutes until chicken is cooked through and sauce has thickened.',
        'Season with salt and garnish with fresh cilantro.',
        'Serve hot with rice or naan bread.',
      ],
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
      ingredients: [
        '2 cups all-purpose flour',
        '2 cups sugar',
        '3/4 cup cocoa powder',
        '2 tsp baking soda',
        '1 tsp salt',
        '2 eggs',
        '1 cup buttermilk',
        '1 cup vegetable oil',
        '1 cup hot water',
        '1 tsp vanilla extract',
      ],
      instructions: [
        'Preheat oven to 350°F (175°C). Grease and flour two 9-inch cake pans.',
        'In a large bowl, mix together flour, sugar, cocoa, baking soda, and salt.',
        'Add eggs, buttermilk, oil, and vanilla. Beat for 2 minutes.',
        'Stir in hot water (batter will be thin).',
        'Pour batter into prepared pans.',
        'Bake for 30-35 minutes until a toothpick comes out clean.',
        'Cool in pans for 10 minutes, then turn out onto wire racks.',
        'Frost with your favorite chocolate frosting when completely cool.',
      ],
    },
  ];

  const recipe = recipes.find((r) => r.id === parseInt(id));

  const handleRatingChange = (value) => {
    setReviewForm({
      ...reviewForm,
      rating: value,
    });
  };

  const handleCommentChange = (e) => {
    setReviewForm({
      ...reviewForm,
      comment: e.target.value,
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm);
    setSubmitMessage('✓ Thank you for your review!');

    setTimeout(() => {
      setReviewForm({rating: 0, comment: ''});
      setSubmitMessage('');
    }, 3000);
  };

  if (!recipe) {
    return (
      <div className="recipe-detail">
        <h1>Recipe not found</h1>
        <Link to="/recipes">
          <Button>Back to Recipes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <Link to="/recipes" className="back-link">
        ← Back to Recipes
      </Link>

      <div className="recipe-header">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="recipe-detail-image"
        />
        <div className="recipe-info">
          <h1>{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>
          <div className="recipe-rating">
            <Rating initialRating={recipe.rating} readOnly={true} />
            <span className="rating-text">
              Average Rating: {recipe.rating}/5
            </span>
          </div>
          <div className="recipe-stats">
            <div className="stat">
              <span className="stat-label">Prep Time</span>
              <span className="stat-value">{recipe.prep_time} min</span>
            </div>
            <div className="stat">
              <span className="stat-label">Cook Time</span>
              <span className="stat-value">{recipe.cook_time} min</span>
            </div>
            <div className="stat">
              <span className="stat-label">Servings</span>
              <span className="stat-value">{recipe.servings}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="review-section">
        <h2>Rate this Recipe</h2>
        {submitMessage && (
          <div className="success-message">{submitMessage}</div>
        )}
        <form onSubmit={handleSubmitReview} className="review-form">
          <div className="rating-input">
            <label>Your Rating:</label>
            <Rating
              initialRating={reviewForm.rating}
              onRatingChange={handleRatingChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="comment">Your Review (optional):</label>
            <textarea
              id="comment"
              name="comment"
              value={reviewForm.comment}
              onChange={handleCommentChange}
              placeholder="Share your experience with this recipe..."
              rows="4"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={reviewForm.rating === 0}
          >
            Submit Review
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RecipeDetail;
