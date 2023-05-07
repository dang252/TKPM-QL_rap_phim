import React from "react";

import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Navbar from "../../components/Navbar/Navbar";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import CategorySlide from "../../components/CategorySlide/CategorySlide";
import Slidebar from "../../components/Slidebar/Slidebar";
import HomeTitle from "../../components/HomeTitle/HomeTitle";
import HomeTitle2 from "../../components/HomeTitle2/HomeTitle2";
import MovieSlidebar from "../../components/MovieSlidebar/MovieSlidebar";
import EventSlidebar from "../../components/EventSlidebar/EventSlidebar";
import MyFooter from "../../components/MyFooter/MyFooter";

const HomePage = () => {
  return (
    <div>
      <UserNavbar />
      <Navbar />
      <MobileNavbar />
      <CategorySlide />
      <Slidebar />
      <HomeTitle imgUrl="../../assets/img/h3_movie_selection.gif" />
      <MovieSlidebar />
      <HomeTitle2 imgUrl="../../assets/img/h3_event.gif" />
      <EventSlidebar />
      <MyFooter />
    </div>
  );
};

export default HomePage;
