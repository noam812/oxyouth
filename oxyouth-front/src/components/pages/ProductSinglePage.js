import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useTranslation } from "react-i18next";
import Loader from "react-loader-spinner";

const client = axios.create({
  baseURL: "http://localhost:3001/api/products",
});

function ProductSinglePage({ lng }) {
  const [productsData, setProductsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  

  
  const { t } = useTranslation("singleProduct");
  const lang = lng;
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await client.get(`/${id}`);
        setProductsData(res.data);
        console.log("resData", res.data);
        console.log({ productsData });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="single product">
      {isLoading === true ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          visible={isLoading}
        />
      ) : (
        <div>
          <img src={productsData.image} alt="image" />;
          <h1>
            {lang === "he"
              ? productsData.title
              : productsData.translations.ar.titleAr}
          </h1>
          <p>
            {lang === "he"
              ? productsData.desc
              : productsData.translations.ar.descAr}
          </p>
          <ul>
            <li>
              {t("pressure") ? productsData.pressure : productsData.translations.ar.pressureAr}
            </li>
            <li>
              {t("weight") ? productsData.weight : productsData.translations.ar.weightAr}
            </li>
            <li>
              {t("type")} : {productsData.type}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProductSinglePage;
