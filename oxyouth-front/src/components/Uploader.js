import React, { useState } from "react";
import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Uploader({ onUploaded }) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setError("");
        setImage(file);
      } else {
        setError("Please select an image to upload");
      }
    }
  };
  const handleUpdate = async () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);

      const upload = uploadBytesResumable(storageRef, image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            onUploaded(downloadURL);
            setProgress(0);
          });
        }
      );
    } else {
      setError("Error please choose an image to upload");
    }
  };

  return (
    <div>
      {url ? (
        <img src={url} alt="logo" style={{ height: 150 }} />
      ) : (
        <p>picture</p>
      )}
      <div>
        <input type="file" onChange={handChange} />
        <button onClick={handleUpdate}> Upload</button>
      </div>
      <div style={{ height: "100px" }}>
        {progress > 0 ? <progress value={progress} max="100" /> : ""}
        <p style={{ color: "red" }}>{error}</p>
      </div>
    </div>
  );
}

export default Uploader;
