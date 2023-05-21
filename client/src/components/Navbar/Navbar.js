import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const handleTopPage = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="navbar-container">
      <div className="content">
        <div
          className="left-logo"
          onClick={(e) => {
            handleTopPage();
          }}
        >
          <Link to="/" className="nav-link">
            <img alt="cgvlogo" src="../../assets/img/cgvlogo.png" />
          </Link>
        </div>
        <div className="links">
          <div className="dropdown">
            <p className="drop-title">PHIM</p>
            <div className="dropdown-content">
              <p>Phim đang chiếu</p>
              <p>Phim sắp chiếu</p>
            </div>
          </div>
          <div className="dropdown">
            <p className="drop-title">RẠP CGV</p>
            <div className="dropdown-content">
              <p>Tất cả các rạp</p>
              <p>Rạp đặc biệt</p>
              <p>Rạp 3D</p>
            </div>
          </div>
        </div>
        <div className="right-logo">
          <a href="https://kenhcine.cgv.vn" target="_blank" rel="noreferrer">
            <img alt="kenhcine" src="../../assets/img/kenhcine.gif" />
          </a>
          <div>
            <img alt="muave" src="../../assets/img/mua-ve_ngay.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
