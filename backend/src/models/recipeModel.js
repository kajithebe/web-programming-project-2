import db from '../config/database.js';

export const getAllRecipes = () => {
  return db
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
};

export const getRecipeById = (id) => {
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

  if (!recipe) return null;

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

  return recipe;
};

export const createRecipe = (recipeData) => {
  const {
    user_id,
    title,
    description,
    instructions,
    prep_time,
    cook_time,
    servings,
    image_url,
  } = recipeData;

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

  return result.lastInsertRowid;
};

export const addRecipeIngredients = (recipe_id, ingredients) => {
  ingredients.forEach((ing) => {
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

    db.prepare(
      'INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES (?, ?, ?, ?)'
    ).run(recipe_id, ingredientId, ing.quantity, ing.unit);
  });
};

export const addReview = (recipe_id, user_id, rating, comment) => {
  const result = db
    .prepare(
      `
    INSERT INTO reviews (recipe_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
  `
    )
    .run(recipe_id, user_id || 1, rating, comment);

  return result.lastInsertRowid;
};

export const getAllCategories = () => {
  return db.prepare('SELECT * FROM categories').all();
};
