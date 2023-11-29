import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import gilasWhite from "../assets/images/gilas-white.png";

export const action = async ({request}) => {
  try {
    const formData = Object.fromEntries(await request.formData())
    await customFetch.post("/auth/register", formData)
    toast.success("Account created successfully")
    return redirect("/login")
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg || "Please double check your credentials")
    return error
  }
}

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <img src={gilasWhite} alt="register-img"/>
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a user?{" "}
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
