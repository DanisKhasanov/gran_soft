import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t("navigation.profile")}</h1>
      <div className="text-center">
        <p className="text-gray-600 text-lg">{t("pages.profileData")}</p>
      </div>
    </div>
  );
};

export default Profile;
