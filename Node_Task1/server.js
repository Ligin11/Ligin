const express = require('express');
const bodyParser =require ('body-parser')
const connectDB = require("./config/dbConfig")
const recipeRoutes = require("./routes/receipeRoutes")

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api/recipes', recipeRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

