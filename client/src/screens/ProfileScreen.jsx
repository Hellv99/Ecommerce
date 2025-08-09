import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        User Profile
      </h1>
      {userInfo ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-2xl text-gray-700 mb-2">
            Welcome, {userInfo.name}!
          </p>
          <p className="text-gray-500">Email: {userInfo.email}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Please log in to view your profile.
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
