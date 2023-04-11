const express = require('express');
const messageRouter = express.Router()
const {getAllMessages} = require('../controllers/messages')

messageRouter.get('/:id',getAllMessages)


module.exports = messageRouter