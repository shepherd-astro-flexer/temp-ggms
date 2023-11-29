import { Form, redirect } from "react-router-dom"
import SubmitBtn from "./SubmitBtn";
import FormInput from "./FormInput";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const action = (store, queryClient) => async ({request}) => {
  const {fname, address} = Object.fromEntries(await request.formData())
  const {cartItems, prices} = store.getState().cart
  const {user} = store.getState().user
  // ! change na lang natin siguro yung name ng properties before sending the request
  const obj = {
    data: {
      address,
      cartItems,
      chargeTotal: prices.orderTotal,
      name: fname,
      numItemsInCart: prices.amount,
      orderTotal: formatPrice(prices.orderTotal)
    }
  }

  try {
    const response = await customFetch.post("/orders", obj, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    queryClient.removeQueries(["orders"])
    
    console.log(response);
    store.dispatch(clearCart())
    toast.success("Order placed successfully")
    return redirect("/orders")
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error.message)

    if (error.response.status === 401 || 403) {
      return redirect("/login")
    }

    return error
  }
}

const ShippingInfo = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
        <p className="text-xl font-semibold capitalize">shipping information</p>
        <FormInput label="first name" name="fname" type="text" />
        <FormInput label="address" name="address" type="text" />
        <div className="mt-4">
          <SubmitBtn text="place your order"/>
        </div>
    </Form>
  )
}
export default ShippingInfo
