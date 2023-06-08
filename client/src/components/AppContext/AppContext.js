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

  // Detail page movie state
  const [detailMovie, setDetailMovie] = useState({});

  //doc thong  tin user trong local storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data !== null) {
      const names = data["name"].split(" ");
      const name = names[names.length - 1];
      setUsername(name);
    }
  }, []);
  //lay danh sach ngay
  const DayOfWeeks = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    0: "Sun",
  };

  const [dates, setDates] = useState([]);
  useEffect(() => {
    let days = [new Date()];
    let date = new Date();
    for (let i = 0; i < 24; i++) {
      days = [...days, new Date(date.setDate(date.getDate() + 1))];
    }
    setDates(days);
  }, []);

  //lay danh sach cac tinh thanh
  const [provinces, setProvinces] = useState([]);
  const GetProvince = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/book/provinces`,
        {},
        {
          withCredentials: true,
        }
      );
      setProvinces(response.data);
    } catch (err) {
      toast.error(
        "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!"
      );
    }
  };

  useEffect(() => {
    GetProvince();
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
          // console.log(data);
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

  // const randomArray = (length, max) =>
  //   Array(length)
  //     .fill()
  //     .map(() => Math.round(Math.random() * max));

  const randomArray = (length, max) => {
    var arr = [];
    while (arr.length < length) {
      var r = Math.floor(Math.random() * max) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  const getDetailMovie = async (id) => {
    try {
      const rs = await axios.get(
        `http://localhost:5000/movies/detail?id=${id}`
      );
      const data = await rs?.data;
      setDetailMovie(data);
    } catch (error) {
      console.log("Get detail movie failed:", error.message);
    }
  };

  const durationTransform = (duration) => {
    const temp = duration.split(":");
    const hour = Number(temp[0]);
    const minute = Number(temp[1]);
    const second = Number(temp[2]);
    return hour * 60 + minute + second / 60;
  };

  const [ticketInfo, setTicketInfo] = useState();

  const handleGetTicketInfo = (id) => {
    setTicketInfo(id);
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [idSchedule, setIdSchedule] = useState("");
  const [seatsList, setSeatsList] = useState([]);
  const [seatsPickList, setSeatsPickList] = useState([]);

  const handleGetSchedule = (ticketInfo, id_room, id, cinema_name, tm) => {
    const user = localStorage.getItem("user");
    if (user)
      navigate(
        `/book/seats?id_movie=${ticketInfo}&id_room=${id_room}&id_schedule=${id}&name=${cinema_name}&time=${tm}`
      );
    else navigate("/login");
  };

  const getSeats = async (idSchedule) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const rs = await axios.get(
          `http://localhost:5000/book/seats?id_schedule=${idSchedule}`,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );
        setIdSchedule(idSchedule);
        setSeatsList(rs.data);
      }
    } catch (error) {
      console.log("Get seats failed:", error.message);
    }
  };

  const handleAddSeatsPick = (targetSeat) => {
    if (targetSeat?.status === 0) {
      const id = targetSeat?.id_seat;
      // console.log(id);

      const checkExist = seatsPickList.filter((seat) => {
        return seat === id;
      });

      if (checkExist.length !== 0) {
        const filterSeatsLick = seatsPickList.filter((seat) => {
          return seat !== id;
        });
        setSeatsPickList(filterSeatsLick);
      } else {
        setSeatsPickList([...seatsPickList, id]);
      }
    }
  };

  const [foodList, setFoodList] = useState([]);
  const [foodPickList, setFoodPickList] = useState([]);

  const getFoods = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const rs = await axios.get("http://localhost:5000/book/food_drink", {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        });
        setFoodList(rs.data);
      }
    } catch (error) {
      console.log("Get foods failed:", error.message);
    }
  };

  const handleFoodList = (id, type) => {
    // console.log(id, type);

    if (type === "add") {
      const tempList = [...foodPickList, id];
      tempList.sort((a, b) => {
        return a - b;
      });
      setFoodPickList(tempList);
    }
    if (type === "sub") {
      let targetList = foodPickList.filter((food) => {
        return food === id;
      });

      if (targetList.length > 0) {
        targetList.pop();
        const filterList = foodPickList.filter((food) => {
          return food !== id;
        });

        const mergeList = targetList.concat(filterList);
        mergeList.sort((a, b) => {
          return a - b;
        });
        setFoodPickList(mergeList);
      }
    }
  };

  const [ticketPrice, setTicketPrice] = useState(0);

  const getTicketPrice = async (date, time, id_room) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const data = {
          date: date,
          time: time,
          user_dob: user.dob,
          id_room: id_room,
        };

        const rs = await axios.post(
          "http://localhost:5000/book/ticket_price",
          data,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );
        setTicketPrice(rs.data.price);
      }
    } catch (error) {
      console.log("Get ticket price failed:", error.message);
    }
  };

  const [ticketInfoResult, setTicketInfoResult] = useState({});

  const handleBookTicket = async (idSchedule, time) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const data = {
          id_user: user.id,
          id_seats: seatsPickList,
          id_schedule: idSchedule,
          id_food_drink: foodPickList,
          start_time: time,
        };

        const rs = await axios.post(
          "http://localhost:5000/book/bookTickets",
          data,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );
        // console.log(rs.data);
        setTicketInfoResult(rs.data);
      }
    } catch (error) {
      console.log("Book ticket:", error.message);
    }
  };

  const [bookingHistoryList, setBookingHistoryList] = useState([]);

  const getBookingHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const rs = await axios.get(
          `http://localhost:5000/user/booking_history?id=${user.id}`,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );

        setBookingHistoryList(rs.data);
      }
    } catch (error) {
      console.log("Get booking history:", error.message);
    }
  };

  const checkIsStaff = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.is_staff === true) return true;
      else return false;
    }
  };

  const [shiftList, setShiftList] = useState([]);
  const [cinemaIdTitle, setCinemaIdTitle] = useState("");
  const [registerShiftList, setRegisterShiftList] = useState([]);

  const getCinemaShift = async (cinemaId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user?.is_staff === true) {
        const rs = await axios.get(
          `http://localhost:5000/staff/listShift?id_cinema=${cinemaId}`,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );

        // console.log(rs.data);
        setShiftList(rs.data);
        setRegisterShiftList([]);
      }
    } catch (error) {
      console.log("Get cinema shift failed:", error.message);
    }
  };

  const checkIsRegisterShift = (staffList) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user?.is_staff === true) {
      const check = staffList.filter((staff) => {
        return staff === user.id;
      });

      if (check.length !== 0) return true;
      else return false;
    }
  };

  const translateDate = (day) => {
    if (day === "Monday") return "Thứ 2";
    if (day === "Tuesday") return "Thứ 3";
    if (day === "Wednesday") return "Thứ 4";
    if (day === "Thursday") return "Thứ 5";
    if (day === "Friday") return "Thứ 6";
    if (day === "Saturday") return "Thứ 7";
    if (day === "Sunday") return "Chủ nhật";
  };

  const checkInitRegisterShift = (shiftId) => {
    const checkInit = registerShiftList.filter((shift) => {
      return shift === shiftId;
    });

    if (checkInit.length !== 0) return true;
    else return false;
  };

  const handleRegisterShift = (shiftId) => {
    const checkInit = registerShiftList.filter((shift) => {
      return shift === shiftId;
    });

    if (checkInit.length === 0) {
      setRegisterShiftList([...registerShiftList, shiftId]);
    } else {
      const filterShift = registerShiftList.filter((shift) => {
        return shift !== shiftId;
      });

      filterShift.sort((a, b) => {
        return a - b;
      });

      setRegisterShiftList(filterShift);
    }
  };

  const [showRegisterResult, setShowRegisterResult] = useState(false);
  const [registerResultMessage, setRegisterResultMessage] = useState();

  const handleCloseRegisterResult = () => setShowRegisterResult(false);
  const handleShowRegisterResult = () => setShowRegisterResult(true);

  const handleSubmitRegisterShift = async (shiftId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const data = {
          id_staff: user.id,
          id_shifts: registerShiftList,
        };

        const rs = await axios.put(
          "http://localhost:5000/staff/registerShifts",
          data,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );

        localStorage.setItem("register_shift_result", JSON.stringify(rs.data));

        sessionStorage.setItem("reloading_register_shift", "true");
        window.location.reload(false);
      }
    } catch (error) {
      console.log("Register shift failed:", error.message);
      if (error.response.status === 409) {
        localStorage.setItem(
          "register_shift_result",
          JSON.stringify(error.response.data)
        );

        sessionStorage.setItem("reloading_register_shift", "true");
        window.location.reload(false);
      }
    }
  };

  const [cinemaProvincesList, setCinemaProvincesList] = useState([]);

  const getCinemaProvinces = async () => {
    try {
      const rs = await axios.get("http://localhost:5000/book/provinces");

      const cloneList = rs.data?.map((cinema) => {
        const data = {
          value: cinema.province,
          label: cinema.province,
        };
        return data;
      });

      setCinemaProvincesList(cloneList);
    } catch (error) {
      console.log("Get cinema provinces failed:", error.message);
    }
  };

  const [cinemaProvincesShiftList, setCinemaProvincesShiftList] = useState([]);

  const handleChooseCinemaProvinces = async (value) => {
    try {
      const rs = await axios.post("http://localhost:5000/book/provinces", {
        province: value.value,
      });

      localStorage.setItem("province", JSON.stringify(value.value));

      const cloneList = rs.data?.map((shift) => {
        const data = {
          value: shift.id,
          label: shift.name,
        };
        return data;
      });

      setCinemaProvincesShiftList(cloneList);
    } catch (error) {
      console.log("Get cinema provinces list failed:", error.message);
    }
  };

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
        getDetailMovie,
        detailMovie,
        durationTransform,
        handleGetTicketInfo,
        modalIsOpen,
        openModal,
        setIsOpen,
        closeModal,
        ticketInfo,
        getSeats,
        idSchedule,
        seatsList,
        handleAddSeatsPick,
        seatsPickList,
        setSeatsPickList,
        getFoods,
        foodList,
        foodPickList,
        setFoodPickList,
        handleFoodList,
        getTicketPrice,
        ticketPrice,
        handleBookTicket,
        ticketInfoResult,
        dates,
        DayOfWeeks,
        provinces,
        handleGetSchedule,
        getBookingHistory,
        bookingHistoryList,
        checkIsStaff,
        getCinemaShift,
        shiftList,
        translateDate,
        handleRegisterShift,
        registerShiftList,
        checkInitRegisterShift,
        handleSubmitRegisterShift,
        cinemaIdTitle,
        setCinemaIdTitle,
        getCinemaProvinces,
        cinemaProvincesList,
        handleChooseCinemaProvinces,
        cinemaProvincesShiftList,
        handleShowRegisterResult,
        handleCloseRegisterResult,
        showRegisterResult,
        registerResultMessage,
        setRegisterResultMessage,
        checkIsRegisterShift,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
