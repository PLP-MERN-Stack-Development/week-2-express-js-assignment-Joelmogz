const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes');
const logger = require('./logger');
const { errorHandler } = require('./errorHandler');

// Initialize Express app
const app = express();
const mongoUri = 'mongodb://localhost:27017/taskdb'; // Replace with your MongoDB URI

const PORT = 3000;
// Middleware setup 
 app.use(express.json());
 app.use('/products', productRoutes);
 app.use(logger);

 app.get('/', (req, res) => res.send('Hello World'));

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('connected to MongoDB'))
  .catch(err=> console.error('MongoDB connection error:', err));     

//   listening to the server

app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Error handling middleware
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});