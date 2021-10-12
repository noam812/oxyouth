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
  const lang = lng;


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
    <div className="grid">
      {isLoading === true ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          visible={isLoading}
        />
      ) : (
        faqData.map((faq, index) => {
          return (
            <div className="card">
              <h3>
                {lang === "he" ? faq.question : faq.translations.ar.questionAr}
              </h3>
              <h3>  {lang === "he" ? faq.answer : faq.translations.ar.answerAr}</h3>
              
            </div>
          );
        })
      )}
    </div>
  );
}

export default Faq;
