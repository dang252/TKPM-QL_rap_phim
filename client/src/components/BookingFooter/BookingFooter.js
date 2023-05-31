import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import "./BookingFooter.css";

import { Context } from "../../context/UserContext";

const BookingFooter = (props) => {
  const {
    seatsList,
    seatsPickList,
    paramsTime,
    paramsCinemaName,
    paramsIdSchedule,
    paramsIdRoom,
    detailMovie,
    prevUrl,
    nextUrl,
    isAgreeRule,
  } = props;

  const { handleBookTicket } = useContext(Context);

  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);

  const handleClosePayment = () => setShowPayment(false);
  const handleShowPayment = () => setShowPayment(true);

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

  const handleConfirmPayment = () => {
    handleBookTicket(paramsIdSchedule, paramsTime);
    navigate(nextUrl);
  };

  const handleNextPage = () => {
    if (seatsPickList.length === 0) {
      window.scrollTo(0, 0);
      toast.error("Vui lòng chọn ghế");
    } else if (isAgreeRule !== undefined && !isAgreeRule) {
      window.scrollTo(0, 0);
      toast.error("Vui lòng chấp nhận điều khoản");
    } else if (isAgreeRule !== undefined && isAgreeRule) {
      window.scrollTo(0, 0);
      handleShowPayment();
    } else if (isAgreeRule === undefined && seatsPickList.length !== 0) {
      navigate(nextUrl);
    }
  };

  return (
    <div className="booking-footer-container">
      <Modal show={showPayment} onHide={handleClosePayment}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Xác nhận thanh toán ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePayment}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleConfirmPayment}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
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
