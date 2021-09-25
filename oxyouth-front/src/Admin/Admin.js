import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSlider from "./AdmonComp.js/AdminSlider";
import AdminProducts from "./AdmonComp.js/AdminProducts";
import AdminArticles from "./AdmonComp.js/Admin ARticles/AdminArticles";

function Admin() {
  const [active, setActive] = useState("");

  const contentHandler = () => {
    if (active === "slider") {
      return <AdminSlider />;
    }

    if (active === "products") {
      return <AdminProducts />;
    }
    if (active === "articles") {
      return <AdminArticles />;
    }
    if (active === "massages") {
      return <h1>massages</h1>;
    }
  };

  return (
    <div className="admin">
      <div className="sidebar">
        <div className="sidebar nav">
          <ul className="list">
            <li className="item" onClick={() => setActive(`products`)}>
              מוצרים
            </li>
            <li className="item" onClick={() => setActive(`articles`)}>
              מאמרים
            </li>
            <li className="item" onClick={() => setActive(`slider`)}>
              תמונות
            </li>
            <li className="item" onClick={() => setActive(`massages`)}>
              הודעות שהגיעו
            </li>
          </ul>
        </div>
      </div>
      <div className="content"> {contentHandler()}</div>
    </div>
  );
}

export default Admin;
