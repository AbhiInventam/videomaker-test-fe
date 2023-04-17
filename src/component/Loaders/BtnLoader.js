import React from "react";

const BtnLoader = ({ width }) => {
  // If We are setting up width in btn there should be difference is 60px
  // ex: if original btn size is 100px then we need to set width="40px"
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: `${width ? width : "38px"}`,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <div className="spinner-border spinner-border-sm" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default BtnLoader;
