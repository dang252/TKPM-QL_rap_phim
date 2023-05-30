import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import "./FoodContent.css";

import { Context } from "../../context/UserContext";

import FoodCount from "../FoodCount/FoodCount";
import BookingFooter from "../BookingFooter/BookingFooter";

const FoodContent = (props) => {
  const { foodList, paramsIdSchedule, paramsCinemaName } = props;

  const { seatsList, seatsPickList, detailMovie } = useContext(Context);

  const [searchParams] = useSearchParams();
  const paramsTime = searchParams.get("time");
  const paramsIdMovie = searchParams.get("id_movie");
  const paramsIdRoom = searchParams.get("id_room");

  return (
    <div className="food-content-container">
      <p className="food-content-title">BOOKING ONLINE</p>
      <p className="food-content-subtitle">
        {paramsCinemaName} | Cinemas {paramsIdSchedule}
      </p>
      <p className="food-content-subtitle-2">Bắp Nước</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          margin: "50px 0",
        }}
      >
        {foodList.length !== 0 &&
          foodList.map((food) => {
            return (
              <div key={food.id} className="food-card">
                <div className="food-poster">
                  <img
                    src={`../../assets/food/${food.id}.png`}
                    alt={food.name}
                  />
                </div>
                <div className="food-des" style={{ marginLeft: "20px" }}>
                  <p style={{ fontWeight: "bold" }}>
                    {food.id}: {food.name}
                  </p>
                  <p>{food.description}</p>
                  <div style={{ display: "flex" }}>
                    <p>Giá:</p>
                    <p style={{ marginLeft: "10px", fontWeight: "bold" }}>
                      {food.price}đ
                    </p>
                  </div>
                  <FoodCount food={food} />
                </div>
              </div>
            );
          })}
      </div>
      <BookingFooter
        seatsList={seatsList}
        seatsPickList={seatsPickList}
        paramsTime={paramsTime}
        paramsCinemaName={paramsCinemaName}
        paramsIdSchedule={paramsIdSchedule}
        detailMovie={detailMovie}
        prevUrl={`/book/seats?id_movie=${paramsIdMovie}&id_room=${paramsIdRoom}&id_schedule=${paramsIdSchedule}&name=${paramsCinemaName}&time=${paramsTime}`}
        nextUrl={`/book/payment?id_movie=${detailMovie.id}&id_room=${paramsIdRoom}&id_schedule=${paramsIdSchedule}&name=${paramsCinemaName}&time=${paramsTime}`}
      />
    </div>
  );
};

export default FoodContent;
