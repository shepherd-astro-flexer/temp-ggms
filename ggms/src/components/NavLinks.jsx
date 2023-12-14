import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
// local
import { toggleSidebar } from "../features/user/userSlice";
// icons
import {MdPersonAddAlt1} from "react-icons/md";
import {MdPersonSearch} from "react-icons/md";
import {MdAdminPanelSettings} from "react-icons/md"
import {ImProfile} from "react-icons/im";
import { FaUserCheck } from "react-icons/fa6";

const links = [
  { id: nanoid(6), path: "/dashboard", text: "add client", icon: <MdPersonAddAlt1 className="h-6 w-6"/>},
  { id: nanoid(6), path: "/dashboard/all-clients", text: "all clients", icon: <MdPersonSearch className="h-6 w-6"/>},
  { id: nanoid(6), path: "/dashboard/attendance", text: "attendance", icon: <FaUserCheck className="h-5 w-5"/>},
  { id: nanoid(6), path: "/dashboard/profile", text: "profile", icon: <ImProfile className="h-6 w-6"/>},
  { id: nanoid(6), path: "/dashboard/admin", text: "admin", icon: <MdAdminPanelSettings className="h-6 w-6"/>}
];

const NavLinks = ({big}) => {
  const dispatch = useDispatch()
  const role = useSelector((store) => store?.user?.user?.role)
  
  const {pathname} = useLocation()
  const {isSidebarOpen} = useSelector(store => store.user)
 
  return (
    <>
      {links.map((link) => {
        const { id, path, text, icon } = link;

        if (role !== "admin" && text === "admin") {
          return
        }

        return (
          <li key={id} className="whitespace-nowrap">
            <NavLink className={` flex gap-x-4 items-center capitalize w-full ${big && "pl-10"} py-3 duration-300 ease-in-out hover:text-primary ${isSidebarOpen && big && "hover:pl-12"} ${pathname === path && "text-primary"}`} to={path} onClick={() => {
              if (!big) {
                dispatch(toggleSidebar())
              }
            }}>
              {icon}
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
