import React from "react";
import "./HomeTitle2.css";

const HomeTitle2 = (props) => {
  const { imgUrl } = props;

  return (
    <div className="home-title-container">
      <div className="title-line">
        <div className="title-logo-2">
          <img alt="home-title" src={imgUrl} />
        </div>
      </div>
    </div>
  );
};

export default HomeTitle2;
