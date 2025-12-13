import * as RecipeModel from '../models/recipeModel.js';

export const getRecipes = (req, res) => {
  try {
    const recipes = RecipeModel.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const getRecipe = (req, res) => {
  try {
    const {id} = req.params;
    const recipe = RecipeModel.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({error: 'Recipe not found'});
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const createRecipe = (req, res) => {
  try {
    const recipeId = RecipeModel.createRecipe(req.body);

    // Add categories if provided
    if (req.body.categories && req.body.categories.length > 0) {
      // This would need a separate model function if implemented
    }

    // Add ingredients if provided
    if (req.body.ingredients && req.body.ingredients.length > 0) {
      // This would need a separate model function if implemented
    }

    res
      .status(201)
      .json({id: recipeId, message: 'Recipe created successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const createRecipeIngredients = (req, res) => {
  try {
    const {recipe_id, ingredients} = req.body;
    RecipeModel.addRecipeIngredients(recipe_id, ingredients);

    res.status(201).json({message: 'Ingredients added successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const createReview = (req, res) => {
  try {
    const {id} = req.params;
    const {user_id, rating, comment} = req.body;

    const reviewId = RecipeModel.addReview(id, user_id, rating, comment);

    res.status(201).json({id: reviewId, message: 'Review added successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const getCategories = (req, res) => {
  try {
    const categories = RecipeModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
