import {
  Cart,
  Checkout,
  Clients,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
  EditClient,
  AppStats ,
  Profile,
  Attendance
} from "./pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorElement } from "./components";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import {Auth0Provider} from "@auth0/auth0-react"
// loaders
// import { loader as landingLoader } from "./pages/Landing";
import { loader as clientsLoader } from "./pages/Clients";
// ! test
import { loader as homeLoader } from "./pages/HomeLayout";
// !
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
import { loader as editClientLoader } from "./pages/EditClient";
import { loader as appStatsLoader } from "./pages/AppStats";
import { loader as attendanceLoader } from "./pages/Attendance";
// import { loader as profileLoader } from "./pages/Profile";

// actions
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as checkoutAction } from "./components/ShippingInfo";
import { action as landingAction } from "./pages/Landing";
import { action as editFormClientAction } from "./components/EditFormClient";
import { action as deleteClientAction } from "./components/DeleteClient";
import { action as profileAction } from "./pages/Profile";
import { action as attendanceAction } from "./components/AttendanceForm";
// import { action as clientAction} from "./components/ClientCard";

// import { action as productsAction } from "./pages/Products";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    loader: homeLoader(store, queryClient),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        action: landingAction(queryClient),
      },
      {
        path: "all-clients",
        element: <Clients />,
        loader: clientsLoader(queryClient),
        errorElement: <ErrorElement />
        // action: clientAction
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader(queryClient),
        // action: productsAction,
        errorElement: <ErrorElement />
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "orders",
        element: <Orders />,
        errorElement: <ErrorElement/>,
        loader: ordersLoader(store, queryClient)
      },
      {
        path: "checkout",
        element: <Checkout />,
        errorElement: <ErrorElement/>,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient)
      },
      {
        path: "edit-client/:id",
        element: <EditClient />,
        loader: editClientLoader(queryClient),
        action: editFormClientAction(queryClient),
        errorElement: <ErrorElement />
      },
      {
        path: "delete-job/:id",
        action: deleteClientAction(queryClient)
      },
      {
        path: "admin",
        element: <AppStats/>,
        loader: appStatsLoader,
        errorElement: <ErrorElement />
      },
      {
        path: "profile",
        element: <Profile />,
        action: profileAction(queryClient),
        errorElement: <ErrorElement />
      },
      {
        path: "attendance",
        element: <Attendance />,
        loader: attendanceLoader(queryClient),
        action: attendanceAction, 
        errorElement: <ErrorElement/>
      }
    ],
  },
  {
    path: "/login",
    action: loginAction(store, queryClient),
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    action: registerAction,
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <Auth0Provider
    domain="dev-rrhk56w6pey8yvjl.us.auth0.com"
    clientId="CJVAnk6S7dBMJAYgBzZDDdOtmvNOhZDI"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
        <ToastContainer position="top-center"/>
      </QueryClientProvider>
    </Provider>
    </Auth0Provider>
  );
};
export default App;
