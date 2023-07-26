import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const Modal = ({ closeModal }) => {
  // const [value, setValue] = useState();
  const [pic, setPic] = useState("");

  const imageInputHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPic(base64);
  };

  const savePic = async (e) => {
    // e.preventDefault();
    const res = await fetch("/savepic", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        pic,
      }),
    });

    const data = await res.json();
    // console.log(data);
    // console.log(data.status);
    if (data.status === 422 || !data) {
      window.alert("please select the image");
      console.log("please select the image");
    } else {
      window.alert("Image saved successfully!");
      console.log("Image saved successfully!");
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return ReactDOM.createPortal(
    <>
      <div className="modal-wrapper " onClick={closeModal}></div>
      <div className="modal-container">
        <h1>Select your image</h1>
        <hr />
        <form method="post">
          <div className="row d-flex flex-row gap-2 align-items-center mb-2 mt-5">
            <PermMediaIcon />
            <div className="form-outline flex-fill mb-5">
              <input
                type="file"
                id="pic"
                className="form-control"
                name="pic"
                accept=".jpg, .png, .jpeg"
                onChange={imageInputHandler}
              />
            </div>

            <div className="buttons">
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className="btnInfo" onClick={savePic}>
                Add image
              </button>
            </div>
          </div>
        </form>
      </div>
    </>,
    document.querySelector(".AddPicModal")
  );
};

export default Modal;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
}
