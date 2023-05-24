import React from "react";
import "./HomePageMovieCard.css";

const HomePageMovieCard = (props) => {
  const { movie } = props;
  //   console.log(movie);

  return (
    <div className="card">
      {movie && (
        <>
          <img src={movie.url_poster} alt={movie.title} />
          <div className="info">
            <p>{movie.title}</p>
            <button className="view-detail-btn">XEM CHI TIẾT</button>
            <button className="buy-ticket-btn">MUA VÉ</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePageMovieCard;
