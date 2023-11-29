import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { redirect } from "react-router-dom";
import { EditFormClient } from "../components";

export const loader = async ({params}) => {
  try {
    const {data} = await customFetch.get(`/clients/${params.id}`);
   
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "something went wrong");
    return redirect("/all-clients");
  }
}

const EditClient = () => {
  return (
    <>
      <EditFormClient title="edit client"/>
    </>
  )
}
export default EditClient