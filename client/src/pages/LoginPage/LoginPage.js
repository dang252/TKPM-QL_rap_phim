import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Navbar from "../../components/Navbar/Navbar";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import FormContainer from "../../components/FormContainer/FormContainer"
import MyFooter from "../../components/MyFooter/MyFooter"

const LoginPage = () => {
  useEffect(() => {
    document.title = "CGV Cinemas Fake | Đăng Nhập";
  }, []);
  let navigate = useNavigate()
  useEffect(() => {
    const logged = (localStorage.getItem('user'))
    if (logged != null) {
        navigate("/")
    }
  },[]);

  return (
    <div>
      <UserNavbar />
      <Navbar />
      <MobileNavbar />
      <FormContainer option="Login"/>
      <MyFooter/>
    </div>
  );
};

export default LoginPage;
