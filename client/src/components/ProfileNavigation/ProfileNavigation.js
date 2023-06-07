import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPenToSquare,
  faAddressCard,
  faLock,
  faTicket,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import "./ProfileNavigation.css";

import { Context } from "../../context/UserContext";

const ProfileNavigation = (props) => {
  const { handleChangeProfileNav } = props;

  // const [activeNav, setActiveNav] = useState("detail");
  const {
    userProfile,
    activeNav,
    setActiveNav,
    checkIsStaff,
    getCinemaShift,
    setCinemaIdTitle,
  } = useContext(Context);

  window.onload = () => {
    let reloading = sessionStorage.getItem("reloading_register_shift");

    if (reloading) {
      const registerCinemaId = JSON.parse(
        localStorage.getItem("register_cinema_id")
      );
      getCinemaShift(registerCinemaId);
      setCinemaIdTitle(registerCinemaId);

      sessionStorage.removeItem("reloading_register_shift");
      window.scrollTo(0, 0);
      handleChangeProfileNav("shift");
      setActiveNav("shift");
    }
  };

  return (
    <div className="profile-nav-container">
      <div className="profile-nav-top">
        <p className="profile-top-title">TÀI KHOẢN CGV</p>
        <div className="profile-top-avatar">
          <FontAwesomeIcon icon={faUser} />
        </div>
        {Object.keys(userProfile).length !== 0 && (
          <p className="profile-top-name">{userProfile.name}</p>
        )}
      </div>
      <div className="profile-nav-main">
        <div
          className={`profile-main-category ${
            activeNav === "detail" && "active"
          }`}
          onClick={(e) => {
            handleChangeProfileNav("detail");
            setActiveNav("detail");
          }}
        >
          <p>
            <FontAwesomeIcon icon={faAddressCard} />
          </p>
          <p>Tài khoản của tôi</p>
        </div>
        <div
          className={`profile-main-category ${
            activeNav === "edit" && "active"
          }`}
          onClick={(e) => {
            handleChangeProfileNav("edit");
            setActiveNav("edit");
          }}
        >
          <p>
            <FontAwesomeIcon icon={faPenToSquare} />
          </p>
          <p>Chỉnh sửa tài khoản</p>
        </div>
        <div
          className={`profile-main-category ${
            activeNav === "changepassword" && "active"
          }`}
          onClick={(e) => {
            handleChangeProfileNav("changepassword");
            setActiveNav("changepassword");
          }}
        >
          <p>
            <FontAwesomeIcon icon={faLock} />
          </p>
          <p>Đổi mật khẩu</p>
        </div>
        <div
          className={`profile-main-category ${
            activeNav === "bookinghistory" && "active"
          }`}
          onClick={(e) => {
            handleChangeProfileNav("bookinghistory");
            setActiveNav("bookinghistory");
          }}
        >
          <p>
            <FontAwesomeIcon icon={faTicket} />
          </p>
          <p>Lịch sử đặt vé</p>
        </div>
        {checkIsStaff() && (
          <div
            className={`profile-main-category ${
              activeNav === "shift" && "active"
            }`}
            onClick={(e) => {
              handleChangeProfileNav("shift");
              setActiveNav("shift");
            }}
          >
            <p>
              <FontAwesomeIcon icon={faBriefcase} />
            </p>
            <p>Quản lý lịch làm việc</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNavigation;
