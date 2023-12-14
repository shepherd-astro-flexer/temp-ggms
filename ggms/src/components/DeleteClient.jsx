import { redirect } from "react-router-dom"
import { customFetch } from "../utils"
import { toast } from "react-toastify"

export const action = (queryClient) => async ({params}) => {
    try {
        await customFetch.delete(`/clients/${params.id}`);
        queryClient.invalidateQueries(["clients"]);
        toast.success("Client deleted successfully");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }

    return redirect("/dashboard/all-clients");
}

