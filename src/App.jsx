import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> |<Link to="/recipes">Recipes</Link> |
          <Link to="/add-recipe">Add Recipe</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
