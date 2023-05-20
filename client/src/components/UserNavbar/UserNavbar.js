import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Context } from '../../context/UserContext'
import "./UserNavbar.css";

const UserNavbar = () => {
  const  { username } = useContext(Context)
  console.log(username)
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
            {username 
            ? <Link to="/" className="nav-link">
                Hello, {username}
              </Link>
            : <Link to="/login" className="nav-link">
                Đăng nhập
              </Link>}
          </p>
          <p>/</p>
          <p>
            {username 
            ? <Link to="/Logout" className="nav-link">
                Đăng xuất
              </Link>
            : <Link to="/register" className="nav-link">
                Đăng ký
              </Link>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
