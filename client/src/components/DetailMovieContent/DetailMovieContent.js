import React, { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import "./DetailMovieContent.css";

import { Context } from "../../context/UserContext";

const DetailMovieContent = (props) => {
  const { getDate, durationTransform, handleGetTicketInfo, openModal } =
    useContext(Context);
  const { detailMovie } = props;

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const imageZoomStyles = {
    width: 200,
    zoomWidth: 200,
    img: detailMovie ? detailMovie.url_poster : "",
  };

  const getRated = (age) => {
    if (age === 0) {
      return "PHIM DÀNH CHO MỌI LỨA TUỔI";
    }
    if (age === 13) {
      return "T13 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 13 TUỔI TRỞ LÊN (13+)";
    }
    if (age === 16) {
      return "T16 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 16 TUỔI TRỞ LÊN (16+)";
    }
    if (age === 18) {
      return "T18 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 18 TUỔI TRỞ LÊN (18+)";
    }
  };

  useEffect(() => {
    if (Object.keys(detailMovie).length !== 0) {
      document.title = `${detailMovie.title}`;
      window.scrollTo(0, 0);
      console.log(detailMovie);
    }
  }, [detailMovie]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="detail-movie-container">
      <p className="detail-movie-title">Nội Dung Phim</p>
      <p className="detail-movie-divider"></p>
      {Object.keys(detailMovie).length !== 0 && (
        <>
          <div className="detail-movie-content">
            <div className="content-left">
              <div className="detail-image">
                {windowSize[0] > 800 ? (
                  <ReactImageZoom {...imageZoomStyles} />
                ) : (
                  <img src={detailMovie.url_poster} alt="detail title" />
                )}
              </div>
            </div>
            <div className="content-right">
              <p className="detail-title">{detailMovie.title}</p>
              <p className="detail-right-divider"></p>
              <div className="detail-right-content">
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Đạo diễn:
                  </p>
                  <p>{detailMovie.director}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Diễn viên:
                  </p>
                  <p>{detailMovie.actors}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Thể loại:
                  </p>
                  <p>{detailMovie.genres}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Khởi chiếu:
                  </p>
                  <p>{getDate(detailMovie.release_date)}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Thời lượng:
                  </p>
                  <p>{durationTransform(detailMovie.duration)} phút</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: "20px", fontWeight: "bold" }}>
                    Rated:
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    {getRated(detailMovie.age)}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  {detailMovie.age === 0 && (
                    <div
                      style={{
                        width: "45px",
                        height: "30px",
                        backgroundImage: `url("../../assets/img/rating-sprite.png")`,
                        backgroundPosition: "-189px 0px",
                      }}
                    />
                  )}
                  {detailMovie.age === 13 && (
                    <div
                      style={{
                        width: "45px",
                        height: "30px",
                        backgroundImage: `url("../../assets/img/rating-sprite.png")`,
                        backgroundPosition: "-235px 0px",
                      }}
                    />
                  )}
                  {detailMovie.age === 16 && (
                    <div
                      style={{
                        width: "45px",
                        height: "30px",
                        backgroundImage: `url("../../assets/img/rating-sprite.png")`,
                        backgroundPosition: "-283px 0px",
                      }}
                    />
                  )}
                  {detailMovie.age === 18 && (
                    <div
                      style={{
                        width: "45px",
                        height: "30px",
                        backgroundImage: `url("../../assets/img/rating-sprite.png")`,
                        backgroundPosition: "-330px 0px",
                      }}
                    />
                  )}
                  <div style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        fontSize: "18px",
                        width: "150px",
                        height: "50px",
                        color: "#fff",
                        backgroundColor: "#e71a0f",
                        marginTop: "50px",
                        marginLeft: "50px",
                        border: 0,
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={(e) => {
                        handleGetTicketInfo(detailMovie.id);
                        openModal();
                      }}
                    >
                      <p style={{ lineHeight: "50px" }}>
                        <FontAwesomeIcon icon={faTicket} />
                      </p>
                      <p style={{ lineHeight: "50px", marginLeft: "15px" }}>
                        MUA VÉ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%", marginTop: "50px", textAlign: "justify" }}
          >
            {detailMovie.overview}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailMovieContent;
