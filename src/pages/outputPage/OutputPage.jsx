import React, { useRef } from "react";
import styles from "./outputPage.module.css";
import { Link } from "react-router-dom";

import Loader from "../../components/loader/Loader";
import exportAsImage from "../../utils/exportAsImage";

import logo from "./../../assets/logo.png";
import readyToDownload from "./../../assets/outputPage/readyToDownload.svg";
import download from "./../../assets/outputPage/download.svg";
import email from "./../../assets/outputPage/email.svg";

export default function OutputPage({ generatedImg, setGeneratedImg }) {
  const downloadRef = useRef(null);
  return (
    <div className={`flex-col-center ${styles.OutputPage}`}>
      <header className={`flex-row-center ${styles.header}`}>
        <Link to={"/"}>
          <div
            onClick={() => setGeneratedImg("")}
            className={`imgContainer ${styles.logoContainer}`}
          >
            <img src={logo} alt="logo" />
          </div>
        </Link>
        <div className={`imgContainer ${styles.textContainer}`}>
          <img src={readyToDownload} alt="ready-to-download" />
        </div>
      </header>

      {!generatedImg && <Loader />}

      {generatedImg && (
        <main className={styles.main}>
          <div className={`imgContainer ${styles.imgContainer}`}>
            <img
              ref={downloadRef}
              src={`data:image/webp;base64,${generatedImg}`}
              alt="generated-image"
            />
          </div>
        </main>
      )}

      {generatedImg && (
        <footer className={styles.footer}>
          <div
            onClick={() =>
              exportAsImage(downloadRef.current, "ai-group-photobooth-utsav")
            }
            className={`imgContainer ${styles.imgContainer}`}
          >
            <img src={download} alt="submit" />
          </div>
          {/*  <div className={`imgContainer ${styles.imgContainer}`}>
            <img src={email} alt="email" />
          </div> */}
        </footer>
      )}
    </div>
  );
}
