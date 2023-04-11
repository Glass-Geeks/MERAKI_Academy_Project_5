const messageSchema = require("../module/messageSchema");

const addMessage = async (req, res) => {
    const {id} = req.params
    const {message} = req.body
    const newMessage = {message}
    try {
        const result = messageSchema.findOneAndUpdate({})
    } catch (error) {
        res.status(500).json({success:false,message:'server error',error:error.message})
        
    }
};
const getAllMessages = async (req, res) => {
    const roomId = req.params.id
    try {
        const result = await messageSchema.findOne({roomId})
        res.status(200).json({success:true,message:'Here is all messages',result})
    } catch (error) {
        res.status(500).json({success:false,message:'server error',error:error.message})
    }
};
module.exports = { addMessage, getAllMessages };
