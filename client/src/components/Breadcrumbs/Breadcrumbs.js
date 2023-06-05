import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/UserContext";

import "./Breadcrumbs.css";

const pathToName = {
  "movies": "Phim",
  "currently-showing": "Phim đang chiếu",
  "coming-soon": "Phim sắp chiếu",
  "cinemas": "Rạp",
  "all": "Tất cả",
  "special": "Đặc biệt"
};
const Breadcrumbs = () => {
  const { detailMovie } = useContext(Context);

  const location = useLocation();
  let link = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      link += "/" + crumb;
      return (
        <span key={crumb}>
          <FontAwesomeIcon icon={faChevronRight} />
          {crumb === "detail" ? (
            <Link to={link}>{detailMovie.title}</Link>
          ) : (
            <Link to={link}>{pathToName[crumb]}</Link>
          )}
        </span>
      );
    });

  return (
    <div className="breadcrumbs-container">
      <Link to="/">
        <FontAwesomeIcon icon={faHouseChimney} />
      </Link>
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
