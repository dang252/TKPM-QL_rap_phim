import React, { useEffect } from "react";

import CategorySlide from "../../components/CategorySlide/CategorySlide";
import Slidebar from "../../components/Slidebar/Slidebar";
import HomeTitle from "../../components/HomeTitle/HomeTitle";
import HomeTitle2 from "../../components/HomeTitle2/HomeTitle2";
import MovieSlidebar from "../../components/MovieSlidebar/MovieSlidebar";
import EventSlidebar from "../../components/EventSlidebar/EventSlidebar";

const HomePage = () => {
  useEffect(() => {
    document.title = "CGV Cinemas Fake | Trang chủ";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <CategorySlide />
      <Slidebar />
      <HomeTitle imgUrl="../../assets/img/h3_movie_selection.gif" />
      <MovieSlidebar />
      <HomeTitle2 imgUrl="../../assets/img/h3_event.gif" />
      <EventSlidebar />
    </div>
  );
};

export default HomePage;
