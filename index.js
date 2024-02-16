const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");

const app = express();
app.use(cors())
dotenv.config();
connectDB();

app.get('/', (req, res)=> {
    res.send("API running successfully.");
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));