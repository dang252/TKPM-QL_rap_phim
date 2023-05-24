import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import "./DetailPage.css";

import DetailMovieContent from "../../components/DetailMovieContent/DetailMovieContent";

import { Context } from "../../context/UserContext";
// import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const DetailPage = () => {
  const { getDetailMovie, detailMovie } = useContext(Context);

  const [searchParams] = useSearchParams();
  const movieID = searchParams.get("id");

  useEffect(() => {
    if (movieID !== "") {
      getDetailMovie(movieID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieID]);

  return (
    <div className="detail-page-container">
      <div className="detail-page-header">
        <div className="detail-page-breadcrumbs">
          <Link to="/" style={{ color: "#000", textDecoration: "none" }}>
            <p style={{ fontSize: "14px" }}>
              <FontAwesomeIcon icon={faHouseChimney} />
            </p>
          </Link>
          <p className="detail-page-breadcrumbs-mark">
            <img
              src="../../assets/img/bg-cgv-icon-arrow.png"
              alt="icon-arrow"
            />
          </p>
          {Object.keys(detailMovie).length !== 0 && (
            <p style={{ fontWeight: "600", textDecoration: "underline" }}>
              {detailMovie.title}
            </p>
          )}
        </div>
        {/* <Breadcrumbs></Breadcrumbs> */}
      </div>
      <DetailMovieContent detailMovie={detailMovie} />
    </div>
  );
};

export default DetailPage;
