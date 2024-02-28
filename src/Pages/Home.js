import React, { useState, useRef } from "react";
import { sensMSGToOpenAI } from "./chat";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    setSubmittedText("");
    if (image && inputText) {
      setLoading(true);
      sensMSGToOpenAI({
        prompt: inputText,
        image: image,
        model: "gpt-4-vision-preview", // For Image analysis use this model
        tokens: 500, // no of response length
      }).then((res) => {
        setSubmittedText(res?.choices[0]?.message?.content);
        setLoading(false);
      });
    } else {
      alert("Upload Image and write a prompt");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = () => {
    document.getElementById("uploadInput").click();
  };
  return (
    <div
      style={{
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ width: 800, border: "1px solid black", padding: 50 }}>
        <h1>Welcome to OPEN AI Example</h1>
        <p>Upload any image | Write the prompt | Click on submit</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            style={{ height: 50, marginBottom: 30 }}
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter prompt"
          />

          <input
            type="file"
            id="uploadInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          {image && (
            <img
              src={image}
              style={{ alignSelf: "center" }}
              width="600"
              height="300"
              alt="Description of the image"
            />
          )}

          <button
            style={{ height: 50, marginBottom: 30 }}
            onClick={uploadImage}
          >
            Upload Image
          </button>

          <button
            style={{ height: 50, marginBottom: 30 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </button>

          <br />
        </div>
        {/* Display submitted text */}
        {loading && <p style={{ fontWeight: "bold" }}> ANALYSING IMAGE ...</p>}
        {submittedText && (
          <div style={{ width: 800 }}>
            <p style={{ fontWeight: "bold" }}> RESULT</p>
            <p style={{ whiteSpace: "pre-wrap" }}> {submittedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
