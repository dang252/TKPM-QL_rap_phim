import React, { useState, useEffect, useContext, createContext} from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Context } from './context/UserContext'

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

import Home from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import AppContext from "./components/AppContext/AppContext";

const App = () => {

  return (
    <div className="main-app">
      <AppContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </AppContext>
      <ToastContainer
          position="bottom-left"
          autoClose={5000}
          closeOnClick
      />
    </div>
  );
};

export default App;
