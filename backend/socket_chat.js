let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
const chat = (socket) => {
  //take userId and socketId from user
  socket.on("ADD_USER", (userId) => {
    addUser(userId, socket.id);
    console.log("users :>> ", users);
    io.emit("GET_USERS", users);
  });

  //send and get message

  socket.on(
    "SEND_MESSAGE",
    async ({ sender, receiverId, message, connection_id }) => {
      const user = getUser(receiverId);
      console.log("user :>> ", user);
      const content = { sender, receiverId, message };
      console.log("content :>> ", content);
      await messageSchema
        .findOneAndUpdate(
          { connection_id },
          { $push: { messages: content } },
          { new: true }
        )
        .exec();
      io.to([user?.socketId, socket.id]).emit("RECEIVE_MESSAGE", {
        sender,
        message,
      });
    }
  );

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    console.log("users :>> ", users);
    io.emit("GET_USERS", users);
  });
};
