import React, { useState } from "react";
import styles from "./faceSwap.module.css";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "./../../assets/logo.png";
import swapFace from "./../../assets/faceSwapPage/swapFace.svg";
import arrow from "./../../assets/faceSwapPage/arrow.svg";
import addUser from "./../../assets/faceSwapPage/addUser.svg";

export default function FaceSwapPage({
  capturedImg,
  selectedImg,
  setGeneratedImg,
  templateFaces,
  capturedFaces,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedFaces, setSelectedFaces] = useState([]);

  // handle select face
  const handleSelectFace = (item, index) => {
    const newSelectedFaces = [...selectedFaces];
    newSelectedFaces[selectedIndex] = `data:image/png;base64,${item}`;
    setSelectedFaces(newSelectedFaces);
  };

  selectedFaces && console.log(selectedFaces);

  // toast options
  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: false,
    draggable: true,
    theme: "light",
  };

  // handle submit
  const handleSubmit = () => {
    if (selectedFaces) {
      console.log("submitting");
      axios
        .post("https://4f97-103-17-110-127.ngrok-free.app/send", {
          image: capturedImg.split(",")[1],
          choice: selectedImg.split(",")[1],
          map: selectedFaces,
        })
        .then(function (response) {
          /* setCapturedFaces(response.data.first);
          setTemplateFaces(response.data.second); */
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          toast.error("Something wrong...", toastOptions);
        });
      //   navigate("/face-swap");
    } else {
      toast.error(
        "Please select an image or capture your photo again...",
        toastOptions
      );
    }
  };

  return (
    <div className={`flex-col-center ${styles.FaceSwapPage}`}>
      <header className={styles.header}>
        <div className={`imgContainer ${styles.logoContainer}`}>
          <img src={logo} alt="logo" />
        </div>
      </header>

      {!templateFaces && !capturedFaces && <Loader />}

      {templateFaces && capturedFaces && (
        <main className={`flex-row-center ${styles.main}`}>
          <div className={`imgContainer ${styles.imgContainer}`}>
            <img src={selectedImg} alt="selected image" />
          </div>

          <div className={`flex-col-center ${styles.faceSwapContainer}`}>
            {templateFaces?.map((item, index) => (
              <div
                className={`flex-row-center ${styles.singleContainer}`}
                key={index}
              >
                <div className={`imgContainer ${styles.templateFaceContainer}`}>
                  <img
                    src={`data:image/webp;base64,${item}`}
                    alt="template-face"
                  />
                </div>

                <div className={`imgContainer ${styles.arrowIconContainer}`}>
                  <img src={arrow} alt="arrow" />
                </div>

                <div
                  onClick={() => {
                    setIsSelected(prev => !prev);
                    setSelectedIndex(index);
                  }}
                  className={`imgContainer ${styles.capturedFaceContainer}`}
                >
                  <img
                    src={selectedFaces[index] ? selectedFaces[index] : addUser}
                    alt="captured-face"
                  />
                </div>
              </div>
            ))}

            {isSelected && (
              <div className={`imgContainer ${styles.allFaceContainer}`}>
                {capturedFaces?.map((item, index) => (
                  <div
                    onClick={() => {
                      handleSelectFace(item, index);
                    }}
                    className={`imgContainer ${styles.singleFaceContainer}`}
                  >
                    <img src={`data:image/webp;base64,${item}`} alt="face" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      <footer className={styles.footer}>
        <div
          onClick={handleSubmit}
          className={`imgContainer ${styles.imgContainer}`}
        >
          <img src={swapFace} alt="submit" />
        </div>
        <ToastContainer />
      </footer>
    </div>
  );
}
