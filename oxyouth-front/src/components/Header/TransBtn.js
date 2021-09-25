import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

/**
 * The Use state and changeLang functions are to handle the button and link basically.
 * @Link takes care of the route - which App.js useeffect changelanguage.
 */

function TransBtn() {
  const [langState, setLangState] = useState("he");
  const [t] = useTranslation();

  const changeLng = (lang) => {
    if (lang !== langState) {
      setLangState(lang);
    }
    if (lang === langState) {
      setLangState("he");
    }
  };

  return (
    <div className="trans">
      <Link to={langState === "he" ? "/" : "/ar"}>
        <button onClick={() => changeLng("ar")} className="trans btn">
          {t("content")}
        </button>
      </Link>
    </div>
  );
}

export default TransBtn;
