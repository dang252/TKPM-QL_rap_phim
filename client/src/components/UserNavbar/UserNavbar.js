import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./UserNavbar.css";

const UserNavbar = () => {
  return (
    <div className="user-navbar-container">
      <div className="content">
        <div className="auth">
          <p>
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </p>
          <p>
            <Link to="/login" className="nav-link">
              Đăng nhập
            </Link>
          </p>
          <p>/</p>
          <p>
            <Link to="/register" className="nav-link">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
