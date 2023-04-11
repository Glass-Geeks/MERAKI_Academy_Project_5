const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
messages:[{ type: String}],
roomId : {type:String}
})
module.exports = mongoose.model('message', messageSchema)