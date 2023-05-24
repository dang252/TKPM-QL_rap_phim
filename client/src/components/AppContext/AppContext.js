import React, { useEffect, useState } from "react";
import { Context } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext = ({ children }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userProfile, setUserProfile] = useState({});

  // Profile navbar state
  const [navigateUrl, setNavigateUrl] = useState("detail");
  const [activeNav, setActiveNav] = useState("detail");

  const handleChangeProfileNav = (url) => {
    setNavigateUrl(url);
  };

  // Homepage movie list state
  const [hpMovieList, setHpMovieList] = useState("");

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
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        await axios.post(
          "http://localhost:5000/auth/logout",
          {},
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
            withCredentials: true,
          }
        );
        localStorage.clear();
        navigate("/");
        window.location.reload();
        toast.success("Đăng xuất thành công!");
      }
    } catch (error) {
      if (error.response) {
        // err 404
        // err 500
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
        navigate("/");
      } else if (error.request) {
        toast.error(
          "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
        );
        navigate("/");
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const getUserId = (username) => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data !== null) {
      const names = data["name"].split(" ");
      const name = names[names.length - 1];
      if (name && name === username) {
        return data.id.toString();
      }
    }
    return -1;
  };

  const getUserProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const rs = await axios.get(
          `http://localhost:5000/user/profile?id=${user.id}`,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          },
          { withCredentials: true }
        );

        const data = await rs.data;

        if (data) {
          console.log(data);
          setUserProfile(data);
        }

        return rs;
      }
    } catch (error) {
      console.log("Get user profile failed:", error.message);
      return error.response;
    }
  };

  const handleUserDOB = (dob) => {
    const dobStr = dob.split(":")[0].split("T")[0].split("-");
    return `${dobStr[2]}/${dobStr[1]}/${dobStr[0]}`;
  };

  const getDate = (date) => {
    let date_obj = date;
    if (typeof date !== "object") {
      date_obj = new Date(date);
    }
    let day = ("0" + date_obj.getDate()).slice(-2);
    let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
    let year = date_obj.getFullYear();
    return day + "-" + month + "-" + year;
  };

  const getMoviesByCategory = async (category) => {
    try {
      const rs = await axios.get(`http://localhost:5000/movies/${category}`);
      const data = await rs?.data;
      if (data) {
        setHpMovieList(rs.data);
      }
    } catch (error) {
      console.log("Get current movie failed:", error.message);
    }
  };

  const randomArray = (length, max) =>
    Array(length)
      .fill()
      .map(() => Math.round(Math.random() * max));

  return (
    <Context.Provider
      value={{
        username,
        logout,
        getUserId,
        getUserProfile,
        userProfile,
        handleUserDOB,
        navigateUrl,
        handleChangeProfileNav,
        activeNav,
        setActiveNav,
        getDate,
        getMoviesByCategory,
        hpMovieList,
        randomArray,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
