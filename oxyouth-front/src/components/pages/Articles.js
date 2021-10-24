import React, { useState, useEffect } from "react";
import Articles from "./homepage/HomePageComp/Articles";

function ArticlesP({ lng }) {
  const lang = lng;
  return (
    <div className="page articles">
      <Articles lng={lang} />
    </div>
  );
}

export default ArticlesP;
