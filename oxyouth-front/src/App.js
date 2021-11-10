import React, { useState, useEffect } from "react";
// Software-middleware imports
import "./App.scss";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
// Logostic imports
import Footer from "./Footer";
import Header from "./components/Header/Header";
import Logo from "../src/images/logo/logo2.png";
import Main from "./Main";
import { useTranslation } from "react-i18next";
import { auth } from "./components/firebaseConfig";
import { onAuthStateChanged } from "@firebase/auth";

const routes = ["", "articles", "products", "faq", "contact"];

function App() {
  const [lng, setLng] = useState("he");
  const [loginState, setLoginState] = useState(false);
  const { t, i18n } = useTranslation("translation");
  const location = useLocation().pathname;

 

  const handleRoutes = (language) => {
    routes.map((route) => {
      if (location === `/${language}/${route}`) {
        i18n.changeLanguage("ar");
        setLng("ar");
      }
    });
  };

  useEffect(() => {
    // TODO: ugly
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

  onAuthStateChanged(auth, (user) => {
    if (user?.uid ==="PLN9vlZk45UOHfGzP6LzVztKBgp2") {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  });
  return (
    <div className="App">
      <Header logo={Logo} t={t} lng={lng} />
      <Main lng={lng} isAuth={loginState} />
      <Footer lng={lng} isAuth={loginState} />
    </div>
  );
}

export default App;
