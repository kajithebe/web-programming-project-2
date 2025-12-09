import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({message: 'Backend is working!'});
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
