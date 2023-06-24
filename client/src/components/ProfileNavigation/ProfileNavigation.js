import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import {
  faUser,
  faPenToSquare,
  faAddressCard,
  faLock,
  faTicket,
  faBriefcase,
  faFilm,
  faTrash,
  faMagnifyingGlass,
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
    handleShowRegisterResult,
    setRegisterResultMessage,
  } = useContext(Context);

  window.onload = () => {
    let reloading = sessionStorage.getItem("reloading_register_shift");

    if (reloading) {
      window.scrollTo(0, 0);

      const registerCinemaId = JSON.parse(
        localStorage.getItem("register_cinema_id")
      );

      const registerCinemaName = JSON.parse(
        localStorage.getItem("register_cinema_name")
      );

      const proviceName = JSON.parse(localStorage.getItem("province"));
      const title = `${registerCinemaName}, thành phố ${proviceName}`;

      getCinemaShift(registerCinemaId);
      setCinemaIdTitle(title);

      const result = JSON.parse(localStorage.getItem("register_shift_result"));

      if (result === "Register for work shifts successfully!") {
        toast.success("Đăng ký thành công!");
      } else {
        // toast.error("Đăng ký thất bại");
        handleShowRegisterResult();
        const result = JSON.parse(
          localStorage.getItem("register_shift_result")
        );
        setRegisterResultMessage(result);
      }

      sessionStorage.removeItem("reloading_register_shift");

      handleChangeProfileNav("shift");
      setActiveNav("shift");
    }
    let MSG = JSON.parse(localStorage.getItem("UnfulfilledMsg"))
    if (MSG) {
      if (MSG.type === "success") {
        toast.success(MSG.msg);
      }
      else if (MSG.type === "err") {
        toast.error(MSG.msg)
      }
      localStorage.removeItem("UnfulfilledMsg")
      handleChangeProfileNav("addmovies");
      setActiveNav("addmovies");
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
          className={`profile-main-category ${activeNav === "detail" && "active"
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
          className={`profile-main-category ${activeNav === "edit" && "active"
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
          className={`profile-main-category ${activeNav === "changepassword" && "active"
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
          className={`profile-main-category ${activeNav === "bookinghistory" && "active"
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
          <>
            <div
              className={`profile-main-category ${activeNav === "shift" && "active"
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
            <div
              className={`profile-main-category ${activeNav === "addmovies" && "active"
                }`}
              onClick={(e) => {
                handleChangeProfileNav("addmovies");
                setActiveNav("addmovies");
              }}
            >
              <p>
                <FontAwesomeIcon icon={faFilm} />
              </p>
              <p>Thêm lịch chiếu</p>
            </div>
            <div
              className={`profile-main-category ${activeNav === "searchticket" && "active"
                }`}
              onClick={(e) => {
                handleChangeProfileNav("searchticket");
                setActiveNav("searchticket");
              }}
            >
              <p>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </p>
              <p>Kiểm tra vé</p>
            </div>
          </>
        )}
        <div
          className={`profile-main-category ${activeNav === "deleteaccount" && "active"
            }`}
          onClick={(e) => {
            handleChangeProfileNav("deleteaccount");
            setActiveNav("deleteaccount");
          }}
        >
          <p>
            <FontAwesomeIcon icon={faTrash} />
          </p>
          <p>Xóa tài khoản</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavigation;
