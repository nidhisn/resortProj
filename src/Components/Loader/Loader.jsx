// src/Components/Loader/Loader.jsx
import React from "react";
import "./Loader.css"; // You can name this file whatever you like, e.g., Loader.module.css

const Loader = () => {
  return (
    <div className="loader-transition">
      <div className="loader-solo-container">
        <svg
          className="loader"
          data-name="loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 26"
        >
          <path
            className="loader-path"
            d="M0,10c23.33,0,23.33,20,46.66,20S70,10,93.33,10,116.67,30,140,30"
            transform="translate(0 -7)"
          ></path>
        </svg>
        <svg
          className="loader-static"
          data-name="loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 26"
        >
          <path
            className="loader-static-path"
            d="M0,10c23.33,0,23.33,20,46.66,20S70,10,93.33,10,116.67,30,140,30"
            transform="translate(0 -7)"
          ></path>
        </svg>
      </div>
      <div className="loader-solo-container">
        <svg
          className="loader"
          data-name="loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 26"
        >
          <path
            className="loader-path"
            d="M0,10c23.33,0,23.33,20,46.66,20S70,10,93.33,10,116.67,30,140,30"
            transform="translate(0 -7)"
          ></path>
        </svg>
        <svg
          className="loader-static"
          data-name="loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 26"
        >
          <path
            className="loader-static-path"
            d="M0,10c23.33,0,23.33,20,46.66,20S70,10,93.33,10,116.67,30,140,30"
            transform="translate(0 -7)"
          ></path>
        </svg>
      </div>
      <div className="loader-solo-container">
        <svg
          className="loader"
          data-name="loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 26"
        >
          <path
            className="loader-path"
            d="M0,10c23.33,0,23.33,20,46.66,20S70,10,93.33,10,116.67,30,140,30"
            transform="translate(0 -7)"
          ></path>
        </svg>
        <svg
          className="loader-static"
          data-name="loader"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 26"
        >
          <path
            className="loader-static-path"
            d="M0,10c23.33,0,23.33,20,46.66,20S70,10,93.33,10,116.67,30,140,30"
            transform="translate(0 -7)"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
