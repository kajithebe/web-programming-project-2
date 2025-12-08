import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🍳 Recipe Sharing
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/recipes" className="nav-link">
                Recipes
              </Link>
              <Link to="/add-recipe" className="nav-link">
                Add Recipe
              </Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
