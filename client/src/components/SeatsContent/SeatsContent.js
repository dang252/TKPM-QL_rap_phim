import React, { useContext, useEffect } from "react";
import "./SeatsContent.css";

import BookingFooter from "../BookingFooter/BookingFooter";

import { Context } from "../../context/UserContext";

import {
  area2,
  area6,
  area7,
  area11,
  area12,
  area14,
  area15,
  area16,
  area17,
  area18,
  area19,
} from "../../constrants/seats";

const SeatsContent = (props) => {
  const {
    seatsList,
    paramsIdSchedule,
    paramsCinemaName,
    detailMovie,
    paramsTime,
  } = props;

  const { handleAddSeatsPick, seatsPickList } = useContext(Context);

  if (seatsList.length !== 0) {
    // console.log(seatsList);
  }

  useEffect(() => {
    console.log(seatsPickList);
  }, [seatsPickList]);

  const getSeatId = (seatName) => {
    return seatsList.filter((seat) => {
      return seat.name === seatName;
    });
  };

  const isExistPick = (id) => {
    const checkExist = seatsPickList.filter((seat) => {
      return seat === id;
    });

    if (checkExist.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="seats-container">
      <p className="seats-title">BOOKING ONLINE</p>
      <p className="seats-subtitle">
        {paramsCinemaName} | Cinemas {paramsIdSchedule}
      </p>
      <p className="seats-subtitle-2">Người / Ghế</p>
      <div className="seats-box-wrapper">
        <div className="item area-1 none">1</div>
        <div className="item area-2">
          {seatsList.length !== 0 &&
            area2.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-3 none">3</div>
        <div className="item area-4 none">4</div>
        <div className="item area-5 none">5</div>
        <div className="item area-6">
          {seatsList.length !== 0 &&
            area6.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-7">
          {seatsList.length !== 0 &&
            area7.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-8 none">8</div>
        <div className="item area-9 none">9</div>
        <div className="item area-10 none">10</div>
        <div className="item area-11">
          {seatsList.length !== 0 &&
            area11.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-12">
          {seatsList.length !== 0 &&
            area12.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-13 none">13</div>
        <div className="item area-14">
          {seatsList.length !== 0 &&
            area14.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-15">
          {seatsList.length !== 0 &&
            area15.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-16">
          {seatsList.length !== 0 &&
            area16.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-17">
          {seatsList.length !== 0 &&
            area17.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-18">
          {seatsList.length !== 0 &&
            area18.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-19">
          {seatsList.length !== 0 &&
            area19.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${
                    targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
                      ? "choose seat"
                      : "seat"
                  }
                  ${targetSeat.status === 1 ? "picked" : ""}
                  ${targetSeat.status === -1 ? "ban" : ""}`}
                  onClick={(e) => {
                    handleAddSeatsPick(targetSeat);
                  }}
                >
                  {seat}
                </div>
              );
            })}
        </div>
        <div className="item area-20 none">20</div>
      </div>
      <BookingFooter
        seatsList={seatsList}
        seatsPickList={seatsPickList}
        paramsTime={paramsTime}
        paramsCinemaName={paramsCinemaName}
        paramsIdSchedule={paramsIdSchedule}
        detailMovie={detailMovie}
        prevUrl="/"
        nextUrl="/book/food"
      />
    </div>
  );
};

export default SeatsContent;
