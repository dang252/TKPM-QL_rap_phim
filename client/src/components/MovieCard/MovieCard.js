import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/UserContext";
import "./MovieCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const MovieCard = (props) => {
  const { getDate, handleGetTicketInfo, openModal } = useContext(Context);
  return (
    <div className="movie-card">
      {props.DisplayTop3 && props.index <= 3 && (
        <div className={`ribbon ribbon${props.index}`}></div>
      )}
      {/* <image className='movie-img' scr={props.movie.url_poster} alt={props.movie.title}></image> */}
      <Link className="movie-img" to={`/movies/detail?id=${props.movie.id}`}>
        <img
          // className="movie-img"
          src={props.movie.url_poster}
          alt={props.movie.title}
        />
      </Link>
      <h5 className="movie-title">{props.movie.title}</h5>
      <p className="movie-discription">
        Khởi chiếu: {getDate(props.movie.release_date)}
      </p>
      <div
        className="booking-button"
        onClick={(e) => {
          handleGetTicketInfo(props.movie.id);
          openModal();
        }}
      >
        <div>
          <FontAwesomeIcon icon={faPhone} />
          <span>MUA VÉ</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
