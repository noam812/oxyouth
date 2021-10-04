import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

const client = axios.create({
  baseURL: "http://localhost:3001/api/contact",
});

function Masseges() {
  const [isLoading, setIsLoading] = useState(true);
  const [messagesData, setMessagesData] = useState(null);
  const [activeMessage, setActiveMessage] = useState(null);

  const handleDisplay = (active) => {
    console.log(active);
    setActiveMessage(active);
    console.log(activeMessage);
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
      }
    };
    getMessages();
    console.log(messagesData);
  }, []);

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
            <div className='content'>
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
              <div className="message">
                <p>{message.fullname}</p>
                <p>{message.phone}</p>
                <p>{message.email}</p>
                <button  onClick={() => handleDisplay(message)}>פתח</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Masseges;
