import { Button, Input, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, ChevronDown, Flash, Lock, Scale, Server, TagUser } from "../../../assets/Icons.jsx";
function GuestHeader() {
  const navigate = useNavigate();
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };
  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
  };
  const handleSignupClick = () => {
    navigate('/Intermediate'); // Redirect to the register page
  };

  return (
    <header className=" sticky z-50 top-0 mb-3">
      <Navbar>  
        
        <NavbarContent className="hidden sm:flex gap-4 mt-3" justify="center">
          {/* <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Features
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
                startContent={icons.scale}
              >
                <NavLink to="/autoscaling" className={({ isActive }) =>
                  `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
                }>
                  Autoscaling
                </NavLink>
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                startContent={icons.activity}
              >
                <NavLink to="/usage_metrics" className={({ isActive }) =>
                  `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
                }>
                  Usage Metrics
                </NavLink>
              </DropdownItem>
              <DropdownItem
                key="production_ready"
                description="ACME runs on ACME, join us and others serving requests at web scale."
                startContent={icons.flash}
              >
                <NavLink to="/production_ready" className={({ isActive }) =>
                  `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
                }>
                  Production Ready
                </NavLink>
              </DropdownItem>
              <DropdownItem
                key="99_uptime"
                description="Applications stay on the grid with high availability and high uptime guarantees."
                startContent={icons.server}
              >
                <NavLink to="/99_uptime" className={({ isActive }) =>
                  `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
                }>
                  +99% Uptime
                </NavLink>
              </DropdownItem>
              <DropdownItem
                key="supreme_support"
                description="Overcome any challenge with a supporting team ready to respond."
                startContent={icons.user}
              >
                <NavLink to="/supreme_support" className={({ isActive }) =>
                  `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
                }>
                  +Supreme Support
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <NavbarItem>
            <NavLink to="/knowHustler" className={({ isActive }) =>
              `border-b  lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Know about Hustlers
            </NavLink>
          </NavbarItem>
          
          <NavbarItem>
            <NavLink to="/knowOrganisations" className={({ isActive }) =>
              `border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 ${isActive ? "text-orange-700" : "text-gray-700"}`
            }>
              Know about Organisations
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end " className="items-center mt-3">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            // startContent={<SearchIcon size={18} />}
            type="search"
          />
          <NavbarItem className="hidden lg:flex">
          <Button onClick={handleLoginClick}>
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
          <Button onClick={handleSignupClick}>
              SignUp
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  );
}

export default GuestHeader;