import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "./MovieSlidebar.css";

const MovieSlidebar = () => {
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
        <SwiperSlide>
          <div className="movie-card">
            <img alt="movie1" src="../../assets/movie/1.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img alt="movie1" src="../../assets/movie/2.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img alt="movie1" src="../../assets/movie/3.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img alt="movie1" src="../../assets/movie/4.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img alt="movie1" src="../../assets/movie/5.png" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="movie-card">
            <img alt="movie1" src="../../assets/movie/6.png" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MovieSlidebar;
