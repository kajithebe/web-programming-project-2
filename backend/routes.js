import express from 'express';
import db from './database.js';

const router = express.Router();

// GET all recipes
router.get('/recipes', (req, res) => {
  try {
    const recipes = db
      .prepare(
        `
      SELECT r.*, 
             GROUP_CONCAT(DISTINCT c.name) as categories,
             COALESCE(AVG(rv.rating), 0) as avg_rating
      FROM recipes r
      LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id
      LEFT JOIN categories c ON rc.category_id = c.id
      LEFT JOIN reviews rv ON r.id = rv.recipe_id
      GROUP BY r.id
    `
      )
      .all();

    res.json(recipes);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// GET single recipe by ID
router.get('/recipes/:id', (req, res) => {
  try {
    const {id} = req.params;

    // Get recipe details
    const recipe = db
      .prepare(
        `
      SELECT r.*, 
             COALESCE(AVG(rv.rating), 0) as avg_rating,
             COUNT(rv.id) as review_count
      FROM recipes r
      LEFT JOIN reviews rv ON r.id = rv.recipe_id
      WHERE r.id = ?
      GROUP BY r.id
    `
      )
      .get(id);

    if (!recipe) {
      return res.status(404).json({error: 'Recipe not found'});
    }

    // Get ingredients
    const ingredients = db
      .prepare(
        `
      SELECT i.name, ri.quantity, ri.unit
      FROM recipe_ingredients ri
      JOIN ingredients i ON ri.ingredient_id = i.id
      WHERE ri.recipe_id = ?
    `
      )
      .all(id);

    // Get categories
    const categories = db
      .prepare(
        `
      SELECT c.name
      FROM recipe_categories rc
      JOIN categories c ON rc.category_id = c.id
      WHERE rc.recipe_id = ?
    `
      )
      .all(id);

    recipe.ingredients = ingredients;
    recipe.categories = categories.map((c) => c.name);

    res.json(recipe);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// POST new recipe
router.post('/recipes', (req, res) => {
  try {
    const {
      user_id,
      title,
      description,
      instructions,
      prep_time,
      cook_time,
      servings,
      image_url,
      categories,
      ingredients,
    } = req.body;

    // Insert recipe
    const result = db
      .prepare(
        `
      INSERT INTO recipes (user_id, title, description, instructions, prep_time, cook_time, servings, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
      )
      .run(
        user_id || 1,
        title,
        description,
        instructions,
        prep_time,
        cook_time,
        servings,
        image_url
      );

    const recipeId = result.lastInsertRowid;

    // Insert categories (if provided)
    if (categories && categories.length > 0) {
      const insertCat = db.prepare(
        'INSERT INTO recipe_categories (recipe_id, category_id) VALUES (?, ?)'
      );
      categories.forEach((categoryId) => {
        insertCat.run(recipeId, categoryId);
      });
    }

    // Insert ingredients (if provided)
    if (ingredients && ingredients.length > 0) {
      const insertIng = db.prepare(
        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)'
      );
      ingredients.forEach((ing) => {
        insertIng.run(recipeId, ing.ingredient_id, ing.quantity, ing.unit);
      });
    }

    res
      .status(201)
      .json({id: recipeId, message: 'Recipe created successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// POST review for a recipe
router.post('/recipes/:id/reviews', (req, res) => {
  try {
    const {id} = req.params;
    const {user_id, rating, comment} = req.body;

    const result = db
      .prepare(
        `
      INSERT INTO reviews (recipe_id, user_id, rating, comment)
      VALUES (?, ?, ?, ?)
    `
      )
      .run(id, user_id || 1, rating, comment);

    res
      .status(201)
      .json({id: result.lastInsertRowid, message: 'Review added successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// GET all categories
router.get('/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// POST ingredients for a recipe
router.post('/recipes/ingredients', (req, res) => {
  try {
    const {recipe_id, ingredients} = req.body;

    ingredients.forEach((ing) => {
      // First, insert ingredient if it doesn't exist
      const existingIngredient = db
        .prepare('SELECT id FROM ingredients WHERE name = ?')
        .get(ing.name);

      let ingredientId;
      if (existingIngredient) {
        ingredientId = existingIngredient.id;
      } else {
        const result = db
          .prepare('INSERT INTO ingredients (name, category) VALUES (?, ?)')
          .run(ing.name, 'Other');
        ingredientId = result.lastInsertRowid;
      }

      // Then link ingredient to recipe
      db.prepare(
        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)'
      ).run(recipe_id, ingredientId, ing.quantity, ing.unit);
    });

    res.status(201).json({message: 'Ingredients added successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default router;
