import { FaDumbbell } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import NavLinks from "./NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";
// ! CONFIGURE small sidebar functionality 
// ! closing functionality of modal
const SmallSidebar = () => {
    const {isSidebarOpen} = useSelector(store => store.user)
    const dispatch = useDispatch()

  return (
    <div className={`bg-base-300 fixed w-full top-0 bottom-0 duration-300 opacity-0 -z-10 p-6 lg:hidden ${!isSidebarOpen && "opacity-100 z-20"}`}>
      <div className="bg-base-200 rounded-md h-full">
        <button className="btn btn-ghost btn-circle m-2" onClick={() => dispatch(toggleSidebar())}>
          <IoClose className="text-4xl text-error" />
        </button>
        <div className="flex flex-col gap-6 items-center">
            <div className="flex items-center px-20 mt-4">
                <div className="bg-primary p-3.5 rounded-xl">
                    <FaDumbbell className="h-7 w-7"/>
                </div>
                <p className="text-2xl text-primary font-bold capitalize ml-4 tracking-widest">
                    gilas
                </p>
            </div>
            <ul>
              <NavLinks />
            </ul>
        </div>
      </div>
    </div>
  );
};
export default SmallSidebar;
