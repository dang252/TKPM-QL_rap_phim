import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutPage = () => {
  useEffect(() => {
    document.title = "CGV Cinemas Fake | Đăng Xuất";
  }, []);

  let navigate = useNavigate();
  useEffect(() => {
    const logged = localStorage.getItem("user");
    if (logged == null) {
      navigate("/");
    }
  }, [navigate]);

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

  useEffect(() => {
    logout();
  }, []);
  return <div>LogoutPage</div>;
};

export default LogoutPage;
