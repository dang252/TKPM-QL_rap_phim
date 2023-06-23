import React, { useEffect, useContext, useState } from "react";
import { Pagination, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ProfileBookingHistory.css";

import { Context } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
var ticketInfo = {};

const ProfileBookingHistory = () => {
  const {
    getBookingHistory,
    bookingHistoryList,
    getDate,
    handleDeleteBookingHistory,
  } = useContext(Context);
  console.log(bookingHistoryList)
  const [active, setActive] = useState(1);
  const [show, setShow] = useState(false);
  const [bookingHistoryPerPageList, setBookingHistoryListPerPageList] =
    useState([]);
  let items = [];

  const handleClose = () => setShow(false);
  const handleShow = (ticket) => {
    ticketInfo = ticket
    setShow(true);
  }

  if (bookingHistoryList.length !== 0) {
    for (
      let number = 1;
      number <= Math.ceil(bookingHistoryList.length / 2);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={(e) => {
            handleHistoryPaging(number);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  const handleHistoryPaging = (number) => {
    if (bookingHistoryList.length !== 0) {
      const begin = (number - 1) * 2;
      const end = (number - 1) * 2 + 2;
      const listPerPage = bookingHistoryList.slice(begin, end);
      setBookingHistoryListPerPageList(listPerPage);
      setActive(number);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    getBookingHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleHistoryPaging(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingHistoryList]);

  const handleConfirmDeleteBookingHistory = (ticket) => {
    // const checkDelete = handleDeleteBookingHistory(ticket?.id_book);
    // if (checkDelete) {
    //   toast.success("Xóa lịch sử thành công");
    //   handleClose();
    // } else toast.error("Xóa lịch sử thất bại");
    handleDeleteBookingHistory(ticket?.id_book).then((checkDelete) => {
      // console.log(checkDelete)
      if (checkDelete === 200) {
        toast.success("Xóa lịch sử thành công");
        getBookingHistory();
      } else if (checkDelete === 409) {
        toast.error("Xóa lịch sử thất bại: bạn không thể xóa lịch sử của xuất phim chưa chiếu!");
      } else if (checkDelete === 500) {
        toast.error("Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!");
      }
    })
  };

  return (
    <div className="profile-booking-history-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa lịch sử đặt vé ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleConfirmDeleteBookingHistory(ticketInfo);
              handleClose()
            }}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      <h4 className="profile-booking-history-title">LỊCH SỬ ĐẶT VÉ</h4>
      <p className="profile-booking-history-subtitle">
        Tra cứu & quản lý lịch sử đặt vé
      </p>
      <div className="profile-booking-history-content">
        {bookingHistoryPerPageList.length !== 0 ? (
          bookingHistoryPerPageList.map((ticket, index) => {
            return (
              <div
                key={index + 1}
                style={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  margin: "30px 0",
                  padding: "20px 20px",
                }}
              >
                {/* <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Bạn có muốn xóa lịch sử đặt vé ?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handleConfirmDeleteBookingHistory(ticket);
                        handleClose()
                      }}
                    >
                      Đồng ý
                    </Button>
                  </Modal.Footer>
                </Modal> */}
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Ngày đặt:</p>
                  <p style={{ marginLeft: "10px" }}>
                    {getDate(ticket.purchase_date)}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Tên rạp:</p>
                  <p style={{ marginLeft: "10px" }}>{ticket.cinema_name}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      minWidth: "60px",
                    }}
                  >
                    Địa chỉ:
                  </p>
                  <p style={{ marginLeft: "10px" }}>{ticket.location}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Tên phim:</p>
                  <p style={{ marginLeft: "10px" }}>{ticket.title}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Giờ bắt đầu:</p>
                  <p style={{ marginLeft: "10px" }}>{ticket.start_time}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Giờ kết thúc:</p>
                  <p style={{ marginLeft: "10px" }}>{ticket.end_time}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Ghế đặt:</p>
                  <div style={{ marginLeft: "10px", display: "flex" }}>
                    {ticket.seats?.map((seat, index) => {
                      return (
                        <p key={index + 55555} style={{ marginLeft: "10px" }}>
                          {seat},
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Bắp nước:</p>
                  <div style={{ marginLeft: "10px", display: "flex" }}>
                    {ticket.food_drink?.map((food, index) => {
                      return (
                        <p key={index + 4444} style={{ marginLeft: "10px" }}>
                          {food},
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Giá vé:</p>
                  <p style={{ marginLeft: "10px", color: "red" }}>
                    {ticket.total_price}đ
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                      marginLeft: "auto",
                      marginRight: "20px",
                    }}
                    onClick={(e) => {
                      // handleConfirmDeleteBookingHistory(ticket);
                      handleShow(ticket);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>Bạn chưa đặt vé!</p>
            <Link
              to="/movies/currently-showing"
              style={{ textDecoration: "none" }}
            >
              Bấm vào đây để xem phim đang chiếu
            </Link>
          </div>
        )}
        {bookingHistoryPerPageList.length !== 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination>{items}</Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBookingHistory;
