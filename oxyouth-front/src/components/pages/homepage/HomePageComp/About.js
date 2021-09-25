import React from "react";
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation("about");
  return (
    <div className="about">
      <div className="description">
        <h1>{t("title")}</h1>
        <p>
          {t("line1")} <br />
          {t("line2")} <br />
          {t("line3")} 
        </p>
      </div>
    </div>
  );
}

export default About;
