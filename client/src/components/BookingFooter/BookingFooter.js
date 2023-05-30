import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "./BookingFooter.css";

const BookingFooter = (props) => {
  const {
    seatsList,
    seatsPickList,
    paramsTime,
    paramsCinemaName,
    paramsIdRoom,
    detailMovie,
    prevUrl,
    nextUrl,
  } = props;

  const navigate = useNavigate();

  if (Object.keys(detailMovie).length !== 0) {
    // console.log(paramsTime, paramsCinemaName, detailMovie);
  }

  const getSeatName = (seatId) => {
    return seatsList.filter((seat) => {
      return seat.id_seat === seatId;
    });
  };

  const handlePrevPage = () => {
    navigate(prevUrl);
  };

  const handleNextPage = () => {
    if (seatsPickList.length === 0) {
      window.scrollTo(0, 0);
      toast.error("Vui lòng chọn ghế");
    } else if (seatsPickList.length !== 0) {
      navigate(nextUrl);
    }
  };

  return (
    <div className="booking-footer-container">
      {Object.keys(detailMovie).length !== 0 && (
        <>
          <div className="booking-footer-left">
            <div
              onClick={(e) => {
                handlePrevPage();
              }}
            >
              <div className="prev-btn">
                <FontAwesomeIcon icon={faArrowLeft} />
                <p>Previous</p>
              </div>
            </div>
          </div>
          <div className="booking-footer-main">
            <div className="booking-poster">
              <img src={detailMovie.url_poster} alt={detailMovie.tile} />
            </div>
            <div className="booking-content">
              <p>{detailMovie.title}</p>
              <p>Rạp: {paramsCinemaName}</p>
              <p>Phòng: Cinemas {paramsIdRoom}</p>
              <p>Xuất chiếu: {paramsTime}</p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <p style={{ marginRight: "5px" }}>Ghế đã đặt:</p>
                {seatsPickList.length !== 0 &&
                  seatsPickList.map((seat) => {
                    const targetSeat = getSeatName(seat)[0];
                    return (
                      <p key={targetSeat?.name} style={{ marginRight: "5px" }}>
                        {targetSeat?.name},
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="booking-footer-right">
            <div
              onClick={(e) => {
                handleNextPage();
              }}
            >
              <div className="next-btn">
                <FontAwesomeIcon icon={faArrowRight} />
                <p>Next</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingFooter;
