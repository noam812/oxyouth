import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const client = axios.create({
  baseURL: "http://localhost:3001/api/faq",
});

function Faq({ lng }) {
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const lang = lng;

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  useEffect(() => {
    const getFaq = async () => {
      try {
        const res = await client.get("/");
        setFaqData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getFaq();
  }, []);
  return (
    <div className="faq">
      {isLoading === true ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          visible={isLoading}
        />
      ) : (
        <div className="accordion">
          {faqData.map((faq, index) => {
            return (
              <div className="item">
                <div className="title" onClick={() => toggle(index)}>
                  <h3>
                    {lang === "he"
                      ? faq.question
                      : faq.translations.ar.questionAr}
                  </h3>
                  <span className="sign">{selected === index ? `-` : `+`}</span>
                </div>
                <div
                  className={selected === index ? `content show` : `content`}
                >
                  <p>
                    {lang === "he" ? faq.answer : faq.translations.ar.answerAr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Faq;
