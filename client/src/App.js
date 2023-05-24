import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { Context } from "./context/UserContext";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Home from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
// import LogoutPage from "./pages/LogoutPage/LogoutPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import AppContext from "./components/AppContext/AppContext";

import UserNavbar from "./components/UserNavbar/UserNavbar";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import MyFooter from "./components/MyFooter/MyFooter";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviesList from "./components/MoviesList/MoviesList";

const App = () => {
  return (
    <div className="main-app">
      <AppContext>
        <UserNavbar />
        <Navbar />
        <MobileNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/logout" element={<LogoutPage />} /> */}
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/movies" element={<MoviesPage />}>
            <Route
              path="currently-showing"
              element={<MoviesList path="currently-showing" />}
            />
            <Route
              path="coming-soon"
              element={<MoviesList path="coming-soon" />}
            />
          </Route>
          <Route path="/movies/detail" element={<DetailPage />} />
        </Routes>
        <MyFooter />
      </AppContext>
      <ToastContainer position="bottom-left" autoClose={5000} closeOnClick />
    </div>
  );
};

export default App;
