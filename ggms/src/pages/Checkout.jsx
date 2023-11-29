import { useSelector } from "react-redux"
import { redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { SectionTitle, ShippingContent } from "../components"

export const loader = (store) => async () => {
  const getState= store.getState()
  const user = getState.user.user
  if (!user) {
    toast.warn("You must be logged in to checkout")
    return redirect("/login")
  }
  return null
}

const Checkout = () => {
  const cartItems = useSelector(store => store.cart.cartItems)
  
  if (cartItems.length < 1) {
    return <div>
      <SectionTitle text={"your cart is empty"} />
    </div>
  }

  return (
    <div>
      <SectionTitle text={"Place your order"}/>
      <ShippingContent />
    </div>
  )
}
export default Checkout