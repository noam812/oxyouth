import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";
import axios from "axios";
import { useTranslation } from "react-i18next";

const client = axios.create({
  baseURL: "http://localhost:3001/api/contact",
});

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("contact");
  return (
    <div className="contact">
      <h2>{t("header")}</h2>
      <Formik
        initialValues={{
          fullName: "",
          phone: "",
          email: "",
          subject: "",
          content: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required(
            <div className="error">*Required</div>
          ),
          phone: Yup.string().required(<div className="error">*Required</div>),
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
        onSubmit={async (values) => {
          setIsLoading(true);
          try {
            const res = await client.post("/", values);
          } catch (err) {
            console.error(err);
          } finally {
            setIsLoading(false);
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
            <Field className="field textarea" name="content" as="textarea" />
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
              הוסף
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
}

export default Contact;
