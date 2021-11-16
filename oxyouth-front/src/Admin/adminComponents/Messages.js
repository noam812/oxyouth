import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { AiFillDelete } from "react-icons/ai";

const client = axios.create({
  baseURL: `http://${process.env.NODE_ENV === 'development' ? 'localhost:3001' : window.location.host}/api/contact`,
});

function Masseges() {
  const [fetchHandler, setFetchHandler] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messagesData, setMessagesData] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);

  const handleDisplay = (active) => {
    setActiveMessage(active);
    setActiveMessage((x) => ({ ...x, opened: true }));
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await client.get("/");
        setMessagesData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setFetchHandler(false);
      }
    };
    getMessages();
  }, [fetchHandler]);

  

  return (
    <div className="messages">
      <div className="display">
        {activeMessage === null ? (
          <h1> בחר הודעה לקרוא</h1>
        ) : (
          <>
            <div className="details">
              <p>שם : {activeMessage.fullname}</p>
              <p>טלפון : {activeMessage.phone}</p>
              <p>אימייל : {activeMessage.email}</p>
            </div>
            <div className="content">
              <p>נושא : {activeMessage.subject}</p>
              <p>תוכן הפנייה : {activeMessage.content}</p>
            </div>
          </>
        )}
      </div>
      <div className="sidebar">
        {isLoading === true ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            visible={isLoading}
          />
        ) : (
          messagesData.map((message, index) => {
            return (
              <div
                className={
                  message.opened === true ? "message opened" : "message"
                }
              >
                <p>{message.fullname}</p>
                <p>{message.phone}</p>
                <p>{message.email}</p>
                <button onClick={() => handleDisplay(message)}>
                  {message.opened === false ? "נקראה" : "פתח"}
                </button>
                <AiFillDelete
                  onClick={async () => {
                    setFetchHandler(true);
                    try {
                      const res = await client.delete(`/${message._id}`);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Masseges;
