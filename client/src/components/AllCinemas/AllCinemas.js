import React, { useEffect, useState, useContext } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../../context/UserContext";

import "./AllCinemas.css"
import CinemaInfo from '../CinemaInfo/CinemaInfo';


const AllCinemas = () => {
  const { provinces, dates } = useContext(Context);
  const [cinemas, setCinemas] = useState([])
  const [cinemaOption, setCinemaOption] = useState(-1)
  const [cinemaInfo, setCinemaInfo] = useState()
  const [provinceOption, setProvinceOption] = useState(-1);
  const [dateOption, setDateOption] = useState(0);

  useEffect(() => {
    if (provinceOption === -1) return
    const GetCinemas = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}//book/provinces`,
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
    // console.log(1)
    // const GetCinemaInfo = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:5000/book/cinema?id_cinema=${cinemas[cinemaOption].id}`,
    //       {},
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     var data = response.data;
    //     setCinemaInfo(data)
    //   }
    //   catch (err) {
    //     toast.error(
    //       "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
    //     );
    //   }
    // }
    // GetCinemaInfo()
    console.log(1)
    setDateOption(0)
  }, [cinemaOption, cinemas])

  useEffect(() => {
    console.log(2)
    if (cinemaOption === -1) return
    const GetCinemaInfoWithDate = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}//book/cinema?id_cinema=${cinemas[cinemaOption].id}&date=${(dates[dateOption].getYear() + 1900) + "-" + (("0" + (dates[dateOption].getMonth() + 1)).slice(-2)) + "-" + ("0" + dates[dateOption].getDate()).slice(-2)}`,
          {},
          {
            withCredentials: true,
          }
        );
        var data = response.data;
        console.log(data)
        setCinemaInfo(data)
      }
      catch (err) {
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
      }
    }
    GetCinemaInfoWithDate()

  }, [dates, dateOption, cinemaOption, cinemas])

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
        <CinemaInfo cinemaInfo={cinemaInfo} dateOption={dateOption} setDateOption={setDateOption} />
      }
    </div>
  )
}

export default AllCinemas