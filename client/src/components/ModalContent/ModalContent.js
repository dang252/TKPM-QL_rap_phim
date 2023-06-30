import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

import "./ModalContent.css";

const ModalContent = () => {

  const [dateOption, setDateOption] = useState(0);
  const [provinceOption, setProvinceOption] = useState(0);
  const [cinemas, setCinemas] = useState([]);
  const { ticketInfo, dates, provinces, DayOfWeeks } = useContext(Context);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(1)
  //   GetProvince();
  // }, [dateOption, GetProvince]);

  const handleGetSchedule = (ticketInfo, id_room, id, cinema_name, room_name, tm) => {
    const user = localStorage.getItem("user");
    if (user)
      navigate(
        `/book/seats?id_movie=${ticketInfo}&id_room=${id_room}&id_schedule=${id}&name=${cinema_name}&room=${room_name}&time=${tm}`
      );
    else navigate("/login");
  };

  useEffect(() => {
    const GetCinemasSchedule = async () => {
      try {
        let today = new Date();
        let dayStr = dates[dateOption] != null
          ? (dates[dateOption].getYear() + 1900) + "-" + (("0" + (dates[dateOption].getMonth() + 1)).slice(-2)) + "-" + ("0" + dates[dateOption].getDate()).slice(-2)
          : (today.getYear() + 1900) + "-" + (("0" + (today.getMonth() + 1)).slice(-2)) + "-" + today.getDate()
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/book/schedule`,
          {
            id_movie: ticketInfo,
            date: dayStr,
            province:
              provinces.length > 0
                ? provinces[provinceOption].province
                : "Hồ Chí Minh",
          },
          {
            withCredentials: true,
          }
        );
        let data = [...response.data];
        data.sort((a, b) => {
          if (
            a.id_cinema < b.id_cinema ||
            (a.id_cinema === b.id_cinema && a.id_room < b.id_room)
          )
            return -1;
          if (
            a.id_cinema > b.id_cinema ||
            (a.id_cinema === b.id_cinema && a.id_room > b.id_room)
          )
            return 1;
          return 0;
        });
        // console.log(data)
        // if (data.length !== 0) {
        //   let pre_id_room = 0;
        //   let pre_id_cinema = data[0].id_cinema;
        //   let cur_cinema = {
        //     id_cinema: data[0].id_cinema,
        //     cinema_name: data[0].cinema_name,
        //     rooms: [],
        //   };
        //   let data2 = [];
        //   data.forEach((info) => {
        //     if (info.id_cinema !== pre_id_cinema) {
        //       data2.push({ ...cur_cinema });
        //       cur_cinema.id_cinema = info.id_cinema;
        //       cur_cinema.cinema_name = info.cinema_name;
        //       cur_cinema.rooms = [];
        //       pre_id_room = 0;
        //     }
        //     if (info.id_room !== pre_id_room) {
        //       cur_cinema.rooms.push({
        //         room_name: info.room_name,
        //         time: [...info.time],
        //       });
        //     } else {
        //       let index = cur_cinema.rooms.length;
        //       cur_cinema.rooms[index - 1].time.concat(info.time);
        //     }
        //     pre_id_cinema = info.id_cinema;
        //     pre_id_room = info.id_room;
        //   });
        // setCinemas(data2)
        // }
        setCinemas(data);
      } catch (err) {
        // console.log("err o schedule")
        console.log(err)
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
      }
    };
    GetCinemasSchedule();
  }, [provinceOption, provinces, dates, dateOption, ticketInfo]);

  return (
    <div className="modal-content-container">
      <div className="dates-container">
        {dates !== 0 &&
          dates.map((date, index) => (
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
          ))}
      </div>
      <div className="provinces-container">
        {provinces !== 0 &&
          provinces.map((province, index) => (
            <div
              className={
                "province-container " +
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
      <div className="cinemas-container">
        {cinemas.length !== 0 &&
          cinemas.map((cinema) => {
            return (
              // <div className='cinema' key={cinema.id_cinema}>
              //     <h5 className='cinema-name'>{cinema.cinema_name}</h5>
              //     {cinema.rooms.map((room) => {
              //         return (
              //             <div className='room-container' key={room.room_name}>
              //                 <div className='room-name'>{room.room_name}</div>
              //                 {room.time.map(tm => {
              //                     return(
              //                         <div className='time-container' key={tm}>{tm}</div>
              //                     )
              //                 })}
              //             </div>
              //         )
              //     })}
              // </div>
              <div className="cinema" key={cinema.id}>
                <h5 className="cinema-name">{cinema.cinema_name}</h5>
                <div className="room-container">
                  <div className="room-name">{cinema.room_name}</div>
                  {cinema.time.map((tm) => {
                    return (
                      <div
                        // to={`/book/seats?id_movie=${ticketInfo}&id_room=${cinema.id_room}&id_schedule=${cinema.id}&name=${cinema.cinema_name}&time=${tm}`}
                        className="time-container"
                        key={tm}
                        onClick={(e) => {
                          handleGetSchedule(
                            ticketInfo,
                            cinema.id_room,
                            cinema.id,
                            cinema.cinema_name,
                            cinema.room_name,
                            tm
                          );
                        }}
                      >
                        {tm}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ModalContent;
