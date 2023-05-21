import React, { useContext } from "react";
import "./ProfileDetail.css";

import { Context } from "../../context/UserContext";

const ProfileDetail = () => {
  const { userProfile, handleUserDOB } = useContext(Context);

  // if (Object.keys(userProfile).length !== 0) {
  //   console.log(userProfile);
  // }

  return (
    <div className="profile-detail-container">
      <h4 className="profile-detail-title">HỒ SƠ CỦA TÔI</h4>
      <p className="profile-detail-subtitle">
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>
      {Object.keys(userProfile).length !== 0 && (
        <div className="profile-detail-content">
          <p>Họ tên: {userProfile.name}</p>
          <p>Ngày sinh: {handleUserDOB(userProfile?.dob)}</p>
          <p>Địa chỉ email: {userProfile.email}</p>
          <p>Số điện thoại: {userProfile.phone}</p>
          <p>Giới tính: {userProfile.gender === "male" ? "Nam" : "Nữ"}</p>
          <p>
            Quyền truy cập: {userProfile.is_staff ? "Nhân viên" : "Người dùng"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
