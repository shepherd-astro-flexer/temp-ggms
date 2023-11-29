import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils";
import {
  removeCartItem,
  updateCartItemAmount,
} from "../features/cart/cartSlice";

const CartItems = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleAmount = (id, amount) => {
    dispatch(updateCartItemAmount({ id, amount }));
  };

  return (
    <>
      {cartItems.map((cartItem) => {
        const {
          amount,
          cartID,
          company,
          image,
          price,
          productColor,
          title,
        } = cartItem;
  
        const amountArray = Array.from({ length: amount + 5}, (_, idx) => {
          const optionAmount = idx + 1;

          return <option key={optionAmount}>{optionAmount}</option>;
        });

        return (
          <div
            key={cartID}
            className="flex flex-col gap-y-4 border-b first:pt-0 border-black py-6 sm:flex-row sm:justify-between last:border-none"
          >
            <img 
              className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
              src={image}
              alt={title}
            />
            <div className=" sm:ml-16 sm:w-48">
              <h2 className="text-md font-semibold capitalize">{title}</h2>
              <h3 className="text-sm text-slate-300 pt-2">{company}</h3>
              <div className="flex items-center gap-2 pt-3">
                <span className="text-sm">Color :</span>{" "}
                <span
                  style={{ backgroundColor: productColor }}
                  className="h-4 w-4 block rounded-full border border-black"
                ></span>
              </div>
            </div>
            <div className="sm:ml-12 ">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="amount">
                  Amount
                </label>
                <select
                  className="select select-xs select-bordered mt-2 w-80 sm:w-auto"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => {
                    handleAmount(cartID, parseInt(e.target.value));
                  }}
                >
                  {amountArray}
                </select>
              </div>
              <div>
                <button
                  className="mt-2 text-sm text-secondary hover:underline hover:text-violet-500"
                  onClick={() => handleRemove(cartID)}
                >
                  remove
                </button>
              </div>
            </div>
            <h3 className="text-md font-semibold capitalize sm:ml-auto">
              {formatPrice(price)}
            </h3>
          </div>
        );
      })}
    </>
  );
};
export default CartItems;
