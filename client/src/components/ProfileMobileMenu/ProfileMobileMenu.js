import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./ProfileMobileMenu.css";

import { Context } from "../../context/UserContext";

import ProfileNavigation from "../ProfileNavigation/ProfileNavigation";

const ProfileMobileMenu = () => {
  const [show, setShow] = useState(false);

  const { handleChangeProfileNav } = useContext(Context);

  const handleClose = () => setShow(false);

  return (
    <>
      <Offcanvas
        className="profile-mobile-nav"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>HỆ THỐNG CGV</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProfileNavigation handleChangeProfileNav={handleChangeProfileNav} />
        </Offcanvas.Body>
      </Offcanvas>
      <div
        className="profile-mobile-menu-btn"
        onClick={(e) => {
          setShow(!show);
        }}
      >
        <p className="profile-mobile-icon">
          <FontAwesomeIcon icon={faBars} />
        </p>
      </div>
    </>
  );
};

export default ProfileMobileMenu;
