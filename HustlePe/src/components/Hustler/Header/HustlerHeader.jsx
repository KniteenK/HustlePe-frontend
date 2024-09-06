import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import Cookies from 'js-cookie';
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function HustlerHeader() {
  const userData = JSON.parse(Cookies.get('userData') || '{}');
  useEffect(() => {
    console.log('User Data:', userData);
    console.log('Response data:', JSON.stringify(userData, null, 2)); // Print the response data
  }, []);
  const username = userData.data?.user?.username || 'Hustler';
  const firstName = userData.data?.user?.first_name || 'Tony';
  const lastName = userData.data?.user?.last_name || 'Reichert';
  const fullName = `${firstName} ${lastName}`;
  const avatar = userData.data?.user?.avatar || ''; 
  // console.log(name);
  console.log(username);
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
              <DropdownItem key="settings" as={NavLink} to="/hustler/ProfileSettings">
                My Settings
              </DropdownItem>
              
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </header>
  );
}
