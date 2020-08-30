import React from "react";
import SpinnerGIF from "../assets/spinner.gif";
import "../styles/Spinner.scss";
const Spinner = () => {
  return (
    <div className="spinner-div">
      <img src={SpinnerGIF} alt="Loading..." className="spinner" />
    </div>
  );
};

export default Spinner;
