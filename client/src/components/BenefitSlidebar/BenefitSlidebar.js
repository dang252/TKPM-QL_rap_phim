import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BenefitSlidebar.css";
const BenefitSlidebar = () => {
  return (
    <div className="BenefitSlidebar-container">
      <Swiper
        modules={[Pagination, Navigation]}
        loop={true}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
        navigation
      >
        <SwiperSlide>
          <div>
            <img alt="benefit1" src="../../assets/benefit/b1.jpg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img alt="benefit2" src="../../assets/benefit/b2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="benefit3" src="../../assets/benefit/b3.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BenefitSlidebar;
