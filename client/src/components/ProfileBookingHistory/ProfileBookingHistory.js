import React, { useEffect, useContext, useState } from "react";
import { Pagination } from "react-bootstrap";
import "./ProfileBookingHistory.css";

import { Context } from "../../context/UserContext";
import { Link } from "react-router-dom";

const ProfileBookingHistory = () => {
  const { getBookingHistory, bookingHistoryList, getDate } =
    useContext(Context);

  const [active, setActive] = useState(1);
  const [bookingHistoryPerPageList, setBookingHistoryListPerPageList] =
    useState([]);
  let items = [];

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

  return (
    <div className="profile-booking-history-container">
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
