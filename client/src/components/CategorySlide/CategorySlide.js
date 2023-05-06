import React from "react";
import "./CategorySlide.css";

const CategorySlide = () => {
  return (
    <div className="category-slide-container">
      <div className="category">
        <p className="theater"></p>
        <p className="now-sh"></p>
        <p className="special"></p>
        <p className="event"></p>
        <p className="contact"></p>
        <p className="news"></p>
        <p className="register"></p>
      </div>
      <div className="category-border"></div>
    </div>
  );
};

export default CategorySlide;
