const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const booksRoute = require('./routes/booksRoute.js'); // Importing the booksRoute module
const cors = require("cors");
// Load environment variables
dotenv.config();

// Set up server
const app = express();
const PORT = process.env.PORT || 5555;
app.use(express.json());

app.use(cors());
// Option 2: Allow Custom Origins
 //app.use(
   //cors({
    // origin: 'http://localhost:3000',
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type'],
   //})
 //);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.get('/', (request, response) => {
    console.log(request);
    return res.status(234).send('Welcome');
});

app.use('/books', booksRoute);

// Check if MONGO_CONNECT environment variable is set
if (!process.env.MONGO_CONNECT) {
  console.error('MONGO_CONNECT environment variable is not set.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECT)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("Error connecting to MongoDB:", err);
  process.exit(1); // Terminate the process if unable to connect to MongoDB
});
