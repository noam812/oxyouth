import React from "react";
import HomepageProducts from "./homepage/HomePageComp/HomepageProducts";

function Products({ lng }) {
  const lang = lng;
  return (
    <div className="page products">
      <HomepageProducts lng={lang} />
    </div>
  );
}

export default Products;
