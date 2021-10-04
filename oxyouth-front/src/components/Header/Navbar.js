import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Navbar({  lng }) {
  const location = useLocation().pathname;

  const lang = lng;

  const {t} =  useTranslation("translation")
  const activeclassHandler = (id) => {
    if (location === id) {
      return "navbar item_active";
    } else {
      return "navbar item";
    }
  };

  const handleLink = (lang, linkstr = ``) => {
    if (lang === "he") {
      return `/${linkstr}`;
    }
    if (lng === "ar") {
      return `/${lang}/${linkstr}`;
    }
  };
  return (
    <div>
      <nav className="navbar">
        <ul>
          <Link to={() => handleLink(lang)}>
            <li className={activeclassHandler("/")} id="/">
              {t("home")}
            </li>
          </Link>
          <Link to={() => handleLink(lang,`products`)}>
            <li className={activeclassHandler("/products")} id="/products">
              {t("products")}
            </li>
          </Link>
          <Link to={() => handleLink(lang,`articles`)}>
            <li className={activeclassHandler("/articles")} id="/articles">
              {t("articles")}
            </li>
          </Link>
          <Link to={() => handleLink(lang,`faq`)}>
            <li className={activeclassHandler("/faq")} id="/faq">
              {t("faq")}
            </li>
          </Link>

          <Link to={() => handleLink(lang,`contact`)}>
            <li className={activeclassHandler("/contact")} id="/contact">
              {t("contact")}
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
