import React, { useEffect, useState } from "react";
import styles from "./avatarPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

import { cardsArr } from "../../utils/cardsArr";
import { originalImgsArr } from "../../utils/originalImgsArr";
import { base64 } from "../../utils/base64";

import logo from "./../../assets/logo.png";
import selectTemplateText from "./../../assets/avatarPage/selectTemplateText.svg";
import submit from "./../../assets/avatarPage/submit.svg";
import select from "./../../assets/avatarPage/select.svg";

export default function AvatarPage({
  capturedImg,
  selectedImg,
  setSelectedImg,
  setCapturedFaces,
  setTemplateFaces,
}) {
  const navigate = useNavigate();
  const [selectedImgIndex, setSelectedImgIndex] = useState();

  // filtering card image with original image
  const filterOriginalImg = index => {
    const filteredOriginalImgArr = originalImgsArr.filter(
      (originalImg, originalImgIndex) => originalImgIndex === index
    );
    return filteredOriginalImgArr[0];
  };

  // toast options
  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
  };

  // selectedImg && console.log("selected img =>", selectedImg);

  // handle submit
  const handleSubmit = () => {
    setCapturedFaces("");
    setTemplateFaces("");
    if (selectedImg) {
      // console.log("submitting to 1st api");
      axios
        .post("https://37f5-103-17-110-127.ngrok-free.app/rec", {
          image: capturedImg.split(",")[1],
          choice: selectedImg.split(",")[1],
        })
        .then(function (response) {
          setCapturedFaces(response.data.first);
          setTemplateFaces(response.data.second);
          console.log("1st api =>", response);
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Something wrong...", toastOptions);
        });
      navigate("/face-swap");
    } else {
      toast.error(
        "Please select an image or capture your photo again...",
        toastOptions
      );
    }
  };

  return (
    <div className={`flex-col-center ${styles.AvatarPage}`}>
      <header className={`flex-row-center ${styles.header}`}>
        <div className={`imgContainer ${styles.logoContainer}`}>
          <img src={logo} alt="logo" />
        </div>
        <div className={`imgContainer ${styles.textContainer}`}>
          <img src={selectTemplateText} alt="selectTemplateText" />
        </div>
      </header>

      <main className={`flex-row-center ${styles.main}`}>
        {cardsArr.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedImgIndex(index);
              if (index !== 2) {
                const originalImg = filterOriginalImg(index);
                base64(originalImg, base64Data => {
                  setSelectedImg(base64Data);
                });
              } else {
                const originalImg = filterOriginalImg(index);
                // console.log("working");
                // console.log("selectedOriginal =>", originalImg);
                setSelectedImg(originalImg);
              }
            }}
            className={`${styles.singleContainer} ${
              selectedImgIndex === index ? styles.showSingleContainer : ""
            }`}
          >
            <div className={`imgContainer ${styles.imgContainer}`}>
              <img src={item} alt="template" />
            </div>
            <div
              className={`${styles.selectContainer} ${
                selectedImgIndex === index ? styles.showSelectContainer : ""
              }`}
            >
              <div className={`imgContainer ${styles.selectIcon}`}>
                <img src={select} alt="selected" />
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <div
          onClick={handleSubmit}
          className={`imgContainer ${styles.imgContainer}`}
        >
          <img src={submit} alt="submit" />
        </div>
        <ToastContainer />
      </footer>
    </div>
  );
}
