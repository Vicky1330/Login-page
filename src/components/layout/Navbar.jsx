import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { useAuth } from "../../hooks/useAuth";

const CustomNavbar = () => {
  const { logout } = useAuth();
  const handleLogout = async () =>{
    const response = await logout();
    // if(response === 200){
    //   console.log("Logged Out Successfully");
    // } else {
    //   console.log("Error logging out");
    // }
  }
  return (
    <>
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">WEEB</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="/peakpx.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </NavbarContent>
    </Navbar>

        {/* <nav className="">
        <ul className="flex justify-center gap-4 p-2">
            <li>
            <NavLink to="/login">
                <Button color="default" variant="shadow">
                Login
                </Button>
            </NavLink>
            </li>
            <li>
            <NavLink to="/register">
                <Button color="default" variant="shadow">
                Register
                </Button>
            </NavLink>
            </li>
        </ul>
        </nav> */}
    </>
  );
};

export default CustomNavbar;
