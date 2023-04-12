const messageSchema = require("../module/messageSchema");

const getAllMessages = async (req, res) => {
  const roomId = req.params.id;
  try {
    const result = await messageSchema.findOne({ roomId });
    res
      .status(200)
      .json({ success: true, message: "Here is all messages", result });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error", error: error.message });
  }
};
module.exports = { getAllMessages };

/* 
app.get('/',(req,res)=>{
    const newMessage = new messageSchema ({
        roomId : 13 ,

    })
    newMessage.save().then(response=>res.json(response)).catch(error=>res.json(error))
})
*/