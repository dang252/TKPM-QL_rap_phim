import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./MoviesList.css";
import MovieCard from "../MovieCard/MovieCard";

const status = {
  "currently-showing": {
    PathName: "Phim Đang Chiếu",
    OtherPath: "/movies/coming-soon",
    OtherPathName: "Phim Sắp Chiếu",
    API: "CurrentMovies",
    DisplayTop3: true,
  },
  "coming-soon": {
    PathName: "Phim Sắp Chiếu",
    OtherPath: "/movies/currently-showing",
    OtherPathName: "Phim Đang Chiếu",
    API: "InComingMovies",
    DisplayTop3: false,
  },
};
const MoviesList = (props) => {
  const [movies, setMovies] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    const GetMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/movies/${status[props.path].API}`,
          {},
          {
            withCredentials: true,
          }
        );
        setMovies(response.data);
      } catch (err) {
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
        navigate("/");
      }
    };
    GetMovies();
  }, [navigate, props.path]);

  return (
    <>
      <div className="movies-container">
        <div className="movies-header">
          <h1>{status[props.path].PathName}</h1>
          <Link to={status[props.path].OtherPath}>
            <h3>{status[props.path].OtherPathName}</h3>
          </Link>
        </div>
        <div className="movies">
          {movies &&
            movies.map((movie, index) => {
              // console.log(index)
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  index={index + 1}
                  DisplayTop3={status[props.path].DisplayTop3}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MoviesList;
