import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { redirect } from "react-router-dom";
import { EditFormClient } from "../components";
import {useQuery} from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";

const editClientQuery = (params) => {
  return {
    queryKey: ["clients", params.id],
    queryFn: async () => {
      const {data} = await customFetch.get(`/clients/${params.id}`);
      return data;
    }
  }
}

export const loader = (queryClient) => async ({params}) => {
  try {
    await queryClient.ensureQueryData(editClientQuery(params));
    return params;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "something went wrong");
    return redirect("/all-clients");
  }
}

const EditClient = () => {
  const params = useLoaderData();
  const {data} = useQuery(editClientQuery(params))

  return (
    <>
      <EditFormClient title="edit client" data={data}/>
    </>
  )
}
export default EditClient