import { Outlet, useNavigation, redirect} from "react-router-dom";
import { Navbar, Header, Loading, BigSidebar, SmallSidebar } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalAmount } from "../features/cart/cartSlice";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { getCurrentUser } from "../features/user/userSlice";
import { nanoid } from "nanoid";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const {data} = await customFetch.get("/users/current-user");
    return data;
  }
}

export const loader = (store, queryClient) => async () => {
  // ! make sure that you passed in the queryClient on the  and you defined the parameter
  try {
    const data = await queryClient.ensureQueryData(userQuery);
    // queryClient.invalidateQueries();
    // store.dispatch(getCurrentUser(data));
    
    return data;
  } catch (error) {
    toast.warn("You must be logged in");
    return redirect("/login");
  }
}

const HomeLayout = () => {
  const navigation = useNavigation();
  const {data} = useQuery(userQuery);
  
  const isLoading = navigation.state === "loading";
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCurrentUser(data));
  }, [data]);

  return (
    <div className="flex">
      <BigSidebar/>
      <SmallSidebar/>
      <div className="w-full">
        <Header />
        <Navbar />
        {isLoading ? (
          <Loading />
        ) : (
          <section className="align-element py-20 h-screen">
            <Outlet context={data}/>
          </section>
        )}
      </div>
    </div>
  );
};
export default HomeLayout;
