const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv= require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')


dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth',authRoutes);
//app.use('/api/auth',userRoutes);//

connectDB();

const PORT= process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});