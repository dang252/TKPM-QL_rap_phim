import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPenToSquare,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import "./ProfileNavigation.css";

import { Context } from "../../context/UserContext";

const ProfileNavigation = (props) => {
  const { handleChangeProfileNav } = props;

  // const [activeNav, setActiveNav] = useState("detail");
  const { userProfile, activeNav, setActiveNav } = useContext(Context);

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
      </div>
    </div>
  );
};

export default ProfileNavigation;
