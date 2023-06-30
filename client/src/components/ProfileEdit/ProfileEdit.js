import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ProfileEdit.css";
import "react-datepicker/dist/react-datepicker.css";

import { Context } from "../../context/UserContext";
import axios from "axios";

import {
  regexName,
  regexEmail,
  regexTel,
} from "../../components/Forms/FormRegex";

const ProfileEdit = () => {
  const { userProfile } = useContext(Context);

  const [userGender, setUserGender] = useState("male");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  // const [err, setErr] = useState(0);
  let err = 0;

  const errMsg = {
    1: "Tên không hợp lệ!",
    2: "Email không hợp lệ!",
    3: "Số điện thoại không hợp lệ!",
    4: "Password không hợp lệ! Password phải bao gồm ít nhất 1 ký tự thường, 1 ký tự in hoa và 1 chữ số!",
    5: "Capcha Không hợp lệ.",
    6: "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!",
    7: "Vui lòng nhập đủ thông tin!",
  };

  // if (Object.keys(userProfile).length !== 0) {
  //   console.log(userProfile);
  // }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const checkInput = (name, phone, email) => {
    // console.log(name, phone, email);
    if (name === "" || phone === "" || email === "") {
      err = 7;
      return false;
    } else if (!regexName.test(name)) {
      err = 1;
      return false;
    } else if (!regexEmail.test(email)) {
      err = 2;
      return false;
    } else if (!regexTel.test(phone)) {
      err = 3;
      return false;
    }
    err = 0;
    return true;
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    handleShow();
  };

  const handleConfirmEditProfile = async () => {
    try {
      const dateTranfer = handleDatePicker(startDate);
      const user = JSON.parse(localStorage.getItem("user"));

      // console.log(name, phone, email, userGender, dateTranfer);

      const checkError = checkInput(name, phone, email);

      if (user && checkError && err === 0) {
        const rs = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}user/profile`,
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
          handleClose();
          toast.success("Sửa hồ sơ thành công");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }

      // Form input error
      if (!checkError) {
        // console.log(err);
        // console.log(checkError);
        // console.log(errMsg[err]);

        toast.error(errMsg[err]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn đổi thông tin hồ sơ ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleConfirmEditProfile();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="profile-edit-container">
        <h4 className="profile-edit-title">CHỈNH SỬA HỒ SƠ</h4>
        <p className="profile-edit-subtitle">
          Thay đổi thông tin hồ sơ cá nhân
        </p>
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
    </>
  );
};

export default ProfileEdit;
