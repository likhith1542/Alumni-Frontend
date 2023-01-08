import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import "./Messages.css";
import { useSelector } from "react-redux";
import useChat from "./ChatSocket";
import { format } from "timeago.js";

function Messages({ pic, convId, name }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { socketmessages, socketsendMessage } = useChat(convId);
  const [userPic, setUserPic] = useState([]);
  const scrollRef = useRef();

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  const getPPic = () => {
    axios
      .get(`http://localhost:5000/api/users/getuseravatar/${user.id}`)
      .then((result) => {
        setUserPic(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateMessages = () => {
    axios
      .get(`http://localhost:5000/api/messages/${convId}`)
      .then((result) => {
        result.data.sort(GetSortOrder("postedOn"));
        setMessages(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateMessages();
    // eslint-disable-next-line
  }, [convId, socketmessages]);

  useEffect(() => {
    getPPic();
    // eslint-disable-next-line
  }, [user]);

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage = {
      conversationId: convId,
      sender: user.id,
      text: message,
    };

    socketsendMessage(newMessage);

    axios
      .post("http://localhost:5000/api/messages/", newMessage)
      .then((result) => {
        updateMessages();
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {convId ? (
        <>
          <div className="sendmessage">
            <textarea
              value={message}
              className="materialize-textarea postarea messagearea"
              placeholder="Start Typing..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <FiSend className="sendbtn" size={25} onClick={sendMessage} />
          </div>

          <div className="messagehead">{name}</div>

          {messages.map((message) => {
            return (
              <div
                ref={scrollRef}
                className={
                  message.sender === user.id ? "message own" : "message"
                }
              >
                <div className="messageTop">
                  <img
                    className="messageImg"
                    src={message.sender === user.id ? userPic : pic}
                    alt=""
                  />
                  <p className="messageText">{message.text}</p>
                </div>
                <div className="messageBottom">{format(message.postedOn)}</div>
              </div>
            );
          })}
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Select Conversation to Start</p>
      )}
    </div>
  );
}

export default Messages;
