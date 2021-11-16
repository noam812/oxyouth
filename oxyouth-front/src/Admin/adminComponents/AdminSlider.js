import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AiFillDelete } from "react-icons/ai";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Uploader from "../../components/Uploader";

//Creating axios instance - URL to our Server Route for slider.
const client = axios.create({
  baseURL: `http://${process.env.NODE_ENV === 'development' ? 'localhost:3001' : window.location.host}/api/slider`,
});

function AdminSlider() {
  const [sliderData, setSliderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchHandler, setFetchHandler] = useState(false);

  //Fetch items from DB as soon as component mounts. and set them to sliderData state.
  useEffect(() => {
    const getSlides = async () => {
      setIsLoading(true);
      try {
        const res = await client.get("/");
        setSliderData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setFetchHandler(false);
      }
    };
    getSlides();
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
          sliderData.map((slide, index) => {
            return (
              <div className="card">
                <img src={slide.image} alt={`${index}`} className={`img`} />
                <h3>{slide.desc}</h3>
                <h3>{slide.link}</h3>
                <div>
                  <AiFillDelete
                    onClick={async () => {
                      setFetchHandler(true);
                      try {
                        const res = await client.delete(`/${slide._id}`);
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
      <h2>הוסף תמונה למצגת התמונות</h2>
      <p>גודל מומלץ לתמונה : 1500px*450px</p>
      <div>
        <Formik
          initialValues={{
            image: "",
            desc: "",
            link: "",
            translations: {
              ar: {
                descAr: "",
                linkAr: "",
              },
            },
          }}
          validationSchema={Yup.object({
            image: Yup.string().required(
              <div className="error">*Required</div>
            ),

            desc: Yup.string().required(<div className="error">*Required</div>),

            link: Yup.string().required(<div className="error">*Required</div>),

            translations: Yup.object().shape({
              ar: Yup.object().shape({
                descAr: Yup.string().required(
                  <div className="error">*Required</div>
                ),
                linkAr: Yup.string().required(
                  <div className="error">*Required</div>
                ),
              }),
            }),
          })}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);

            try {
              const res = await client.post("/", values);
              setFetchHandler(true);
            } catch (err) {
              console.error({ err });
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
                <label className="label" htmlFor="desc">
                  תיאור
                </label>
                <Field className="field" name="desc" />
                <ErrorMessage className="error" name="desc" />
                <label className="label" htmlFor="link">
                  קישור
                </label>
                <Field className="field" name="link" />
                <ErrorMessage className="error" name="link" />
              </div>
              <div className="form_table ar">
                <label className="label" htmlFor="translations.ar.descAr">
                  תרגום :תיאור
                </label>
                <Field className="field" name="translations.ar.descAr" />
                <ErrorMessage className="error" name="translations.ar.descAr" />
                <label className="label" htmlFor="translations.ar.linkAr">
                  תרגום :קישור
                </label>
                <Field className="field" name="translations.ar.linkAr" />
                <ErrorMessage className="error" name="translations.ar.linkAr" />
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
          )}
        </Formik>
      </div>
    </>
  );
}

export default AdminSlider;
