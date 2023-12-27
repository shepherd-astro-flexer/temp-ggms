import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, GoogleButton, LoginButton, SubmitBtn } from "../components";
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
  // const navigate = useNavigate();

  // const loginGuestUser = async () => {
  //   const data = {
  //     email: "gilas_gym@test.com",
  //     password: "gilas123"
  //   }
  //   // setup
  //   try {
  //     await customFetch.post("/auth/login", data);
  //     toast.success("Take a test drive.")
  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast.error("Guest user problem. Please try again later.")
  //   }

  // }

  return (
    <section className="flex h-screen justify-center items-center gap-12">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <img src={gilasWhite} alt="gilas-img" className="lg:hidden"/>
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
        <div className="flex flex-col w-full border-opacity-50 mt-4">
          <SubmitBtn text="login" icon={<FiLogIn/>} login/>
          <div className="divider text-sm">Or</div>
          <GoogleButton />
        </div>
      </Form>
      <img src={gilasWhite} alt="gilas-img" className="h-96 hidden lg:block"/>
    </section>
  );
};
export default Login;