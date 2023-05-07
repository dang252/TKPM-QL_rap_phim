import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "./EventSlidebar.css";

const EventSlidebar = () => {
  const [event, setEvent] = useState("event");
  const [active, setActive] = useState("activeLeft");

  const handleChangeEvent = (title) => {
    title === "event" && setEvent("member");
    title === "event" && setActive("activeRight");
    title === "member" && setEvent("event");
    title === "member" && setActive("activeLeft");
  };

  return (
    <div className="event-slidebar-container">
      <div className="ribon">
        <div className="ribon-left">
          <img alt="rb-left" src="../../assets/event/ribon_left_menu.gif" />
        </div>
        <div className="ribon-middle">
          <p
            className={`${active === "activeLeft" ? "active-left" : null}`}
            onClick={(e) => {
              handleChangeEvent("member");
            }}
          >
            Thành viên CGV
          </p>
          <p>|</p>
          <p
            className={`${active === "activeRight" ? "active-right" : null}`}
            onClick={(e) => {
              handleChangeEvent("event");
            }}
          >
            Tin Mới & Ưu Đãi
          </p>
        </div>
        <div className="ribon-right">
          <img alt="rb-right" src="../../assets/event/ribon_right.gif" />
        </div>
      </div>
      <div className="event-banner">
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
          {event === "member" && (
            <>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/e1.png" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/e2.png" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/e3.png" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/e4.png" />
                </div>
              </SwiperSlide>
            </>
          )}
          {event === "event" && (
            <>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/m1.png" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/m2.png" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/m3.png" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/m4.png" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="movie-card">
                  <img alt="movie1" src="../../../assets/event/m5.png" />
                </div>
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default EventSlidebar;
