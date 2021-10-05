import React from "react";
import logo from "../assets/react-logo-min.png";

const Loading = ({ isLoading }) => {
  return (
    <div className={`loading ${isLoading ? "show" : ""}`}>
      <img src={logo} alt="loading"></img>
    </div>
  );
};

export default Loading;
