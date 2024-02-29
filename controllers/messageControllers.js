const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');

const sendMessage = asyncHandler(async (req, res)=>{
    const { content, chatId } = req.body;

    if (!content || !chatId){
        return res.status(400).send("Invalid data passed into the request");
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        console.log("Trying");
        var message = await Message.create(newMessage);

        message = await Message.populate(message, {
            path: "sender",
            select: "name pic",
        });
        message = await Message.populate(message, "chat");
        message = await Message.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error (error.message);
    }
});

const allMessages = asyncHandler(async (req, res)=>{
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name email pic").populate("chat");

        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error (error.message);
    }
});

module.exports = { sendMessage, allMessages };