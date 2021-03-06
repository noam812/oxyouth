import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import Loader from "react-loader-spinner";
import { AiFillDelete } from "react-icons/ai";

const client = axios.create({
  baseURL: `http://${process.env.NODE_ENV === 'development' ? 'localhost:3001' : window.location.host}/api/articles/`,
});

function AdminArticles() {
  const [fetchHandler, setFetchHandler] = useState(false);
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

  const handleChange = (e) => {
    setSpecificArt((x) => ({ ...x, title: e.target.value }));
  };
  const handleChangeRich = (value) => {
    setSpecificArt((x) => ({ ...x, content: value }));
  };

  const handleChangeTrans = (e) => {
    setSpecificArtTrans((x) => ({ ...x, titleAr: e.target.value }));
  };

  const handleChangeRichTrans = (value) => {
    setSpecificArtTrans((x) => ({ ...x, contentAr: value }));
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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get articles from DB on component mount
  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);
      try {
        const res = await client.get("/");
        setArticlesData(res.data);
        
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setFetchHandler(false);
      }
    };
    getArticles();
  }, [fetchHandler]);

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
                <h3>{article.title} </h3>

                <div>
                  <AiFillDelete
                    onClick={async () => {
                      setFetchHandler(true);
                      try {
                        const res = await client.delete(`/${article._id}`);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <label> ?????????? </label>
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

      <label> ?????????? </label>
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
