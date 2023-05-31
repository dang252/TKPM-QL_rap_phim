import React from "react";
import "./PaymentConfirm.css";
import { Link } from "react-router-dom";

const PaymentConfirm = (props) => {
  const { ticketInfoResult, getDate } = props;

  return (
    <div className="payment-confirm-container">
      <p
        style={{
          margin: "20px 0",
          fontSize: "30px",
          fontWeight: "bold",
          color: "red",
        }}
      >
        ĐẶT VÉ THÀNH CÔNG
      </p>
      <p
        style={{
          margin: "10px 0",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        THÔNG TIN VÉ
      </p>
      <div style={{ width: "100%", padding: "0 50px" }}>
        {Object.keys(ticketInfoResult).length !== 0 && (
          <>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Tên phim:
              </p>
              <p>{ticketInfoResult.title}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Tên rạp:
              </p>
              <p>{ticketInfoResult.cinema_name}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Địa chỉ:
              </p>
              <p>{ticketInfoResult.location}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Tên phòng:
              </p>
              <p>{ticketInfoResult.room_name}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Giờ bắt đầu:
              </p>
              <p>{ticketInfoResult.start_time}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Giờ kết thúc:
              </p>
              <p>{ticketInfoResult.end_time}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Ngày đặt vé:
              </p>
              <p>{getDate(ticketInfoResult.purchase_date)}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Ghế đặt:
              </p>
              {ticketInfoResult.seats.length !== 0 &&
                ticketInfoResult.seats.map((seats) => {
                  return (
                    <p key={seats} style={{ marginRight: "5px" }}>
                      {seats},
                    </p>
                  );
                })}
            </div>
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Bắp nước:
              </p>
              {ticketInfoResult.food_drink.length !== 0 ? (
                ticketInfoResult.food_drink.map((food) => {
                  return (
                    <p key={food} style={{ marginRight: "5px" }}>
                      {food},
                    </p>
                  );
                })
              ) : (
                <p>Không đặt</p>
              )}
            </div>
            <div
              style={{ display: "flex", marginTop: "80px", fontSize: "20px" }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  minWidth: "60px",
                  marginRight: "10px",
                }}
              >
                Giá vé:
              </p>
              <p style={{ color: "red" }}>{ticketInfoResult.total_price} đ</p>
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "100px",
                  height: "50px",
                  lineHeight: "50px",
                  textAlign: "center",
                  color: "#fff",
                  backgroundColor: "red",
                  borderRadius: "10px",
                  marginBottom: "50px",
                  marginLeft: "70%",
                }}
              >
                Xác nhận
              </div>
            </Link>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "red",
                textAlign: "center",
              }}
            >
              CGV XIN CHÂN THÀNH CẢM ƠN QUÝ KHÁCH
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirm;
