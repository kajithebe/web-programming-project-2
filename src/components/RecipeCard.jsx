import {Link} from 'react-router-dom';
import Rating from './Rating';
import './RecipeCard.css';

function RecipeCard({recipe}) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
      <div className="recipe-card">
        <img
          src={
            recipe.image_url ||
            'https://via.placeholder.com/300x200?text=No+Image'
          }
          alt={recipe.title}
          className="recipe-image"
        />
        <div className="recipe-content">
          <h3>{recipe.title}</h3>
          <p className="recipe-description">{recipe.description}</p>
          <Rating initialRating={recipe.rating || 0} readOnly={true} />
          <div className="recipe-meta">
            <span>⏱️ {recipe.prep_time + recipe.cook_time} min</span>
            <span>🍽️ {recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
