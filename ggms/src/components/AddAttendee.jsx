import { toast } from "react-toastify";
import { currentDate, customFetch } from "../utils";
import { redirect } from "react-router-dom";

export const action = (queryClient) => async ({request}) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams)
  
  // const urlSearchParams = new URLSearchParams(request.url);
  // console.log(urlSearchParams);
  data.createdDate = searchParams.createdDate || currentDate();
 try {
  const {data: client} = await customFetch.post("/attendance/", data);
  queryClient.invalidateQueries(["attendance"])
  const clientName = client.name.charAt(0).toUpperCase() + client.name.slice(1);
  toast.success(`Successfully added ${clientName} on the list`);
  return redirect(`/dashboard/attendance${url.search}`)
 } catch (error) {
  toast.error(error?.response?.data?.msg || "something went wrong")
  return error
 }
}
