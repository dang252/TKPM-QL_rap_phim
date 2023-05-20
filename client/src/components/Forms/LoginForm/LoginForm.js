import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast } from "react-toastify";

import "../Form.css";

export const errMsg = {
  1: "Email/Số điện thoại đang trống!",
  2: "Password đang trống!",
  3: "Capcha Không hợp lệ.",
  4: "Email/Số điện thoại hoặc mật khẩu không đúng!",
  5: "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!",
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [err, setErr] = useState(0);
  let navigate = useNavigate();

  const checkInput = () => {
    if (username === "") {
      setErr(1);
      return false;
    } else if (password === "") {
      setErr(2);
      return false;
    } else if (!captcha) {
      setErr(3);
      return false;
    }
    setErr(0);
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInput()) {
      // const id = toast.loading("Please wait...")
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        //success: status 200:
        // toast.update(id, {render: "All is good", type: "success", isLoading: false});
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        toast.success("Đăng nhập thành công!");
        navigate("/");
        window.location.reload();
      } catch (error) {
        // toast.update(id, {render: "Something went wrong", type: "error", isLoading: false });
        if (error.response) {
          // err 404 -> sai email/sdt hoac password.
          if (error.response.status === 404) {
            setErr(4);
          }
          // err 500: chua biet nen chua set
        } else if (error.request) {
          setErr(5);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  };

  return (
    <form className="form">
      <label>Email hoặc số điện thoại:</label>
      <input
        className="input-text-field"
        type="text"
        name="user"
        placeholder="Email hoặc số điện thoại"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
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
      <div className="captcha-container">
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={() => {
            setCaptcha(!captcha);
          }}
        />
      </div>
      <input
        className="input-submit"
        type="submit"
        value="ĐĂNG NHẬP"
        onClick={(e) => {
          handleSubmit(e);
        }}
      />
      {err !== 0 && <p className="err-msg">{errMsg[err]}</p>}
      <a href="/">Bạn muốn tìm lại mật khẩu?</a>
    </form>
  );
};
export default LoginForm;
