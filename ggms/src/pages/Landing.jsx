// import { Featured, Hero } from "../components"
import {redirect} from "react-router-dom"
import {customFetch} from "../utils"
import { toast } from "react-toastify"
import FormClient from "../components/FormClient"

export const action = async ({request}) => {
  const formData = Object.fromEntries(await request.formData());
  console.log(formData);
  
  try {
    await customFetch.post("/clients/add-client", formData)
    toast.success("Client added successfully");
    return redirect("/all-clients");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Error occured")
    return error;
  }
}

const Landing = () => {
  return (
    <>
      <FormClient title="add client"/>
    </>
  )
}

export default Landing