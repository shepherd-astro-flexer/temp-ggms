import { FaDumbbell } from "react-icons/fa6";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const {isSidebarOpen} = useSelector(store => store.user)
  // !
  return (
    <div className={`bg-base-200 duration-300 hidden lg:block ${isSidebarOpen ? "ml-0" : "-ml-64"}`}>
        <div className="h-10 bg-neutral"></div>
        <div className="flex items-center pl-10 pr-20 mt-4">
            <div className="bg-primary p-3.5 rounded-xl">
              <FaDumbbell className="h-7 w-7 text-secondary-content"/>
            </div>
            <p className="text-2xl text-primary font-bold capitalize ml-4 tracking-widest">gilas</p>
        </div>
        <ul className="mt-12">
            <NavLinks big={true}/>
        </ul>
    </div>
  );
};
export default BigSidebar;
