import { toast } from "react-toastify"
import { OrdersContent, OrdersPagination, SectionTitle } from "../components"
import { customFetch } from "../utils"
import { redirect } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

const fetchOrderQuery = (pageNum, token) => {
  return {
    queryKey: ["orders", pageNum + token],
    queryFn: async () => {
      try {
        const {data: {data, meta}} = await customFetch("/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            page: pageNum
          }
        })
        
        return {data, meta}
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error.message)

        if (error.response.status === 401 || 403) {
          return redirect("/login")
        }

        return error
      }
    }
  }
}

export const loader = (store, queryClient) => async ({request}) => {
  const {user} = store.getState().user
  if (!user) {
    toast.warn("You must be logged in to view orders")
    return redirect("/login")
  }
  
  const pageNum = Object.fromEntries(new URL(request.url).searchParams).page
 
  const {data, meta} = await queryClient.ensureQueryData(fetchOrderQuery(!pageNum ? 1 : pageNum, user.token))
  
  return {token: user.token, pageNum: !pageNum ? 1 : pageNum, data, meta}
}

const Orders = () => {
  return (
    <div>
      <SectionTitle text="Your Orders" />
      <OrdersContent/>
      <OrdersPagination/>
    </div>
  )
}
export default Orders