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

  const { userProfile } = useContext(Context);

  return (
    <div className="profile-nav-container">
      <div className="profile-nav-top">
        <div className="profile-top-avatar">
          <FontAwesomeIcon icon={faUser} />
        </div>
        {Object.keys(userProfile).length !== 0 && (
          <p className="profile-top-title">{userProfile.name}</p>
        )}
      </div>
      <div className="profile-nav-main">
        <div
          className="profile-main-category"
          onClick={(e) => {
            handleChangeProfileNav("detail");
          }}
        >
          <p>
            <FontAwesomeIcon icon={faAddressCard} />
          </p>
          <p>Tài khoản của tôi</p>
        </div>
        <div
          className="profile-main-category"
          onClick={(e) => {
            handleChangeProfileNav("edit");
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
