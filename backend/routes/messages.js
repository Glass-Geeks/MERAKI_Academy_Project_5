const express = require('express');
const messageRouter = express.Router()
const {getAllMessages, getImages} = require('../controllers/messages')

messageRouter.get('/:id',getAllMessages)
messageRouter.get('/img/:friend_id',getImages)


module.exports = messageRouter