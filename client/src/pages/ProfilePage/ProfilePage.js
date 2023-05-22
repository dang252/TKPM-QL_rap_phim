import React, { useEffect } from "react";

import ProfileContent from "../../components/ProfileContent/ProfileContent";
import ProfileMobileMenu from "../../components/ProfileMobileMenu/ProfileMobileMenu";

const ProfilePage = () => {
  useEffect(() => {
    document.title = "CGV Cinemas Fake | Hồ sơ cá nhân";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ProfileContent />
      <ProfileMobileMenu />
    </div>
  );
};

export default ProfilePage;
