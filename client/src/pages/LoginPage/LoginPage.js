import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FormContainer from "../../components/FormContainer/FormContainer";

const LoginPage = () => {
  useEffect(() => {
    document.title = "CGV Cinemas Fake | Đăng Nhập";
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem("user");
    if (logged != null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <FormContainer option="Login" />
    </div>
  );
};

export default LoginPage;
