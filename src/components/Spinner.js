import React from "react";
import SpinnerGIF from "./spinner.gif";
import "../styles/App.scss";
const Spinner = () => {
  return (
    <div className="spinner-div">
      <img src={SpinnerGIF} alt="Loading..." className="spinner" />
    </div>
  );
};

export default Spinner;
