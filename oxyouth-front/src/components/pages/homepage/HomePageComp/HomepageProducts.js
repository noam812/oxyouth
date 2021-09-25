import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const client = axios.create({
  baseURL: "http://localhost:3001/api/products",
});

function HomepageProducts({ lng }) {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const lang = lng;
  const { t } = useTranslation("productsection");
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const res = await client.get("/");
        setProductsData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="products">
      <h1>{t("header")}</h1>
      <div className="grid">
        {productsData.map((product, index) => {
          return (
            <Link
              to={
                lang === "he"
                  ? `/products/${product._id}`
                  : `/ar/products/${product._id}`
              }
            >
              <div className="card" key={index}>
                <img src={product.image} className="image" />
                <h2>
                  {lang === "he"
                    ? product.title
                    : product.translations.ar.titleAr}
                </h2>
                <p>
                  {lang === "he"
                    ? product.desc
                    : product.translations.ar.descAr}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomepageProducts;
