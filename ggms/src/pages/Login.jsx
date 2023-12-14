import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, LoginButton, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import gilasWhite from "../assets/images/gilas-white.png";
import {FiLogIn} from "react-icons/fi"; 

// const loginQuery = (postData) => {
//   return {
//     queryKey: ["login"],
//     queryFn: async () => {
//       const {data} = await customFetch.post("/auth/login", postData);
//       return data;
//     }
//   }
// }

export const action = (store, queryClient) => async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    queryClient.invalidateQueries();
    toast.success("Logged in successfully")
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "test login")
    return error
  }
}

const Login = () => {
  const navigate = useNavigate();

  const loginGuestUser = async () => {
    const data = {
      email: "gilas_gym@test.com",
      password: "gilas123"
    }
    // setup
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive.")
      navigate("/dashboard");
    } catch (error) {
      toast.error("Guest user problem. Please try again later.")
    }

  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <img src={gilasWhite} alt="login-img" className=""/>
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="email"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
        />
        <div className="mt4">
          <SubmitBtn text="login" icon={<FiLogIn/>}/>
        </div>
        
          {/* <LoginButton /> */}
          {/* <button className="btn btn-block btn-primary" type="button">login using auth 0</button> */}
        
        {/* <button onClick={loginGuestUser} type="button" className="btn btn-secondary btn-block">
          guest user
        </button> */}
        <p className="text-center">
          Not a user yet?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
      
    </section>
  );
};
export default Login;
