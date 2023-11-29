import { useSelector } from "react-redux";
import { SectionTitle, CartsContainer} from "../components";

const Cart = () => {
  const {cartItems} = useSelector((store) => store.cart)
 
  if (cartItems.length < 1) {
    return <div>
      <SectionTitle text="your cart is empty"/>
    </div>
  }

  return (
    <div>
      <SectionTitle text="shopping cart"/>
      <CartsContainer />
    </div>
  )
}
export default Cart