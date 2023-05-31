import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../../context/UserContext";

import FormContainer from "../../components/FormContainer/FormContainer";

const LoginPage = () => {
  const { closeModal } = useContext(Context);

  useEffect(() => {
    document.title = "CGV Cinemas Fake | Đăng Nhập";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    closeModal();
  }, [closeModal]);

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
