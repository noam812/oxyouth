import React from "react";
import { useTranslation } from "react-i18next";
import  Contour  from "../../../../images/Contour.png";

function About() {
  const { t } = useTranslation("about");
  return (
    <div className="about">
      <div className="desc">
        <h1>{t("title")}</h1>
        <p>
          {t("line1")} <br />
          {t("line2")} <br />
          {t("line3")}
        </p>
      </div>
      <div className="pic">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=799&q=80"
          style={{ height: 450 }}
        />
      </div>
      { <img  className="contour" src={Contour} />}
    </div>
  );
}

export default About;
