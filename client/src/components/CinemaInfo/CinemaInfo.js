import React from 'react'
// import { useState, useContext, useEffect } from 'react'
// import { useNavigate } from "react-router-dom";
// import { Context } from "../../context/UserContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CinemaInfo.css"

const CinemaInfo = (props) => {
    // const { dates, DayOfWeeks } = useContext(Context);
    // const [dateOption, setDateOption] = useState(0);
    const { cinemaInfo } = props;
    var { schedule } = cinemaInfo
    return (
        <div className='cinema-main-info'>
            <div className='cinema-header' />
            <h3 className='cinema-name'> {cinemaInfo.name} </h3>
            <div className='theatre-img-slider'>
                <Swiper
                    modules={[Pagination, Navigation]}
                    loop={true}
                    autoplay={{ delay: 2500 }}
                    // pagination={{ clickable: true }}
                    navigation
                >
                    <SwiperSlide>
                        <img alt="theatre" src="../../assets/img/cinema-1.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img alt="theatre" src="../../assets/img/cinema-2.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img alt="theatre" src="../../assets/img/cinema-3.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img alt="theatre" src="../../assets/img/cinema-4.png" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img alt="theatre" src="../../assets/img/cinema-5.png" />
                    </SwiperSlide>
                    <div className = 'slider-caption'>
                        <div className='left-infomation'>
                            {cinemaInfo.location}<br/>
                            <label>Fax: </label> +84 4 6 275 5240
                            <br/>
                            <label>Hotline: </label> 1900 6017
                        </div>
                        <div className='right-infomation'>
                            <a href='https://www.google.com/maps/?hl=vi'>XEM BẢN ĐỒ</a>
                            <a href='https://www.cgv.vn/default/contacts/'>LIÊN HỆ CGV</a>
                        </div>
                    </div>
                </Swiper>
            </div>
            <div className='movies-list'>
                {schedule.length !== 0 &&
                    schedule.map((movie, index) => {
                        if (index > 0 && movie.movie_title !== schedule[index-1].movie_title) {
                            return(
                                <div className ='movie-container' key={movie.movie_title}>
                                    <h4>{movie.movie_title}</h4>
                                    <img src={movie.movie_poster} alt={movie.movie_title}/>
                                </div>
                            )
                        }
                        else return null
                    })
                }
            </div>
        </div>
    )
}

export default CinemaInfo