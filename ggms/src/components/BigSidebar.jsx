import { FaDumbbell } from "react-icons/fa6";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import { useLoaderData } from "react-router-dom";

const BigSidebar = () => {
  const {isSidebarOpen} = useSelector(store => store.user);
  const {pathname, search} = useLocation();
  console.log(pathname)
  return (
    <div className={`${pathname === "/dashboard" || pathname === "/dashboard/profile" || pathname.includes("/dashboard/stats") || pathname.includes("/dashboard/edit-client") ? "h-screen" : null} bg-base-200 duration-300 hidden lg:flex flex-col ${isSidebarOpen ? "ml-0" : "-ml-64"}`}>
        <div className="h-10 bg-neutral"></div>
        <div className="flex items-center pl-10 pr-20 mt-4">
          <div className="bg-primary p-3.5 rounded-xl">
            <FaDumbbell className="h-7 w-7"/>
          </div>
          <p className="text-2xl text-primary font-bold capitalize ml-4 tracking-widest">gilas</p>
        </div>
        <ul className="mt-12">
          <NavLinks big/>
        </ul>
    </div>
  );
};
export default BigSidebar;

