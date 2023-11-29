import { useState } from "react"
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { optionsArray } from "../utils";
 
const AddToCart = ({id, attributes}) => {
    const { title, company, price, colors, image } =
    attributes;
    const dispatch = useDispatch()

    const [mainColor, setMainColor] = useState(colors[0]);
    const [amount, setAmount] = useState(1)

    const cartItem = {
        cartID: id + mainColor,
        productID: id,
        productColor: mainColor,
        amount,
        title,
        company,
        price,
        image
    }

  return (
    <div className="mt-4">
        {/* colors */}
        <div>
            <p className="text-md font-semibold tracking-wider py-2">Colors</p>
            <div className="flex items-center gap-x-2">
                {colors.map((c, idx) => {
                    return <button key={idx} className={`h-6 w-6 rounded-full duration-75 ease-in ${mainColor === c && "border-2 border-secondary"}`} style={{
                        backgroundColor: c
                    }} type="button" onClick={() => setMainColor(c)}></button>
                })}
            </div>
        </div>
        {/* amount */}
        <div className="flex flex-col">
            <label htmlFor="select" className="py-2 px-1 text-md font-semibold tracking-tighter">Amount</label>
            <select id="select" className="select bg-[#272935] h-12 w-80 border-secondary border-x border-y rounded-md focus:outline-none focus:ring-1 focus:ring-secondary" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}>
                {optionsArray(20)}
            </select>
        </div>
        {/* add to cart button */}
        <button className="mt-12 btn btn-secondary" onClick={() => {
            dispatch(addCartItem(cartItem))
            toast.success("Item added to cart")
        }}>Add to bag</button>
    </div>
  )
}
export default AddToCart