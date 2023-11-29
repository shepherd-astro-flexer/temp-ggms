import { Outlet, useNavigation, redirect} from "react-router-dom";
import { Navbar, Header, Loading, BigSidebar, SmallSidebar } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalAmount } from "../features/cart/cartSlice";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { getCurrentUser } from "../features/user/userSlice";

export const loader = (store) => async () => {
  try {
    const {data} = await customFetch.get("/users/current-user");
    // const data = await queryClient.ensureQueryData(fetchFeaturedQuery());
    store.dispatch(getCurrentUser(data));
    return data;
  } catch (error) {
    toast.warn("You must be logged in")
    return redirect("/login");
  }
}

const HomeLayout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = navigation.state === "loading";
  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(updateTotalAmount());
  }, [cartItems]);

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
            <Outlet />
          </section>
        )}
      </div>
    </div>
  );
};
export default HomeLayout;
