import { Button, Input, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function GuestHeader() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login page
  };

  const handleSignupClick = () => {
    navigate("/Intermediate"); // Redirect to the register page
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-green-200' 
        : 'bg-gradient-to-r from-white/80 via-green-50/80 to-white/80 backdrop-blur-sm border-b border-green-100/50'
    }`}>
      <Navbar className="bg-transparent">
        <NavbarContent className="hidden sm:flex gap-8 mt-3" justify="center">
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
          <NavbarItem className="transform hover:scale-105 transition-all duration-300">
            <NavLink
              to="/knowHustler"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-100 hover:text-green-700 hover:shadow-md ${
                  isActive 
                    ? "text-green-700 bg-green-100 shadow-sm" 
                    : "text-gray-700"
                }`
              }
            >
              Know about Hustlers
            </NavLink>
          </NavbarItem>

          <NavbarItem className="transform hover:scale-105 transition-all duration-300">
            <NavLink
              to="/knowOrganisations"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-100 hover:text-green-700 hover:shadow-md ${
                  isActive 
                    ? "text-green-700 bg-green-100 shadow-sm" 
                    : "text-gray-700"
                }`
              }
            >
              Know about Organisations
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent justify="end" className="items-center mt-3 gap-4">
          <NavbarItem className="transform hover:scale-105 transition-all duration-300">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[12rem] h-10",
                mainWrapper: "h-full",
                input: "text-small font-medium",
                inputWrapper: `h-full font-normal text-gray-600 border-2 border-green-200 hover:border-green-300 focus-within:border-green-400 shadow-sm hover:shadow-md transition-all duration-300 ${
                  isScrolled ? 'bg-white/90' : 'bg-white/80'
                }`,
              }}
              placeholder="Search..."
              size="sm"
              type="search"
              radius="lg"
            />
          </NavbarItem>
          
          <NavbarItem className="hidden lg:flex transform hover:scale-105 transition-all duration-300">
            <Button 
              onClick={handleLoginClick}
              variant="bordered"
              className="border-2 border-green-600 text-green-600 bg-white/90 hover:bg-green-50 hover:border-green-700 hover:text-green-700 font-medium transition-all duration-300 shadow-sm hover:shadow-md"
              radius="lg"
            >
              Login
            </Button>
          </NavbarItem>
          
          <NavbarItem className="transform hover:scale-105 transition-all duration-300">
            <Button 
              onClick={handleSignupClick}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              radius="lg"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  );
}

export default GuestHeader;
