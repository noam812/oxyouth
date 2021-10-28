import React, { useState, useEffect } from "react";
//Software-middleware imports
import "./App.scss";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
// Logostic imports
import Footer from "./Footer";
import Header from "./components/Header/Header";
import Logo from "../src/images/logo/logo2.png";
import Main from "./Main";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";

function App() {
  const [lng, setLng] = useState("he");
  const { t, i18n } = useTranslation("translation");
  const location = useLocation().pathname;

  useEffect(() => {
    if (
      location === "/ar" ||
      location === "/ar/articles" ||
      location === "/ar/products" ||
      location === "/ar/faq" ||
      location === "/ar/contact"
    ) {
      i18n.changeLanguage("ar");
      setLng("ar");
    }
    if (location === "/") {
      i18n.changeLanguage("he");
      setLng("he");
    }
  }, [location]);

  return (
    <div className="App">
      <Header logo={Logo} t={t} lng={lng} />
      <Main lng={lng} />
      <Footer lng={lng} />
    </div>
  );
}

export default App;
