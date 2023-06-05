import React, { useEffect, useState, useContext } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../../context/UserContext";

import "./AllCinemas.css"
import CinemaInfo from '../CinemaInfo/CinemaInfo';

const AllCinemas = () => {
  const { provinces } = useContext(Context);
  const [cinemas, setCinemas] = useState([])
  const [cinemaOption, setCinemaOption] = useState(-1)
  const [cinemaInfo, setCinemaInfo] = useState()
  const [provinceOption, setProvinceOption] = useState(-1);


  useEffect(() => {
    if (provinceOption === -1) return
    const GetCinemas = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/book/provinces`,
          { ...provinces[provinceOption] },
          {
            withCredentials: true,
          }
        );
        setCinemaOption(-1)
        setCinemas(response.data)
      }
      catch (err) {
        // console.log(err)
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
      }
    }
    GetCinemas();
  }, [provinceOption, provinces])

  useEffect(() => {
    if (cinemaOption === -1) return
    const GetCinemaInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/book/cinema?id_cinema=${cinemas[cinemaOption].id}`,
          {},
          {
            withCredentials: true,
          }
        );
        var data = response.data;
        console.log(response.data)
        data.schedule.sort((a, b) => {
          if (
              a.movie_title < b.movie_title ||
              (a.movie_title === b.movie_title && a.date < b.date)
            )
              return -1;
            if (
              a.movie_title > b.movie_title ||
              (a.movie_title === b.movie_title && a.date > b.date)
            )
              return 1;
            return 0;
      })
        setCinemaInfo(data)
      }
      catch (err) {
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
      }
    }
    GetCinemaInfo()
  }, [cinemaOption, cinemas])
  return (
    <div className='all-cinemas'>
      <div className='cinemas-container'>
        <div className='cinemas-container-top' />
        <div className='cinemas-container-center'>
          <h1 className='cinemas-header'>CGV CINEMAS</h1>
          <div className='provinces-container'>
            {provinces.length !== 0 && provinces.map((province, index) => (
              <div
                className={
                  "province " +
                  (index === provinceOption ? "selected" : "")
                }
                key={index}
                onClick={() => {
                  setProvinceOption(index);
                }}
              >
                {province.province}
              </div>
            ))}
          </div>
          <div className='cinemas-list'>
            {cinemas.length !== 0 && cinemas.map((cinema, index) => (
              <div
                className={
                  "cinema " +
                  (index === cinemaOption ? "selected" : "")
                }
                key={index}
                onClick={() => {
                  setCinemaOption(index);
                }}
              >
                {cinema.name}
              </div>
            ))}
          </div>
        </div>
        <div className='cinemas-container-bottom' />
      </div>
      {cinemaOption !== -1 && cinemaInfo &&
        <CinemaInfo cinemaInfo = {cinemaInfo}/>
      }
    </div>
  )
}

export default AllCinemas