import React from "react";

const TopBar = () => {
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  localStorage.removeItem('email');

  
  window.location.href = '/';
  };
  return (
    <div className="bg-white shadow-md flex items-center justify-between px-6 py-3">
      <div className="text-xl font-semibold text-gray-800">Dashboard</div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-800 hover:text-blue-500">Profile</button>
        <button onClick={handleSignOut} className="text-gray-800 hover:text-blue-500">Logout</button>
      </div>
    </div>
  );
};

export default TopBar;
