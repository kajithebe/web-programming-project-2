import express from 'express';
import * as recipeController from '../controllers/recipeController.js';

const router = express.Router();

// Recipe routes
router.get('/recipes', recipeController.getRecipes);
router.get('/recipes/:id', recipeController.getRecipe);
router.post('/recipes', recipeController.createRecipe);

// Ingredient routes
router.post('/recipes/ingredients', recipeController.createRecipeIngredients);

// Review routes
router.post('/recipes/:id/reviews', recipeController.createReview);

// Category routes
router.get('/categories', recipeController.getCategories);

export default router;
