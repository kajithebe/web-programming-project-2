import {Link} from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Recipe Sharing</h1>
        <p>
          Discover, share, and save your favorite recipes from around the world
        </p>
        <div className="hero-buttons">
          <Link to="/recipes">
            <Button variant="primary">Browse Recipes</Button>
          </Link>
          <Link to="/add-recipe">
            <Button variant="secondary">Share Your Recipe</Button>
          </Link>
        </div>
      </div>

      <div className="features-intro">
        <h2>What You Can Do</h2>
        <p>Explore all the amazing features of our recipe sharing platform</p>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🍳 Discover Recipes</h3>
          <p>
            Browse through hundreds of delicious recipes shared by our community
          </p>
        </div>
        <div className="feature-card">
          <h3>📝 Share Your Own</h3>
          <p>
            Upload your favorite recipes and share them with food lovers
            worldwide
          </p>
        </div>
        <div className="feature-card">
          <h3>⭐ Rate & Review</h3>
          <p>
            Help others find the best recipes by rating and reviewing dishes
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
