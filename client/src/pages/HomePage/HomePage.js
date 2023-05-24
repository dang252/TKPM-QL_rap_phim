import React, { useEffect, useContext, useState } from "react";

import CategorySlide from "../../components/CategorySlide/CategorySlide";
import Slidebar from "../../components/Slidebar/Slidebar";
import HomeTitle from "../../components/HomeTitle/HomeTitle";
import HomeTitle2 from "../../components/HomeTitle2/HomeTitle2";
import MovieSlidebar from "../../components/MovieSlidebar/MovieSlidebar";
import EventSlidebar from "../../components/EventSlidebar/EventSlidebar";

import { Context } from "../../context/UserContext";

const HomePage = () => {
  const { getMoviesByCategory, hpMovieList, randomArray } = useContext(Context);
  const [movieSelection, setMovieSelection] = useState("");

  useEffect(() => {
    document.title = "CGV Cinemas Fake | Trang chủ";
    window.scrollTo(0, 0);
  }, []);

  // Handle sort movie selection

  const handleSortHompageMovie = () => {
    if (hpMovieList.length !== 0) {
      const temp = randomArray(7, hpMovieList.length - 1);

      const tempSort = hpMovieList.filter((movie, index) => {
        return temp.includes(index) && movie;
      });
      setMovieSelection(tempSort);
    }
  };

  // Get current movies list
  useEffect(() => {
    getMoviesByCategory("currentMovies");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSortHompageMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hpMovieList]);

  return (
    <div>
      <CategorySlide />
      <Slidebar />
      <HomeTitle imgUrl="../../assets/img/h3_movie_selection.gif" />
      <MovieSlidebar movieSelection={movieSelection} />
      <HomeTitle2 imgUrl="../../assets/img/h3_event.gif" />
      <EventSlidebar />
    </div>
  );
};

export default HomePage;
