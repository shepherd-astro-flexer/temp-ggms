import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useOutletContext} from "react-router-dom";
import { customFetch } from "../utils";
import { logoutUser } from "../features/user/userSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthError, setisAuthError] = useState(false)
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.user.user);
  const {userQuery} = useLoaderData();
  const {data} = useQuery(userQuery)

  const logout = async() => { 
    navigate("/");
    dispatch(logoutUser());
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
  };
  // * Interceptors
  customFetch.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error?.response?.status === 401) {
      setisAuthError(true);
    }

    return Promise.reject(error);
  })

  useEffect(() => {
    if (!isAuthError) return
    
    logout();
  }, [isAuthError])

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {data ? (
          <div className="flex gap-x-6 justify-center items-center sm:gap-x-8">
            <p className="text-xs sm:text-sm ">Hello, <span className="capitalize font-semibold text-primary">{data.username}</span></p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={logout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;