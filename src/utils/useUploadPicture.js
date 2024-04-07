import React, { useState } from "react";
import axios from "axios";

const useUploadPicture = img => {
  const [isLoading, setIsLoading] = useState(false);
  if (img) {
    setIsLoading(true);
    axios
      .post("https://953e-103-17-110-127.ngrok-free.app/rec", {
        image: userImage.split(",")[1],
        choice: template.split(",")[1],
      })
      .then(function (response) {
        console.log(response);
        setGeneratedImg(`data:image/webp;base64,${response.data.result}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    toast.error("Please upload or select images...", toastOptions);
  }
};
