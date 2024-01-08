import { Outlet, useNavigation, redirect} from "react-router-dom";
import { Navbar, Header, Loading, BigSidebar, SmallSidebar, TestBigSidebar } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { store } from "../store";
import {useQuery} from "@tanstack/react-query";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";


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
    await queryClient.ensureQueryData(userQuery);
    // queryClient.invalidateQueries();
    // store.dispatch(getCurrentUser(data));
    return {userQuery};
  } catch (error) {
    toast.warn("You must be logged in");
    return redirect("/login");
  }
}

const HomeLayout = () => {
  const navigation = useNavigation();
  const {data} = useQuery(userQuery);
  const isLoading = navigation.state === "loading";

  // const isTrue = pathname === "/dashboard/attendance" || pathname === "/dashboard/all-clients"
  // const dispatch = useDispatch();
  // useEffect(() => {
    //   dispatch(getCurrentUser(data));
    // }, [data]);
    
    // console.log(data);
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
          <section className="align-element py-20">
            <Outlet context={data}/>
          </section>
        )}
      </div>
    </div>
  );
};
export default HomeLayout;
