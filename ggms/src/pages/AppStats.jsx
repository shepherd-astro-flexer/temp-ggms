import { redirect } from "react-router-dom";
import { customFetch } from "../utils"
import { toast } from "react-toastify";
// ! continue
// * add a new action where we check the role
export const loader = async () => {
    try {
        const {data} = await customFetch.get("/users/admin/app-stats");
        console.log(data);
        return null
    } catch (error) {
        console.log(error?.response?.data?.msg);
        toast.error("You are not authorized to view this page");
        return redirect("/")
    }
}

const AppStats = () => {
  return (
    <div>AppStats</div>
  )
}
export default AppStats