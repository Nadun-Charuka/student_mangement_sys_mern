// Importing all the packages 
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Configure environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Define the port
const PORT = process.env.PORT || 8070;

// Enable CORS (Cross-Origin Resource Sharing) for your Express.js app
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URL from environment variables
const URL = process.env.MONGODB_URL;

// Connect to MongoDB using Mongoose
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connection successful!");
})
.catch((err) => {
    console.error("MongoDB connection failed:", err.message);
});

const studentRouter = require("./routes/students.js");
 // http://localhost:8070/student
app.use("/student", studentRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
