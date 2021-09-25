import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Slider from "./HomePageComp/Slider";
import HomepageProducts from "./HomePageComp/HomepageProducts";
import About from "./HomePageComp/About";
import Articles from "./HomePageComp/Articles";
import Contact from "./HomePageComp/Contact";
function Homepage({ lng }) {
  const lang = lng;
  return (
    <div className="page home ">
      <Slider lng={lang} />

      <HomepageProducts lng={lang} />

      <About lng={lang} />

      <Articles lng={lang} />

      <Contact />
    </div>
  );
}

export default Homepage;
