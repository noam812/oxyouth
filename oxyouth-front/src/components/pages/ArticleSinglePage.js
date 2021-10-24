import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

import axios from "axios";
import Loader from "react-loader-spinner";

const client = axios.create({
  baseURL: "http://localhost:3001/api/articles",
});
function ArticleSinglePage({ lng }) {
  const [articleData, setArticleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const lang = lng;

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res = await client.get(`/${id}`);
        console.log(res);
        setArticleData(res.data);
        console.log({ articleData });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, []);

  return (
    <div className= "page article">
      {isLoading === true ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          visible={isLoading}
        />
      ) : (
        <div className='container' >
          <h1>
            {lang === "he"
              ? articleData.title
              : articleData.translations.ar.titleAr}
          </h1>

          <>{lang === "he" ? parse(articleData.content) :parse(articleData.translations.ar.contentAr)}</>
        </div>
      )}
    </div>
  );
}

export default ArticleSinglePage;
