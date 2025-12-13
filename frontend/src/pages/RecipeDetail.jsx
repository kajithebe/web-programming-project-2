import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Button from '../components/Button';
import Rating from '../components/Rating';
import './RecipeDetail.css';

function RecipeDetail() {
  const {id} = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch recipe details from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Split instructions by newline
        data.instructions = data.instructions.split('\n');
        setRecipe(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      });
  }, [id]);

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

    // Submit review to backend
    fetch(`http://localhost:5000/api/recipes/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1, // Using default user for now
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setSubmitMessage('✓ Thank you for your review!');

        setTimeout(() => {
          setReviewForm({rating: 0, comment: ''});
          setSubmitMessage('');
          // Refresh recipe to show updated rating
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
        setSubmitMessage('❌ Error submitting review. Please try again.');
      });
  };

  if (loading) {
    return (
      <div className="recipe-detail">
        <h1>Loading recipe...</h1>
      </div>
    );
  }

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
            <Rating
              initialRating={Math.round(recipe.avg_rating)}
              readOnly={true}
            />
            <span className="rating-text">
              Average Rating: {recipe.avg_rating.toFixed(1)}/5 (
              {recipe.review_count} reviews)
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
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ingredients listed yet.</p>
          )}
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
          <div
            className={`message ${
              submitMessage.includes('✓') ? 'success-message' : 'error-message'
            }`}
          >
            {submitMessage}
          </div>
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
