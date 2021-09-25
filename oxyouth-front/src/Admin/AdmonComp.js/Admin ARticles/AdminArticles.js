import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

import Loader from "react-loader-spinner";
import { AiFillDelete } from "react-icons/ai";
import Slider from "./../../../components/pages/homepage/HomePageComp/Slider";

const client = axios.create({
  baseURL: "http://localhost:3001/api/articles",
});

function AdminArticles() {
  const [articlesData, setArticlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [specificArt, setSpecificArt] = useState({
    title: "",
    content: "",
  });
  const [specificArtTrans, setSpecificArtTrans] = useState({
    titleAr: "",
    contentAr: "",
  });

  const schemaAdaptation = {
    title: "",
    content: "",
    translations: {
      ar: {
        titleAr: "",
        contentAr: "",
      },
    },
  };

  const handleChange = (e) => {
    setSpecificArt((x) => ({ ...x, title: e.target.value }));
    console.log(specificArt);
  };
  const handleChangeRich = (value) => {
    setSpecificArt((x) => ({ ...x, content: value }));
    console.log(specificArt);
  };

  const handleChangeTrans = (e) => {
    setSpecificArtTrans((x) => ({ ...x, titleAr: e.target.value }));
    console.log(specificArtTrans);
  };

  const handleChangeRichTrans = (value) => {
    setSpecificArtTrans((x) => ({ ...x, contentAr: value }));
    console.log(specificArtTrans);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await client.post("/", {
        title: specificArt.title,
        content: specificArt.content,
        translations: {
          ar: {
            titleAr: specificArtTrans.titleAr,
            contentAr: specificArtTrans.contentAr,
          },
        },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);
      try {
        const res = await client.get("/");
        setArticlesData(res.data);
        console.log(articlesData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getArticles();
  }, []);

  return (
    <div>
      <div className="grid">
        {isLoading === true ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            visible={isLoading}
          />
        ) : (
          articlesData.map((article, index) => {
            return (
              <div className="card">
                <h1>{article.title} </h1>
                <h3>{}</h3>
                <div>
                  <AiFillDelete
                    onClick={() => {
                      client.delete(`/${article._id}`);
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <label> כותרת </label>
      <input value={specificArt.title} onChange={handleChange} />

      <div>
        <EditorToolbar id={"t1"} />
        <ReactQuill
          className="editor"
          toolbarId={"t1"}
          defaultValue={specificArt.content}
          onChange={handleChangeRich}
          theme={"snow"}
          modules={modules("t1")}
          formats={formats}
        />
      </div>

      <label> כותרת </label>
      <input value={specificArtTrans.titleAr} onChange={handleChangeTrans} />
      <div>
        <EditorToolbar id={"t2"} />
        <ReactQuill
          placeholder="Translation here"
          className="editor"
          toolbarId={"t2"}
          defaultValue={specificArtTrans.contentAr}
          onChange={handleChangeRichTrans}
          theme={"snow"}
          modules={modules("t2")}
          formats={formats}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default AdminArticles;
