import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const client = axios.create({
  baseURL: "http://localhost:3001/api/articles",
});

function Articles() {
  const [articlesData, setAticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("articles");
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
            <div className={`title`}>
              <h2>{article.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Articles;
