import React from "react";

import UserNavbar from "../../components/UserNavbar/UserNavbar";
import Navbar from "../../components/Navbar/Navbar";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

const RegisterPage = () => {
  return (
    <div>
      <UserNavbar />
      <Navbar />
      <MobileNavbar />
      <h1 style={{ marginTop: "300px" }}>Register page</h1>
    </div>
  );
};

export default RegisterPage;
