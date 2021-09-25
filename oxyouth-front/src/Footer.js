import React from "react";
import { Link } from "react-router-dom";
import Logo from "./images/logo/logo.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("footer");
  return (
    <div className="footer">
      <img className="logo" src={Logo} alt="logo" />

      <div className="footer_contact">
        <h4>{t("header1")}</h4>
        <ul>
          <li> {t("phone")} : 0506685485 </li>
          <li> {t("email")} : eg@asdfdf.com </li>
          <li>{t("address")} : משהו </li>
          <Link to="/contact">
            <li>{t("contact")} </li>
          </Link>
        </ul>
      </div>
      <div className="footer_info">
        <h4>{t("header2")}</h4>
        <ul>
          <Link to="/products">
            <li>{t("products")} </li>
          </Link>
          <Link to="/">
            <li> {t("about")} </li>
          </Link>
          <Link to="/articles">
            <li> {t("articles")} </li>
          </Link>
          <Link to="/faq">
            <li> {t("faq")} </li>
          </Link>
        </ul>
      </div>

      <div className="footer_cr">
        <p> &copy;2021 Oxyouth </p>
      </div>
    </div>
  );
}

export default Footer;
