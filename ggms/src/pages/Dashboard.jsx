// import { Featured, Hero } from "../components"
import {redirect} from "react-router-dom"
import {customFetch} from "../utils"
import { toast } from "react-toastify"
import FormClient from "../components/FormClient"

export const action = (queryClient) => async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    await customFetch.post("/clients/add-client", data);
    queryClient.invalidateQueries(["clients"]);
    queryClient.invalidateQueries(["attendance"]);

    toast.success("Client added successfully");

    return redirect("/dashboard/all-clients");
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Error occured")
    return error;
  }
}

const Dashboard = () => {
  return (
    <>
      <FormClient title="add client"/>
    </>
  )
}

export default Dashboard