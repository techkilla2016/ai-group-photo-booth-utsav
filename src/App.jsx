import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  CameraPage,
  AvatarPage,
  FaceSwapPage,
  OutputPage,
} from "./pages";

export default function App() {
  const [capturedImg, setCapturedImg] = useState("");
  const [selectedImg, setSelectedImg] = useState();
  const [generatedImg, setGeneratedImg] = useState("");
  const [templateFaces, setTemplateFaces] = useState();
  const [capturedFaces, setCapturedFaces] = useState();
  const [url, setUrl] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        {/* home page */}
        <Route path={"/"} element={<HomePage />} />

        {/* camera page */}
        <Route
          path={"/camera"}
          element={<CameraPage setCapturedImg={setCapturedImg} />}
        />

        {/* avatar page */}
        <Route
          path={"/avatar"}
          element={
            <AvatarPage
              capturedImg={capturedImg}
              selectedImg={selectedImg}
              setSelectedImg={setSelectedImg}
              setTemplateFaces={setTemplateFaces}
              setCapturedFaces={setCapturedFaces}
            />
          }
        />

        {/* face swap page */}
        <Route
          path="/face-swap"
          element={
            <FaceSwapPage
              capturedImg={capturedImg}
              selectedImg={selectedImg}
              setGeneratedImg={setGeneratedImg}
              templateFaces={templateFaces}
              capturedFaces={capturedFaces}
              setUrl={setUrl}
            />
          }
        />

        {/* output page */}
        <Route
          path="/output"
          element={
            <OutputPage
              generatedImg={generatedImg}
              setGeneratedImg={setGeneratedImg}
              url={url}
              setUrl={setUrl}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
