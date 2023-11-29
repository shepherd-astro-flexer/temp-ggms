import { SEX } from "../../../utils/constants";
import { Form, redirect, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import SubmitBtn from "./SubmitBtn";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import DateInput from "./DateInput";

export const action = async ({params, request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    // ! we are going for the patch request because that is what the server is requesting 
    await customFetch.patch(`/clients/${params.id}`, data);
    toast.success("Edited client successfully");
    return redirect("/all-clients");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg || "something went wrong");
    return error
  }
}

const FormClient = ({title}) => {
  const {name, lastName, email, sex, birthdate} = useLoaderData();
  console.log(birthdate);
  return (
    <Form method="POST" className="bg-base-200 p-8 rounded-md">
      <h1 className="capitalize text-md mb-2 md:text-xl lg:text-2xl xl:text-3xl">{title}</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <FormInput label="name" name="name" size="input-sm" defaultValue={name}/>
        <FormInput label="last name" name="lastName" size="input-sm" defaultValue={lastName}/>
        <FormInput label="email" name="email" size="input-sm" type="email" defaultValue={email}/>
        <DateInput defaultValue={birthdate}/>
        <FormSelect optionsArray={Object.values(SEX)} option="sex" searchObj={sex}/>
        <div className="flex items-end mt-4">
          <SubmitBtn text="submit" size="btn-sm"/>
        </div>
      </div>
    </Form>
  )
}
export default FormClient