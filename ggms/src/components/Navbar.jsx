import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";
import {FaDumbbell} from "react-icons/fa6";
import ouch from "../assets/images/ouch-w.png"
import { toggleSidebar } from "../features/user/userSlice";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const dispatch = useDispatch();
  const {userQuery} = useLoaderData();
  const {data} = useQuery(userQuery);
  
  const handleTheme = () => {
    dispatch(toggleTheme())
  };

  return (
    <nav className="bg-base-200 duration-300">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* DROPDOWN */}
          <div className="dropdown">
            <button className="btn btn-ghost" onClick={() => dispatch(toggleSidebar())}>
              <FaBarsStaggered className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="navbar-center">
          <div className="flex items-center lg:hidden">
            <div className="bg-primary p-1.5 rounded-md">
              <FaDumbbell className="h-5 w-5"/>
            </div>
            <p className="text-md text-primary font-bold capitalize ml-2 tracking-widest">gilas</p>
          </div>
          <p className="hidden text-2xl tracking-wider lg:block xl:text-3xl">Dashboard</p>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/* sun icon */}
            <BsSunFill className="swap-on h-4 w-4" />
            {/* moon icon */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {data?.avatar ? <div className="avatar">
            <div className="w-8 rounded-full">
              <img src={data.avatar} alt="avatar" />
            </div>
          </div> : <img src={ouch} className="h-8 w-8"/>}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
