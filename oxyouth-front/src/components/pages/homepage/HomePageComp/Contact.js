import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FaPaperPlane, FaCheck } from "react-icons/fa";
import pattern from "../../../../images/logo/logo2.png";

// TODO: server url in prod (dup)
const client = axios.create({
  baseURL: `http://${process.env.NODE_ENV === 'development' ? 'localhost:3001' : window.location.host}/api/contact`,
});

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("contact");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="contact">
      {/* <h1>{t("header")}</h1> */}
      <div className="container">
        <div className="description">
          <h3>{t("header")}</h3>
          <h1>{t("header2")}</h1>
          <p>{t("paragraph")}</p>
        </div>
        <Formik
          initialValues={{
            fullname: "",
            phone: "",
            email: "",
            subject: "",
            content: "",
            opened: false,
          }}
          validationSchema={Yup.object({
            fullname: Yup.string().required(
              <div className="error">*Required</div>
            ),
            phone: Yup.string().required(
              <div className="error">*Required</div>
            ),
            email: Yup.string()
              .email("Invalid email address")
              .required(<div className="error">*Required</div>),
            subject: Yup.string().required(
              <div className="error">*Required</div>
            ),
            content: Yup.string().required(
              <div className="error">*Required</div>
            ),
          })}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              const res = await client.post("/", values);
              if (res.status === 200) {
                setSubmitted(true);
              }
            } catch (err) {
              console.error(err);
            } finally {
              setIsLoading(false);
              resetForm();
            }
          }}
        >
          <Form className="form">
            <div className="form table">
              <label className="label" htmlFor="fullname">
                {t("fullname")}
              </label>
              <Field className="field" name="fullname" />
              <ErrorMessage className="error" name="fullname" />
              <label className="label" htmlFor="phone">
                {t("phone")}
              </label>
              <Field className="field" name="phone" />
              <ErrorMessage className="error" name="phone" />
              <label className="label" htmlFor="email">
                {t("email")}
              </label>
              <Field className="field" name="email" />
              <ErrorMessage className="error" name="email" />
              <label className="label" htmlFor="subject">
                {t("subject")}
              </label>
              <Field className="field" name="subject" />
              <ErrorMessage className="error" name="subject" />
              <label className="label" htmlFor="content">
                {t("content")}
              </label>
              <Field className="field textarea" name="content" />
              <ErrorMessage className="error" name="content" />
            </div>
            {isLoading === true ? (
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                visible={isLoading}
              />
            ) : (
              <button type="submit" className="submit">
                {submitted === true ? (
                  <FaCheck className="submit plane" />
                ) : (
                  <FaPaperPlane className="submit plane" />
                )}
              </button>
            )}
          </Form>
        </Formik>
      </div>
      <img src={pattern} className="pattern" />
    </div>
  );
}

export default Contact;
