import React, { useState } from "react";
import AdminSlider from "./adminComponents/AdminSlider";
import AdminProducts from "./adminComponents/AdminProducts";
import AdminArticles from "./adminComponents/AdminArticles/AdminArticles";
import Messages from "./adminComponents/Messages";
import Faq from "./adminComponents/faq";

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
    if (active === "messages") {
      return <Messages />;
    }
    if (active === "faq") {
      return <Faq/>;
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
            <li className="item" onClick={() => setActive(`messages`)}>
              הודעות שהגיעו
            </li>
            <li className="item" onClick={() => setActive(`faq`)}>
              שאלות נפוצות
            </li>
          </ul>
        </div>
      </div>
      <div className="content"> {contentHandler()}</div>
    </div>
  );
}

export default Admin;
