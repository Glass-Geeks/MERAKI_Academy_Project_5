
const Message = ({ message, own, img }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {own ? (
          <img className="messageImg" src={img.myImg} alt="" />
        ) : (
          <img className="messageImg" src={img.friendImg} alt="" />
        )}
        <p className="messageText">{message.text}</p>
      </div>

    </div>
  );
};

export default Message;
