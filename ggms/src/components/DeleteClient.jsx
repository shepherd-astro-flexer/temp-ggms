import { redirect } from "react-router-dom"
import { customFetch } from "../utils"
import { toast } from "react-toastify"

export const action = async ({params}) => {
    try {
        await customFetch.delete(`/clients/${params.id}`)
        toast.success("Client deleted successfully")
    } catch (error) {
        toast.error(error?.response?.data?.msg)
    }

    return redirect("/all-clients")
}

