import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AiFillDelete } from "react-icons/ai";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const client = axios.create({
  baseURL: `http://${process.env.NODE_ENV === 'development' ? 'localhost:3001' : window.location.host}/api/faq`,
});

function Faq() {
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchHandler, setFetchHandler] = useState(false);

  useEffect(() => {
    const getFaq = async () => {
      setIsLoading(true);
      try {
        const res = await client.get("/");
        setFaqData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setFetchHandler(false);
      }
    };
    getFaq();
  }, [fetchHandler]);

  return (
    <>
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
                <img src={faq.image} alt={`${index}`} className={`img`} />
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
                <div>
                  <AiFillDelete
                    onClick={async () => {
                      setFetchHandler(true);
                      try {
                        const res = await client.delete(`/${faq._id}`);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
      <h2>הוסף שאלות ותשובות</h2>
      <div>
        <Formik
          initialValues={{
            question: "",
            answer: "",
            translations: {
              ar: {
                questionAr: "",
                answerAr: "",
              },
            },
          }}
          validationSchema={Yup.object({
            question: Yup.string().required(
              <div className="error">*Required</div>
            ),

            answer: Yup.string().required(
              <div className="error">*Required</div>
            ),

            translations: Yup.object().shape({
              ar: Yup.object().shape({
                questionAr: Yup.string().required(
                  <div className="error">*Required</div>
                ),
                answerAr: Yup.string().required(
                  <div className="error">*Required</div>
                ),
              }),
            }),
          })}
          onSubmit={async (values) => {
            setIsLoading(true);
            try {
              const res = await client.post("/", values);
              if (res.status === 200) {
                setFetchHandler(true);
              }
            } catch (err) {
              console.error(err);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <Form className="form">
            <div className="form_table">
              <label className="label" htmlFor="question">
                שאלה
              </label>
              <Field className="field" name="question" />
              <ErrorMessage className="error" name="question" />
              <label className="label" htmlFor="answer">
                תשובה
              </label>
              <Field className="field" name="answer" />
              <ErrorMessage className="error" name="answer" />
            </div>
            <div className="form_table ar">
              <label className="label" htmlFor="translations.ar.questionAr">
                תרגום :שאלה
              </label>
              <Field className="field" name="translations.ar.questionAr" />
              <ErrorMessage
                className="error"
                name="translations.ar.questionAr"
              />
              <label className="label" htmlFor="translations.ar.answerAr">
                תרגום :תשובה
              </label>
              <Field className="field" name="translations.ar.answerAr" />
              <ErrorMessage className="error" name="translations.ar.answerAr" />
            </div>
            {isLoading === true ? (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={50}
                width={50}
                visible={isLoading}
              />
            ) : (
              <button type="submit" className="submit">
                הוסף
              </button>
            )}
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Faq;
