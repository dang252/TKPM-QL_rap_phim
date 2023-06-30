import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

import "../Form.css";
import {
  regexName,
  regexEmail,
  regexTel,
  regexPassword,
} from "../FormRegex.js";

const errMsg = {
  1: "Tên không hợp lệ!",
  2: "Email không hợp lệ!",
  3: "Số điện thoại không hợp lệ!",
  4: "Password không hợp lệ! Password phải ít nhất 8 ký tự gồm ít nhất 1 ký tự thường, 1 ký tự in hoa và 1 chữ số!",
  5: "Capcha Không hợp lệ.",
  6: "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!",
  7: "Email hoặc số điện thoại đã bị trùng, bạn vui lòng thử số/email khác nhé!"
};

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [days, setDays] = useState([]);
  const [bmonth, setBmonth] = useState();
  const [byear, setByear] = useState();
  const [bday, setBday] = useState();
  const [gender, setGender] = useState("male");
  const [err, setErr] = useState(0);
  const [captcha, setCaptcha] = useState(false);
  let navigate = useNavigate();

  const checkInput = () => {
    if (!regexName.test(name)) {
      setErr(1);
      return false;
    } else if (!regexEmail.test(email)) {
      setErr(2);
      return false;
    } else if (!regexTel.test(tel)) {
      setErr(3);
      return false;
    } else if (!regexPassword.test(password)) {
      setErr(4);
      return false;
    } else if (!captcha) {
      setErr(5);
      return false;
    }
    setErr(0);
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInput()) {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/auth/register`,
          {
            name: name,
            phone: tel,
            email: email,
            password: password,
            dob: byear + "-" + bmonth + "-" + bday,
            gender: gender,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Đăng ký thành công!");
        navigate("/Login");
      } catch (error) {
        if (error.response) {
          // err 404
          // err 500
          if (error.response.status === 404)
            setErr(7);
          else setErr(6)
        } else if (error.request) {
          setErr(6);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  };

  useEffect(() => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months = [...months, i];
    }
    let years = [];
    for (let i = 2023; i >= 2023 - 80; i--) {
      years = [...years, i];
    }
    setMonths(months);
    setYears(years);
  }, []);

  useEffect(() => {
    var n = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (byear % 4 === 0) n[2] = 29;
    let days = [];
    for (let i = 1; i <= n[bmonth]; i++) {
      days = [...days, i];
    }
    setDays(days);
  }, [bmonth, byear]);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label>Tên:</label>
      <input
        className="input-text-field"
        type="text"
        name="name"
        placeholder="Tên"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />
      <label>Số điện thoại:</label>
      <input
        className="input-text-field"
        type="tel"
        name="tel"
        placeholder="Số điện thoại"
        value={tel}
        onChange={(e) => {
          setTel(e.target.value);
        }}
        required
      />
      <label>Emai:</label>
      <input
        className="input-text-field"
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <label>Mật khẩu:</label>
      <input
        className="input-text-field"
        type="password"
        name="pass"
        autoComplete="off"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <label>Ngày sinh:</label>
      <div className="dob-container">
        <select
          name="day"
          className="bday"
          value={bday}
          onChange={(e) => {
            setBday(e.target.value);
          }}
          required
        >
          <option value="" key={"Ngày"}>
            Ngày
          </option>
          {days.map((day) => (
            <option value={day} key={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="month"
          className="bmonth"
          value={bmonth}
          onChange={(e) => {
            setBmonth(e.target.value);
          }}
          required
        >
          <option value="" key={"Tháng"}>
            Tháng
          </option>
          {months.map((month) => (
            <option value={month} key={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="year"
          className="byear"
          value={byear}
          onChange={(e) => {
            setByear(e.target.value);
          }}
          required
        >
          <option value="" key={"Năm"}>
            Năm
          </option>
          {years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <label>Giới tính:</label>
      <input
        className="input-radio"
        type="radio"
        name="gender"
        onChange={(e) => setGender("male")}
        defaultChecked
      />
      Nam
      <input
        className="input-radio"
        type="radio"
        name="gender"
        onChange={(e) => setGender("female")}
      />
      Nữ
      <div className="captcha-container">
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={() => {
            setCaptcha(!captcha);
          }}
        />
      </div>
      <input className="input-submit" type="submit" value="ĐĂNG KÝ" />
      {err !== 0 && <p className="err-msg">{errMsg[err]}</p>}
    </form>
  );
};

export default RegisterForm;
