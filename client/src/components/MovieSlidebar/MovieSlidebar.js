import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import HomePageMovieCard from "../HomePageMovieCard/HomePageMovieCard";

import "./MovieSlidebar.css";

const MovieSlidebar = (props) => {
  const { movieSelection } = props;

  useEffect(() => {
    if (movieSelection.length !== 0) {
      // console.log(movieSelection);
    }
  }, [movieSelection]);

  return (
    <div className="movie-slidebar-container">
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        pagination={{
          //   type: "progressbar",
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1070: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {movieSelection.length !== 0 &&
          movieSelection.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <HomePageMovieCard movie={movie} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default MovieSlidebar;
