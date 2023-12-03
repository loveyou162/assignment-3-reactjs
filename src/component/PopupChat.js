import classes from "./Popupchat.module.css";
import imgAdmin from "../assets/Resource Assignment 03/admin.png";
import { useState } from "react";
function PopupChat() {
  const [message, setMessage] = useState(false);
  //hàm ẩn hiện hộp chat
  const messageHandler = () => {
    setMessage(!message);
  };
  return (
    <div className={`${classes.popupChat}`}>
      <div className={`${classes["box-chat"]} ${message && classes.show}`}>
        <div className={classes["boxChat-header"]}>
          <h3>Customer Support</h3>
          <button>Let's chat app</button>
        </div>
        {/* demo chat */}
        <div className={classes["chat-messages"]} id="chatMessages">
          <div className={classes["admin-message"]}>
            <img src={imgAdmin} alt="" />
            <div className={classes["message-content"]}>
              <p>Xin chào bạn!</p>
              <div className={classes["square"]}></div>
              <div className={classes["circle1"]}></div>
              <div className={classes["circle2"]}></div>
            </div>
          </div>
          <div className={classes["client-message"]}>
            <div className={classes["message-content"]}>
              <p>Xin chào bạn tôi là thắng!</p>
              <div className={classes["square"]}></div>
              <div className={classes["circle1"]}></div>
              <div className={classes["circle2"]}></div>
            </div>
            <img src={imgAdmin} alt="" />
          </div>

          <div className={classes["admin-message"]}>
            <img src={imgAdmin} alt="" />
            <div className={classes["message-content"]}>
              <p>Xin chào bạn!</p>
              <div className={classes["square"]}></div>
              <div className={classes["circle1"]}></div>
              <div className={classes["circle2"]}></div>
            </div>
          </div>
        </div>
        <div className={classes["chat-input"]}>
          <img src={imgAdmin} alt="" />
          <input type="text" placeholder="Type a message..." />
          <button>
            {/* tệp đính kèm */}
            <i className="fa-solid fa-paperclip"></i>
          </button>
          <button>
            {/* icon */}
            <i className="fa-solid fa-face-smile"></i>
          </button>
          <button>
            {/* send */}
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <button className={classes["btn-message"]} onClick={messageHandler}>
        <i className="fa-brands fa-facebook-messenger"></i>
      </button>
    </div>
  );
}
export default PopupChat;
