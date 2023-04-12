const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
messages:[{ type: Object}],
roomId : {type:String}
})
module.exports = mongoose.model('message', messageSchema)