import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/UserContext";
import "./UserNavbar.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserNavbar = () => {
  const { username } = useContext(Context);
  // console.log(username);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.clear();
      toast.success("Đăng xuất thành công!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // err 404
        // err 500
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
        navigate("/");
      } else if (error.request) {
        toast.success(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
        navigate("/");
      } else {
        console.log("Error", error.message);
      }
    }
  };

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
            {username ? (
              <Link to="/" className="nav-link">
                Hello, {username}
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                Đăng nhập
              </Link>
            )}
          </p>
          <p>/</p>
          <div>
            {username ? (
              <p
                className="nav-link"
                onClick={(e) => {
                  logout();
                }}
              >
                Đăng xuất
              </p>
            ) : (
              <Link to="/register" className="nav-link">
                Đăng ký
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
