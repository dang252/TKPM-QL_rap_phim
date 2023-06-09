import React, { useState, useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
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
import { toast } from "react-toastify";

const SeatsContent = (props) => {
  const {
    seatsList,
    paramsIdSchedule,
    paramsIdRoom,
    paramsCinemaName,
    paramsRoomName,
    detailMovie,
    paramsTime,
  } = props;

  const {
    handleAddSeatsPick,
    seatsPickList,
    checkIsStaff,
    handleConfirmBlockSeats,
  } = useContext(Context);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (seatsList.length !== 0) {
    // console.log(seatsList);
  }

  useEffect(() => {
    // console.log(seatsPickList);
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

  const handleBlockSeats = () => {
    if (seatsPickList.length === 0) toast.error("Chọn ghế để khóa");
    else handleShow();
  };

  return (
    <div className="seats-container">
      <p className="seats-title">BOOKING ONLINE</p>
      <p className="seats-subtitle">
        {/* {paramsCinemaName} | Cinemas {paramsIdRoom} */}
        {paramsCinemaName} | {paramsRoomName}
      </p>
      <p className="seats-subtitle-2">Người / Ghế</p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn khóa ghế ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleConfirmBlockSeats(paramsIdSchedule);
            }}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      {checkIsStaff() && (
        <div
          className="text-end"
          style={{ padding: "0 50px", margin: "30px 0" }}
        >
          <Button
            variant="danger"
            onClick={(e) => {
              handleBlockSeats();
            }}
          >
            Khóa ghế
          </Button>
        </div>
      )}
      <div className="seats-box-wrapper">
        <div className="item area-1 none">1</div>
        <div className="item area-2">
          {seatsList.length !== 0 &&
            area2.map((seat) => {
              const targetSeat = getSeatId(seat)[0];
              return (
                <div
                  key={seat}
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
                  className={`${targetSeat.status === 0 && isExistPick(targetSeat?.id_seat)
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
      <div
        className="seats-note"
        style={{
          padding: "30px 80px",
          margin: "30px 0",
          // backgroundColor: "red",
        }}
      >
        <p
          style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}
        >
          Chú thích đặt ghế
        </p>
        <div style={{ display: "flex" }}>
          <div
            style={{ width: "30px", height: "30px", border: "1px solid gray" }}
          ></div>
          <p style={{ marginLeft: "30px" }}>Ghế có thể đặt</p>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid gray",
              backgroundColor: "#35b51d",
            }}
          ></div>
          <p style={{ marginLeft: "30px" }}>Ghế đã chọn</p>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid gray",
              backgroundColor: "gray",
            }}
          ></div>
          <p style={{ marginLeft: "30px" }}>Ghế đã được đặt</p>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid gray",
              backgroundColor: "#000",
            }}
          ></div>
          <p style={{ marginLeft: "30px" }}>Ghế không được đặt</p>
        </div>
      </div>
      <BookingFooter
        seatsList={seatsList}
        seatsPickList={seatsPickList}
        paramsTime={paramsTime}
        paramsCinemaName={paramsCinemaName}
        paramsRoomName={paramsRoomName}
        paramsIdSchedule={paramsIdSchedule}
        paramsIdRoom={paramsIdRoom}
        detailMovie={detailMovie}
        prevUrl="/"
        nextUrl={`/book/foods?id_movie=${detailMovie.id}&id_room=${paramsIdRoom}&id_schedule=${paramsIdSchedule}&name=${paramsCinemaName}&room=${paramsRoomName}&time=${paramsTime}`}
      />
    </div>
  );
};

export default SeatsContent;
