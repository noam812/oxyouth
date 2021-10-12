import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const client = axios.create({
  baseURL: "http://localhost:3001/api/articles",
});

function Articles({ lng }) {
  const [articlesData, setAticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("articles");
  const lang = lng;

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);
      try {
        const res = await client.get("/");
        setAticlesData(res.data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);
  
  return (
    <div className="articles">
      <h1> {t("header")}</h1>
      <div className="grid">
        {articlesData.map((article, index) => {
          return (
            <Link
              to={
                lang === "he"
                  ? `/articles/${article._id}`
                  : `/ar/articles/${article._id}`
              }
            >
              <div className={`title`}>
                <h2>
                  {lang === "he"
                    ? article.title
                    : article.translations.ar.titleAr}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Articles;