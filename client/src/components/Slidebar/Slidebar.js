import React from "react";
import "./Slidebar.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slidebar = () => {
  return (
    <div className="slidebar-container">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img alt="banner1" src="../../assets/banner/1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="banner2" src="../../assets/banner/2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="banner3" src="../../assets/banner/3.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="banner4" src="../../assets/banner/4.png" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slidebar;
