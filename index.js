const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');


const app = express();
app.use(cors());
app.use(express.json()); // To accept JSON data
dotenv.config();
connectDB();

app.get('/', (req, res)=> {
    res.send("API running successfully.");
});

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));