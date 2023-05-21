import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "./ProfileEdit.css";
import "react-datepicker/dist/react-datepicker.css";

import { Context } from "../../context/UserContext";
import axios from "axios";

const ProfileEdit = () => {
  const { userProfile, handleUserDOB } = useContext(Context);

  const [userGender, setUserGender] = useState("male");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  // if (Object.keys(userProfile).length !== 0) {
  //   console.log(userProfile);
  // }

  const tranferMonth = (monthChar) => {
    if (monthChar === "Jan") return 1;
    if (monthChar === "Feb") return 2;
    if (monthChar === "Mar") return 3;
    if (monthChar === "Apr") return 4;
    if (monthChar === "May") return 5;
    if (monthChar === "Jun") return 6;
    if (monthChar === "Jul") return 7;
    if (monthChar === "Aug") return 8;
    if (monthChar === "Sep") return 9;
    if (monthChar === "Oct") return 10;
    if (monthChar === "Nov") return 11;
    if (monthChar === "Dec") return 12;
    return 0;
  };

  const handleDatePicker = (date) => {
    const dateStr = date.toString().split(" ");
    return `${dateStr[3]}-${tranferMonth(dateStr[1])}-${dateStr[2]}`;
  };

  const handleEditProfile = async (e) => {
    try {
      e.preventDefault();
      const dateTranfer = handleDatePicker(startDate);
      const user = JSON.parse(localStorage.getItem("user"));

      // console.log(name, phone, email, userGender, dateTranfer);

      if (user) {
        const rs = await axios.post(
          "http://localhost:5000/user/profile",
          {
            id: user.id,
            name: name,
            phone: phone,
            email: email,
            dob: dateTranfer,
            gender: userGender,
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (rs.status === 200) {
          const newEditUser = {
            ...user,
            name: name,
            phone: phone,
            email: email,
            dob: dateTranfer,
            gender: userGender,
          };

          localStorage.setItem("user", JSON.stringify(newEditUser));
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="profile-edit-container">
      <h4 className="profile-edit-title">CHÍNH SỬA HỒ SƠ</h4>
      <p className="profile-edit-subtitle">Thay đổi thông tin hồ sơ cá nhân</p>
      {Object.keys(userProfile).length !== 0 && (
        <form
          className="profile-edit-content"
          onSubmit={(e) => {
            handleEditProfile(e);
          }}
        >
          <div className="profile-edit-item">
            <p>Họ tên:</p>
            <input
              className="text-input"
              type="text"
              placeholder="Nhập họ tên"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="profile-edit-item">
            <p>Số điện thoại:</p>
            <input
              className="text-input"
              type="text"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="profile-edit-item">
            <p>Email:</p>
            <input
              className="text-input"
              type="text"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="profile-edit-item">
            <p>Giới tính: </p>
            <div className="profile-radio-container">
              <div className="gender-radio-btn">
                <div className="radio1">
                  <input
                    type="radio"
                    value={userGender}
                    checked={userGender === "male"}
                    onChange={() => {
                      setUserGender("male");
                    }}
                  />
                </div>
                <div className="radio1-title">Nam</div>
              </div>
              <div className="gender-radio-btn">
                <div className="radio1">
                  <input
                    type="radio"
                    value={userGender}
                    checked={userGender === "female"}
                    onChange={() => {
                      setUserGender("female");
                    }}
                  />
                </div>
                <div className="radio1-title">Nữ</div>
              </div>
            </div>
          </div>
          <div className="profile-edit-item">
            <p>Ngày sinh:</p>
            <DatePicker
              className="profile-edit-date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <button className="confirm-profile-edit">Lưu</button>
        </form>
      )}
    </div>
  );
};

export default ProfileEdit;
