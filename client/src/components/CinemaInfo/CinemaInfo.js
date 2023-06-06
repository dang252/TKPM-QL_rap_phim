import React from 'react'
import { useState, useContext, useEffect } from 'react'
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../../context/UserContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, breakpoints } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CinemaInfo.css"

const CinemaInfo = (props) => {
    const { dates, DayOfWeeks, handleGetSchedule } = useContext(Context);
    // const [dateOption, setDateOption] = useState(0);
    const { cinemaInfo, dateOption, setDateOption } = props;
    // console.log(cinemaInfo)
    var { movies } = cinemaInfo
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
                    <div className='slider-caption'>
                        <div className='left-infomation'>
                            {cinemaInfo.location}<br />
                            <label>Fax: </label> +84 4 6 275 5240
                            <br />
                            <label>Hotline: </label> 1900 6017
                        </div>
                        <div className='right-infomation'>
                            <a href='https://www.google.com/maps/?hl=vi'>XEM BẢN ĐỒ</a>
                            <a href='https://www.cgv.vn/default/contacts/'>LIÊN HỆ CGV</a>
                        </div>
                    </div>
                </Swiper>
            </div>

            <div className='date-slider'>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    breakpoints={{
                        200: {
                            slidesPerView: 3,
                        },
                        400: {
                              slidesPerView: 5,
                            },
                        500: {
                            slidesPerView: 6,
                        },
                        600: {
                          slidesPerView: 7,
                        },
                        700: {
                              slidesPerView: 9,
                            },
                        800: {
                            slidesPerView: 10,
                        },
                        900: {
                              slidesPerView: 11,
                            },
                        1000: {
                            slidesPerView: 12,
                        }
                      }}
                    
                >
                    {dates !== 0 &&
                        dates.map((date, index) => (
                            <SwiperSlide key={date}>
                            <div
                                className={
                                    "date-container " + (index === dateOption ? "selected" : "")
                                }
                                key={index}
                                onClick={() => {
                                    setDateOption(index);
                                }}
                            >
                                <div>{("0" + (date.getMonth() + 1)).slice(-2)}</div>
                                <div>{DayOfWeeks[date.getDay()]}</div>
                                <span>{("0" + date.getDate()).slice(-2)}</span>
                            </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

            <div className='movies-list'>
                {movies.length !== 0 &&
                    movies.map((movie) => {
                        return (
                            <div className='movie-container' key={movie.title_movie}>
                                <Link to={`/movies/detail?id=${movie.id_movie}`} className='movie-title'>{movie.title_movie}</Link>
                                <div className='movie-detail'>
                                    <img src={movie.movie_poster} alt={movie.title_movie} />
                                    <div className='schedule'>
                                        {movie.schedule.map((detail) => {
                                            return (
                                                <div className='times' key={detail.room_name}>
                                                    <h6>{detail.room_name}</h6>
                                                    {detail.time.map((tm) => {
                                                        return (
                                                            <div
                                                                className="time-container"
                                                                key={tm}
                                                                onClick={(e) => {
                                                                    handleGetSchedule(
                                                                        movie.id_movie,
                                                                        detail.id_schedule,
                                                                        detail.id_schedule,
                                                                        detail.room_name,
                                                                        tm
                                                                    );
                                                                }}
                                                            >
                                                                {tm}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })

                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CinemaInfo