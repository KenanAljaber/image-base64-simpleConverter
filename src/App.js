import { useEffect, useRef, useState } from "react";
import ConvertImageToBase64 from "./components/ConvertImageToBase64";
import "./index.css";



function App() {
  const [encodedImage, setEncodedImage] = useState(null);
  const [copyToClipboardTxt, setCopyToClipboardTxt] = useState("Click here to copy");
  const copyBtn = useRef(null);

  useEffect(() => {

  }, [encodedImage]);
  function handleChange(e) {
    ConvertImageToBase64(e.target.files[0], onResult);
  }

  //the callback to get the result of the encodded image
  function onResult(result) {
    setEncodedImage(result);
    setCopyToClipboardTxt("Click here to copy!");
    copyBtn.current.disabled = false;
  }

  function copyToClipBoard(e) {
    navigator.clipboard.writeText(encodedImage.base64);
    setCopyToClipboardTxt("Copied!");
    copyBtn.current.disabled = true;

  }
  return (
    <div className="App" style={{ textAlign: "center" }}>

      <input type='file' id='file' onChange={handleChange} />
      {encodedImage && <div> <h2>this is the encoded image after decoded it</h2>
      {/*this is the image after decoded it*/ }
        <img width="750px" style={{ "borderRadius": "10px", "boxShadow": "5px 7px 19px 0px #4ddca0" }}
          src={`data:image/jpeg;base64,${encodedImage.base64}`} />
      </div>}
      {encodedImage &&
        <div>
          <h2>this is the Base64 of the uploaded image</h2>
          <button ref={copyBtn} onClick={copyToClipBoard}>{copyToClipboardTxt}</button>
          <p style={{ overflowWrap: "break-word" }}>{encodedImage ? encodedImage.base64 : ""}</p>
        </div>}</div>
  );
}

export default App;
