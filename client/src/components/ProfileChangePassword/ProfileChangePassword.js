import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { regexPassword } from "../../components/Forms/FormRegex";
import "./ProfileChangePassword.css";

import { Context } from "../../context/UserContext";

const ProfileChangePassword = () => {
  const { logout } = useContext(Context);

  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  let err = 0;

  const errMsg = {
    1: "Vui lòng nhập đủ thông tin!",
    2: "Password không hợp lệ! Password phải bao gồm ít nhất 1 ký tự thường, 1 ký tự in hoa và 1 chữ số!",
    3: "Xác nhận mật khẩu mới không khớp",
    4: "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!",
  };

  const checkInput = (oldPassword, newPassword, confirmNewPassword) => {
    // console.log(name, phone, email);
    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      err = 1;
      return false;
    } else if (!regexPassword.test(newPassword)) {
      err = 2;
      return false;
    } else if (!regexPassword.test(confirmNewPassword)) {
      err = 2;
      return false;
    } else if (newPassword !== confirmNewPassword) {
      err = 3;
      return false;
    }
    err = 0;
    return true;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };
  const handleShowSuccess = () => setShowSuccess(true);

  const handleChangePassword = (e) => {
    e.preventDefault();
    handleShow();
  };

  const handleConfirmChangePassword = async () => {
    try {
      handleClose();
      const user = JSON.parse(localStorage.getItem("user"));
      const checkError = checkInput(
        oldPassword,
        newPassword,
        confirmNewPassword
      );

      if (user && checkError && err === 0) {
        const rs = await axios.post(
          "http://localhost:5000/user/changePassword",
          {
            id: user.id,
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
            withCredentials: true,
          }
        );

        if (rs.status === 200) {
          handleShowSuccess();
        }
      }

      // Form input error
      if (!checkError) {
        toast.error(errMsg[err]);
      }
    } catch (error) {
      toast.error(error.response.data);
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc muốn đổi mật khẩu ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleConfirmChangePassword();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showSuccess}
        onHide={(e) => {
          handleCloseSuccess();
          logout();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vui lòng đang nhập lại</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {
              handleCloseSuccess();
              logout();
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="profile-password-change-container">
        <h4 className="profile-password-change-title">ĐỔI MẬT KHẨU</h4>
        <p className="profile-password-change-subtitle">
          Thay đổi mật khẩu để bảo mật tài khoản
        </p>
        <form
          className="profile-password-change-content"
          onSubmit={(e) => {
            handleChangePassword(e);
          }}
        >
          <div className="profile-password-change-item">
            <p>Mật khẩu cũ:</p>
            <input
              className="text-input"
              type="password"
              placeholder="Nhập mật khẩu cũ"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
            />
          </div>
          <div className="profile-password-change-item">
            <p>Mật khẩu mới:</p>
            <input
              className="text-input"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="profile-password-change-item">
            <p>Xác nhận mật khẩu mới:</p>
            <input
              className="text-input"
              type="password"
              placeholder="Nhập xác nhận mật khẩu mới"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
            />
          </div>
          <button className="confirm-password-change">Đổi</button>
        </form>
      </div>
    </>
  );
};

export default ProfileChangePassword;
