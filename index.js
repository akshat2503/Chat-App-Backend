const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const { chats } = require("./data/data");


const app = express();
app.use(cors())
dotenv.config();

app.get('/api/chats', (req, res)=> {
    res.send(chats);
});

app.get('/api/chats/:id', (req, res)=> {
    // res.send(chats);
    const singleChat = chats.find((c)=>c._id === req.params.id);
    res.send(singleChat);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));