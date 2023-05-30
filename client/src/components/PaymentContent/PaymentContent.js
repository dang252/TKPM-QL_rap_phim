import React, { useContext } from "react";
import "./PaymentContent.css";

import BookingFooter from "../BookingFooter/BookingFooter";

import { Context } from "../../context/UserContext";

const PaymentContent = (props) => {
  const {
    ticketPrice,
    paramsTime,
    paramsCinemaName,
    paramsIdSchedule,
    paramsIdRoom,
  } = props;

  const { seatsPickList, foodList, foodPickList, seatsList, detailMovie } =
    useContext(Context);

  // console.log("Seats:", seatsPickList);
  // console.log("Foods:", foodPickList);
  // console.log("Ticket price:", ticketPrice);

  const getTotalFood = (foodList, foodPickList) => {
    if (foodPickList.length === 0) {
      return 0;
    } else {
      let total = 0;
      for (var i = 0; i < foodList.length; ++i) {
        for (var j = 0; j < foodPickList.length; ++j) {
          if (foodList[i].id === foodPickList[j]) {
            total += foodList[i].price;
          }
        }
      }
      return total;
    }
  };

  return (
    <div className="payment-content-container">
      <p className="payment-title">THANH TOÁN</p>
      <div className="payment-content">
        <div className="content-left">
          <p
            style={{
              backgroundColor: "#999999",
              padding: "10px 20px",
              fontWeight: "bold",
            }}
          >
            HÌNH THỨC THANH TOÁN
          </p>
          <div>
            <div
              style={{
                display: "flex",
                height: "50px",
                margin: "20px 20px",
                // backgroundColor: "red",
              }}
            >
              <input type="radio" name="payment" value="atm" />
              <div
                style={{
                  maxWidth: "50px",
                  marginLeft: "20px",
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "green",
                }}
              >
                <img
                  src="../../assets/payment/atm.png"
                  alt="atm"
                  style={{ width: "100%" }}
                />
              </div>
              <p
                style={{
                  marginLeft: "20px",
                  height: "50px",
                  lineHeight: "50px",
                  // backgroundColor: "blue",
                }}
              >
                ATM card (Thẻ nội địa)
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                height: "50px",
                margin: "20px 20px",
                // backgroundColor: "red",
              }}
            >
              <input type="radio" name="payment" value="visa" />
              <div
                style={{
                  maxWidth: "50px",
                  marginLeft: "20px",
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "green",
                }}
              >
                <img
                  src="../../assets/payment/visa.png"
                  alt="atm"
                  style={{ width: "100%" }}
                />
              </div>
              <p
                style={{
                  marginLeft: "20px",
                  height: "50px",
                  lineHeight: "50px",
                  // backgroundColor: "blue",
                }}
              >
                Thẻ quốc tế (Visa, Master, Amex, )
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                height: "50px",
                margin: "20px 20px",
                // backgroundColor: "red",
              }}
            >
              <input type="radio" name="payment" value="momo" />
              <div
                style={{
                  maxWidth: "50px",
                  marginLeft: "20px",
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "green",
                }}
              >
                <img
                  src="../../assets/payment/momo.png"
                  alt="atm"
                  style={{ width: "100%" }}
                />
              </div>
              <p
                style={{
                  marginLeft: "20px",
                  height: "50px",
                  lineHeight: "50px",
                  // backgroundColor: "blue",
                }}
              >
                Ví MoMo
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                height: "50px",
                margin: "20px 20px",
                // backgroundColor: "red",
              }}
            >
              <input type="radio" name="payment" value="zalopay" />
              <div
                style={{
                  maxWidth: "50px",
                  marginLeft: "20px",
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "green",
                }}
              >
                <img
                  src="../../assets/payment/zalopay.png"
                  alt="atm"
                  style={{ width: "100%" }}
                />
              </div>
              <p
                style={{
                  marginLeft: "20px",
                  height: "50px",
                  lineHeight: "50px",
                  // backgroundColor: "blue",
                }}
              >
                ZaloPay: Vé chỉ từ 14K, nhận thêm ưu đãi KFC
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                height: "50px",
                margin: "20px 20px",
                // backgroundColor: "red",
              }}
            >
              <input type="radio" name="payment" value="shopeepay" />
              <div
                style={{
                  maxWidth: "50px",
                  marginLeft: "20px",
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "green",
                }}
              >
                <img
                  src="../../assets/payment/shopeepay.png"
                  alt="atm"
                  style={{ width: "100%" }}
                />
              </div>
              <p
                style={{
                  marginLeft: "20px",
                  height: "50px",
                  lineHeight: "50px",
                  // backgroundColor: "blue",
                }}
              >
                ShopeePay
              </p>
            </div>
          </div>
        </div>
        <div className="content-right">
          <div>
            <div
              style={{
                backgroundColor: "#fdf7dc",
                padding: "10px 15px",
                border: "1px solid gray",
              }}
            >
              <p>Giá ghế: {ticketPrice ? ticketPrice : 0}đ</p>
              <p>Số lượng ghế: {seatsPickList.length}</p>
            </div>
            <div
              style={{
                backgroundColor: "#c2c2c2",
                textAlign: "center",
                padding: "10px 0",
                border: "1px solid gray",
              }}
            >
              Tổng tiền ghế:{" "}
              {ticketPrice ? ticketPrice * seatsPickList.length : 0}đ
            </div>
          </div>
          <div>
            <div
              style={{
                marginTop: "30px",
                backgroundColor: "#fdf7dc",
                padding: "10px 15px",
                border: "1px solid gray",
              }}
            >
              <p>Số lượng bắp nước: {foodPickList.length}</p>
            </div>
            <div
              style={{
                backgroundColor: "#c2c2c2",
                textAlign: "center",
                padding: "10px 0",
                border: "1px solid gray",
              }}
            >
              Tổng tiền bắp nước: {getTotalFood(foodList, foodPickList)}đ
            </div>
          </div>
        </div>
      </div>
      <BookingFooter
        seatsList={seatsList}
        seatsPickList={seatsPickList}
        paramsTime={paramsTime}
        paramsCinemaName={paramsCinemaName}
        paramsIdSchedule={paramsIdSchedule}
        paramsIdRoom={paramsIdRoom}
        detailMovie={detailMovie}
        prevUrl={`/book/foods?id_movie=${detailMovie.id}&id_room=${paramsIdRoom}&id_schedule=${paramsIdSchedule}&name=${paramsCinemaName}&time=${paramsTime}`}
        nextUrl={`/book/result`}
      />
    </div>
  );
};

export default PaymentContent;
