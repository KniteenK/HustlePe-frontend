import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import Cookies from 'js-cookie';
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
export default function HustlerHeader() {
  let userData = {};
  const userDataCookie = Cookies.get('userData');

  if (userDataCookie) {
    try {
      userData = JSON.parse(userDataCookie);
    } catch (error) {
      console.error("Failed to parse userData cookie:", error);
    }
  }
  console.log('User Data:', userData);
  const navigate = useNavigate();
  const handleLogout = () => {

    navigate('/');
  };
  useEffect(() => {
    console.log('User Data:', userData);
    console.log('Response data:', JSON.stringify(userData, null, 2)); // Print the response data
    console.log('Hustler Header');
  }, []);
  const username = userData.username || 'Hustler';
  const firstName = userData.first_name || 'Tony';
  const lastName = userData.last_name || 'Reichert';
  const fullName = `${firstName} ${lastName}`;
  const avatar = userData.avatar || ''; 
  // console.log(name);
  console.log(username);
  return (
    <header className="shadow sticky z-50 top-0">
      <Navbar>
        <NavbarContent>
          <NavbarItem>
            <NavLink to="/hustler/FindWork" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Find Work
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/hustler/Organizations" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Organizations
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/hustler/Resources" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Resources
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
                  src: {avatar},
                }}
                className="transition-transform"
                description={`@${username}`}
                name={fullName}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@{username}</p>
              </DropdownItem>
              <DropdownItem key="settings" as={NavLink} to="/hustler/ProfileSettings/profile">
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
