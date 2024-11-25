import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ProfileSettingLayout = () => {
  // Define the Menus array
  const Menus = [
    { title: "Profile", src: "profile", path: "profile", gap: false },
    { title: "Gigs", src: "gigs", path: "gigs", gap: false },
    { title: "Exprience and Certifications", src: "Exprience and Certifications", path: "Exprience and Certifications", gap: false },
    { title: "Documents and Social Links", src: "documents-and-social-links", path: "documents-and-social-links", gap: false },
    { title: "Statistics", src: "statistics", path: "statistics", gap: false },

  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 text-black flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-200 ${Menu.gap ? "mt-9" : "mt-2"}`}
            >
              <Link to={Menu.path} className="flex items-center w-full">
                <img src={`/assets/${Menu.src}.svg`} alt={Menu.title} className="w-6 h-6 mr-4" />
                <span>{Menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex flex-col flex-grow p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileSettingLayout;