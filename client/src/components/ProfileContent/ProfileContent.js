import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileContent.css";
import { Context } from "../../context/UserContext";

import ProfileNavigation from "../ProfileNavigation/ProfileNavigation";
import ProfileDetail from "../ProfileDetail/ProfileDetail";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileChangePassword from "../ProfileChangePassword/ProfileChangePassword";
import ProfileBookingHistory from "../ProfileBookingHistory/ProfileBookingHistory";

const ProfileContent = () => {
  const { getUserProfile, navigateUrl, handleChangeProfileNav } =
    useContext(Context);

  const navigate = useNavigate();

  // const [navigateUrl, setNavigateUrl] = useState("detail");

  // const handleChangeProfileNav = (url) => {
  //   setNavigateUrl(url);
  // };

  const handleGetUserProfile = async () => {
    try {
      const rs = await getUserProfile();
      if (rs?.status === 200) {
        console.log("Get user profile successfully");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // API: Get /user/profile/id?=
  useEffect(() => {
    handleGetUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="profile-content-container">
      <div className="profile-left">
        <ProfileNavigation handleChangeProfileNav={handleChangeProfileNav} />
      </div>
      <div className="profile-right">
        {navigateUrl === "detail" && <ProfileDetail />}
        {navigateUrl === "edit" && <ProfileEdit />}
        {navigateUrl === "changepassword" && <ProfileChangePassword />}
        {navigateUrl === "bookinghistory" && <ProfileBookingHistory />}
      </div>
    </div>
  );
};

export default ProfileContent;
