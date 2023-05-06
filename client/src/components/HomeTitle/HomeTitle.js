import React from "react";
import "./HomeTitle.css";

const HomeTitle = (props) => {
  const { imgUrl } = props;

  return (
    <div className="home-title-container">
      <div className="title-line">
        <div className="title-logo">
          <img alt="home-title" src={imgUrl} />
        </div>
      </div>
    </div>
  );
};

export default HomeTitle;
