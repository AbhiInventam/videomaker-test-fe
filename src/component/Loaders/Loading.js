import React from "react";

const Loading = ({ height }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: `${height ? height : "500px"}`,
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loading;
