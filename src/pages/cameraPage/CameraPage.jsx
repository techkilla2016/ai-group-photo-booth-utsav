import React, { useState, useRef } from "react";
import styles from "./cameraPage.module.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";

import upload from "./../../assets/cameraPage/upload.svg";
import capture from "./../../assets/cameraPage/capture.svg";
import retake from "./../../assets/cameraPage/retake.svg";
import submit from "./../../assets/cameraPage/submit.svg";
import headingTextCapture from "./../../assets/cameraPage/headingTextCapture.svg";
import logo from "./../../assets/logo.png";

export default function CameraPage({ setCapturedImg }) {
  const navigate = useNavigate();
  const webRef = useRef(null);
  const uploadPictureRef = useRef(null);
  const [img, setImg] = useState("");

  // handle upload template
  const handleUploadPicture = () => {
    uploadPictureRef.current.click();
  };

  // upload template
  const handleUploadPictureChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // handle capture
  const handleCapture = e => {
    if (webRef.current.getScreenshot()) {
      setImg(webRef.current.getScreenshot());
    }
  };

  // handle retake
  const handleRetake = e => {
    img && setImg("");
  };

  // handle submit
  const handleSubmit = () => {
    if (img) {
      setCapturedImg(img);
      navigate("/avatar");
      // console.log(img);
    } else {
      toast.error("Please capture or upload your image", toastOptions);
    }
  };

  return (
    <div className={`flex-col-center ${styles.CameraPage}`}>
      <header className={`flex-row-center ${styles.header}`}>
        <div className={`imgContainer ${styles.logoContainer}`}>
          <img src={logo} alt="logo" />
        </div>
        <div className={`imgContainer ${styles.textContainer}`}>
          <img src={headingTextCapture} alt="selectTemplateText" />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.webcamContainer}>
          {!img && (
            <Webcam
              ref={webRef}
              id={styles.webcam}
              forceScreenshotSourceSize={true}
            />
          )}
          {img && (
            <img
              src={img}
              alt="captured image"
              className={styles.capturedImage}
            />
          )}
        </div>
      </main>

      <footer className={`flex-col-center ${styles.footer}`}>
        <div className={`flex-row-center ${styles.topBtns}`}>
          <div className={styles.leftBtn}>
            <div
              onClick={handleUploadPicture}
              className={`imgContainer ${styles.imgContainer}`}
            >
              <img src={upload} alt="upload" />
              <input
                type="file"
                ref={uploadPictureRef}
                onChange={handleUploadPictureChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className={styles.rightBtn}>
            {!img && (
              <div
                onClick={handleCapture}
                className={`imgContainer ${styles.imgContainer}`}
              >
                <img src={capture} alt="capture" />
              </div>
            )}
            {img && (
              <div
                onClick={handleRetake}
                className={`imgContainer ${styles.imgContainer}`}
              >
                <img src={retake} alt="retake" />
              </div>
            )}
          </div>
        </div>
        <div className={styles.bottomBtns}>
          <div
            onClick={handleSubmit}
            className={`imgContainer ${styles.imgContainer}`}
          >
            <img src={submit} alt="sumbit" />
          </div>
        </div>
      </footer>
    </div>
  );
}
