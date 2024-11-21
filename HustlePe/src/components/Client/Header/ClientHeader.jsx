import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import Cookies from 'js-cookie';
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ClientHeader() {
  let userData = {};
  const userDataCookie = Cookies.get('userData');

  if (userDataCookie) {
    try {
      userData = JSON.parse(userDataCookie);
    } catch (error) {
      console.error("Failed to parse userData cookie:", error);
    }
  }
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove('userData'); // Remove user data from cookies
    Cookies.remove('accessToken'); // Remove access token from cookies
    Cookies.remove('refreshToken'); // Remove refresh token from cookies
    navigate('/');
  };

  useEffect(() => {
    console.log('User Data:', userData);
    console.log('Client Header');
    console.log('Response data:', JSON.stringify(userData, null, 2)); // Print the response data
  }, [userData]);

  const username = userData.username || 'Client name';
  const organisation = userData.organisation || 'Organisation name';
  const avatar = userData.avatar || 'https://i.pravatar.cc/150?u=a042581f4e29026024d';

  return (
    <header className="shadow sticky z-50 top-0">
      <Navbar>
        <NavbarContent>
          <NavbarItem>
            <NavLink to="/client/JobPosting" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Job Posting
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/client/Messages" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Messages
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="ml-auto"> {/* This will push the profile dropdown to the right */}
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: avatar,
                }}
                className="transition-transform"
                description={`@${organisation}`}
                name={username}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@{username}</p>
              </DropdownItem>
              <DropdownItem key="settings" as={NavLink} to="/client/ProfileSettings/profile">
                My Settings
              </DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </header>
  );
}