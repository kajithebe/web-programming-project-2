# Recipe Sharing Website

A full-stack web application for sharing and discovering recipes, built with React and Express.

## Project Structure

```
project/
├── frontend/          # React frontend application
├── backend/           # Express API server
│   └── src/
│       ├── config/    # Database configuration
│       ├── controllers/ # Business logic
│       ├── models/    # Database queries
│       ├── routes/    # API route definitions
│       └── server.js  # Main server file
└── database/          # Database files and schema
```

## Features

- Browse and search recipes
- Filter recipes by category
- View detailed recipe information with ingredients and instructions
- Add new recipes with ingredients
- Rate and review recipes
- Responsive design

## Technologies Used

### Frontend

- React 18
- React Router
- Vite
- CSS3

### Backend

- Node.js
- Express.js
- SQLite3 (better-sqlite3)
- CORS

## Database Schema

The application uses SQLite with 7 tables:

- **users** - User accounts
- **recipes** - Recipe information
- **categories** - Recipe categories
- **ingredients** - Ingredient library
- **recipe_ingredients** - Join table (many-to-many)
- **recipe_categories** - Join table (many-to-many)
- **reviews** - User reviews and ratings

See `database/schema-diagram.jpg` for the complete database diagram.

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm

### Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe
- `POST /api/recipes/ingredients` - Add ingredients to recipe
- `POST /api/recipes/:id/reviews` - Add review to recipe
- `GET /api/categories` - Get all categories

## Components

### Reusable Components

- Button
- Input
- RecipeCard
- Rating
- SearchBar
- CategoryFilter

### Interactive Components

- SearchBar (search functionality)
- CategoryFilter (filter by category)
- AddRecipe Form (create recipes)
- Rating Component (rate recipes)
- Review Form (submit reviews)

## Author

Kaji Thebe

## License

This project is for educational purposes.
