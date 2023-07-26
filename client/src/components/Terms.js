import React, { useEffect } from "react";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms And Conditions";
  });

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#f4f5f7", minHeight: "90.4vh" }}
      >
        <div className="container p-5">
          <h1
            className="title text-center text-capitalize"
            style={{ fontSize: "4rem" }}
          >
            Authentication Terms and Conditions of Service
          </h1>
        </div>
      </div>
    </>
  );
};

export default Terms;
