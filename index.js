const express = require('express'); 
const dotenv = require('dotenv'); 
const database = require('./config/database'); 


const app = express(); 

dotenv.config();
const PORT = process.env.PORT || 3000;

// This route will respond with "Hello World!" when the root URL is accessed
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use(express.json()); // Middleware to parse JSON request bodies

database.connect(); // Call the connectDB function to establish a connection to the MongoDB database

//Routes
app.use('/api/auth', require('./routes/Auth')); // Import and use the authentication routes
app.use('/api/books', require('./routes/Book')); // Import and use the user routes
app.use('/api/reviews', require('./routes/Review')); // Import and use the review routes
app.use('/api/search', require('./routes/Search')); // Import and use the search routes

// Create a server and listen on the specified port
app.listen(PORT, () => {    
  console.log(`Server is running on ${PORT}`);
});



