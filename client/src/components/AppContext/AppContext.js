import React, { useEffect, useState } from "react";
import { Context } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext = ({ children }) => {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  //doc thong  tin user trong local storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data !== null) {
      const names = data["name"].split(" ");
      const name = names[names.length - 1];
      setUsername(name);
    }
  }, []);

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
    <Context.Provider value={{ username, logout }}>{children}</Context.Provider>
  );
};

export default AppContext;
