import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import Cookies from 'js-cookie';
import { BarChart3, Cog, HelpCircle, LogOut, Settings, User as UserIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function HustlerHeader() {
  let userData: any = {};
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
    Cookies.remove('userData');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    navigate('/');
  };

  useEffect(() => {
    console.log('User Data:', userData);
  }, []);

  const username = userData.username || 'Hustler';
  const firstName = userData.first_name || 'Tony';
  const lastName = userData.last_name || 'Reichert';
  const fullName = `${firstName} ${lastName}`;
  const avatar = userData.avatar || '';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-200 shadow-md backdrop-blur-lg">
      <Navbar className="bg-transparent" maxWidth="full">
        <NavbarContent className="gap-8">
          <NavbarItem>
            <NavLink 
              to="/hustler/FindWork" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-100 hover:text-green-700 hover:shadow-md ${
                  isActive 
                    ? "text-green-700 bg-green-100 shadow-sm border-b-2 border-green-600" 
                    : "text-gray-700"
                }`
              }
            >
              Find Work
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink 
              to="/hustler/Organizations" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-100 hover:text-green-700 hover:shadow-md ${
                  isActive 
                    ? "text-green-700 bg-green-100 shadow-sm border-b-2 border-green-600" 
                    : "text-gray-700"
                }`
              }
            >
              Organizations
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink 
              to="/hustler/Resources" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-100 hover:text-green-700 hover:shadow-md ${
                  isActive 
                    ? "text-green-700 bg-green-100 shadow-sm border-b-2 border-green-600" 
                    : "text-gray-700"
                }`
              }
            >
              Resources
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink 
              to="/hustler/Messages" 
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-100 hover:text-green-700 hover:shadow-md ${
                  isActive 
                    ? "text-green-700 bg-green-100 shadow-sm border-b-2 border-green-600" 
                    : "text-gray-700"
                }`
              }
            >
              Messages
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent className="ml-auto">
          <Dropdown 
            placement="bottom-end"
            classNames={{
              base: "before:bg-white",
              content: "bg-white border border-green-200 shadow-xl rounded-xl p-0 min-w-[280px]",
            }}
          >
            <DropdownTrigger>
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=16a34a&color=ffffff`,
                    className: "border-2 border-green-300 hover:border-green-500 transition-colors",
                    size: "md"
                  }}
                  className="transition-transform hover:scale-105"
                  description={
                    <span className="text-green-600 font-medium">@{username}</span>
                  }
                  name={
                    <span className="text-gray-900 font-semibold">{fullName}</span>
                  }
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="User Actions" 
              variant="flat"
              classNames={{
                base: "p-0",
                list: "p-0",
              }}
            >
              <DropdownItem 
                key="profile" 
                className="h-16 gap-3 bg-gradient-to-r from-green-50 to-green-100 rounded-t-xl border-b border-green-200"
                textValue="Profile Info"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Signed in as</p>
                    <p className="font-medium text-green-700">@{username}</p>
                  </div>
                </div>
              </DropdownItem>
              
              <DropdownItem 
                key="settings"
                className="hover:bg-green-50 transition-colors py-3"
                textValue="Settings"
              >
                <NavLink 
                  to="/hustler/ProfileSettings/profile" 
                  className="flex items-center gap-3 text-gray-700 hover:text-green-700 w-full"
                >
                  <Settings className="h-4 w-4" />
                  <span className="font-medium">My Settings</span>
                </NavLink>
              </DropdownItem>
              
              <DropdownItem 
                key="analytics"
                className="hover:bg-green-50 transition-colors py-3"
                textValue="Analytics"
              >
                <div className="flex items-center gap-3 text-gray-700 hover:text-green-700">
                  <BarChart3 className="h-4 w-4" />
                  <span className="font-medium">Analytics</span>
                </div>
              </DropdownItem>
              
              <DropdownItem 
                key="configurations"
                className="hover:bg-green-50 transition-colors py-3"
                textValue="Configurations"
              >
                <div className="flex items-center gap-3 text-gray-700 hover:text-green-700">
                  <Cog className="h-4 w-4" />
                  <span className="font-medium">Configurations</span>
                </div>
              </DropdownItem>
              
              <DropdownItem 
                key="help_and_feedback"
                className="hover:bg-green-50 transition-colors py-3"
                textValue="Help & Feedback"
              >
                <div className="flex items-center gap-3 text-gray-700 hover:text-green-700">
                  <HelpCircle className="h-4 w-4" />
                  <span className="font-medium">Help & Feedback</span>
                </div>
              </DropdownItem>
              
              <DropdownItem 
                key="logout" 
                className="hover:bg-red-50 transition-colors py-3 border-t border-gray-200 rounded-b-xl"
                onClick={handleLogout}
                textValue="Logout"
              >
                <div className="flex items-center gap-3 text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Log Out</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </header>
  );
}
