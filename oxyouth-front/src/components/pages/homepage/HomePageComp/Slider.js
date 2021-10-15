import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const slide =document.querySelector('slide')

const client = axios.create({
  baseURL: "http://localhost:3001/api/slider",
});

function Slider({ lng }) {
  const [sliderData, setSliderData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const lang = lng;
  console.log(slide);

  const length = sliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    async function getSlides() {
      setLoading(true);
      try {
        const res = await client.get("/");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSliderData(res.data);
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    }
    getSlides();
  }, [length]);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent(current === length - 1 ? 0 : current + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [current]);

  if (!Array.isArray(sliderData) || length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      {isLoading === true ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          visible={isLoading}
        />
      ) : (
        <>
          <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />

          {sliderData.map((slide, index) => {
            return (
              <div
                className={index === current ? "slide active" : "slide"}
                key={index}
              >
                <>
                  <img
                    src={slide.image}
                    alt={`${index}`}
                    className={`image ${index + 1}`}
                  />
                  <Link
                    to={
                      lang === "he" ? slide.link : slide.translations.ar.linkAr
                    }
                  >
                    <h1 className="desc">
                      {lang === "he"
                        ? slide.desc
                        : slide.translations.ar.descAr}
                    </h1>
                  </Link>
                </>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Slider;
