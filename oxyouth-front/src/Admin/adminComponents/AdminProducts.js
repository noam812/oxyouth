import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AiFillDelete } from "react-icons/ai";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Uploader from "../../components/Uploader";

const client = axios.create({
  baseURL: "http://localhost:3001/api/products",
});

function AdminProducts() {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchHandler, setFetchHandler] = useState(false);

  //Fetch items from DB as soon as component mounts. and set them to sliderData state.
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await client.get("/");
        setProductsData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setFetchHandler(false);
      }
    };
    getProducts();
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
          productsData.map((product, index) => {
            return (
              <div className="card">
                <img src={product.image} alt={`${index}`} className={`img`} />
                <h3>{product.title}</h3>
                <div>
                  <AiFillDelete
                    onClick={async () => {
                      setFetchHandler(true);
                      try {
                        const res = await client.delete(`/${product._id}`);
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
      <Formik
        initialValues={{
          image: "",
          title: "",
          desc: "",
          pressure: "",
          weight: "",
          type: "",

          translations: {
            ar: {
              titleAr: "",
              descAr: "",
              pressureAr: "",
              weightAr: "",
              typeAr: "",
            },
          },
        }}
        validationSchema={Yup.object({
          image: Yup.string().required(<div className="error">*Required</div>),
          title: Yup.string().required(<div className="error">*Required</div>),
          desc: Yup.string().required(<div className="error">*Required</div>),
          pressure: Yup.string().required(
            <div className="error">*Required</div>
          ),
          weight: Yup.string().required(<div className="error">*Required</div>),
          type: Yup.string().required(<div className="error">*Required</div>),

          translations: Yup.object().shape({
            ar: Yup.object().shape({
              titleAr: Yup.string().required(
                <div className="error">*Required</div>
              ),
              descAr: Yup.string().required(
                <div className="error">*Required</div>
              ),
              pressureAr: Yup.string().required(
                <div className="error">*Required</div>
              ),
              weightAr: Yup.string().required(
                <div className="error">*Required</div>
              ),
              typeAr: Yup.string().required(
                <div className="error">*Required</div>
              ),
            }),
          }),
        })}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          try {
            const res = await client.post("/", values);
          } catch (err) {
            console.error(err);
          } finally {
            setIsLoading(false);
            resetForm();
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form className="form">
            <div className="form_table">
              <label className="label" htmlFor="image">
                העלה תמונה
              </label>
              <Uploader
                type="button"
                onUploaded={(url) => setFieldValue("image", url)}
              />
              <Field
                className="field"
                name="image"
                placeholder="https://images.unsplash.com/"
              />
              <ErrorMessage className="error" name="image" />
              <label className="label" htmlFor="title">
                שם הדגם
              </label>
              <Field className="field" name="title" />
              <ErrorMessage className="error" name="title" />
              <label className="label" htmlFor="desc">
                תיאור
              </label>
              <Field className="field" name="desc" />
              <ErrorMessage className="error" name="desc" />
              <label className="label" htmlFor="pressure">
                לחץ
              </label>
              <Field className="field" name="pressure" />
              <ErrorMessage className="error" name="pressure" />
              <label className="label" htmlFor="weight">
                משקל
              </label>
              <Field className="field" name="weight" />
              <ErrorMessage className="error" name="weight" />
              <label className="label" htmlFor="type">
                סוג תא
              </label>
              <Field className="field" name="type" />
              <ErrorMessage className="error" name="type" />
            </div>

            <div className="form_table ar">
              <h3>תרגום</h3>
              <label className="label" htmlFor="translations.ar.titleAr">
                שם הדגם
              </label>
              <Field className="field" name="translations.ar.titleAr" />
              <ErrorMessage className="error" name="translations.ar.titleAr" />
              <label className="label" htmlFor="translations.ar.descAr">
                תיאור
              </label>
              <Field className="field" name="translations.ar.descAr" />
              <ErrorMessage className="error" name="translations.ar.descAr" />
              <label className="label" htmlFor="translations.ar.pressureAr">
                לחץ
              </label>
              <Field className="field" name="translations.ar.pressureAr" />
              <ErrorMessage
                className="error"
                name="translations.ar.pressureAr"
              />
              <label className="label" htmlFor="translations.ar.weightAr">
                משקל
              </label>
              <Field className="field" name="translations.ar.weightAr" />
              <ErrorMessage className="error" name="translations.ar.weightAr" />
              <label className="label" htmlFor="translations.ar.typeAr">
                סוג תא
              </label>
              <Field className="field" name="translations.ar.typeAr" />
              <ErrorMessage className="error" name="translations.ar.typeAr" />
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
        )}
      </Formik>
    </>
  );
}

export default AdminProducts;
