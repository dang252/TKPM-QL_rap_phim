import React, { useEffect } from "react";

import ProfileContent from "../../components/ProfileContent/ProfileContent";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "CGV Cinemas Fake | Hồ sơ cá nhân";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProfileContent />
    </div>
  );
};

export default ProfilePage;
