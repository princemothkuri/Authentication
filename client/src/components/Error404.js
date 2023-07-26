import React from "react";
import errorImg from "./Error404.png";

const Error404 = () => {
  return (
    <>
      <div style={{ padding: 0, margin: 0 }}>
        <div style={{ height: "80vh" }}>
          <div className="text-center">
            <img src={errorImg} alt="404 Error" style={{ width: "60%" }} />
            <h2>page not found!</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
