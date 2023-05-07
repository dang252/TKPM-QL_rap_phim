import React, { useEffect } from "react";

import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Navbar from "../../components/Navbar/Navbar";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const LoginPage = () => {
  useEffect(() => {
    document.title = "CGV Cinemas Fake | Đăng Nhập";
  }, []);

  return (
    <div>
      <UserNavbar />
      <Navbar />
      <MobileNavbar />
      <h1 style={{ marginTop: "300px" }}>Login page</h1>
    </div>
  );
};

export default LoginPage;
