import { useSelector } from "react-redux";
import { formatPrice } from "../utils";


const CheckoutTotals = () => {
  const { prices } = useSelector((store) => store.cart);
  const { total, shipping, orderTotal, tax } = prices;

  return (
    <div className="card bg-base-200">
      <div className="card-body text-xs">
        <div className="flex justify-between pb-2 capitalize border-b border-black">
          <span>subtotal</span>
          <span className="font-semibold">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between pb-2 capitalize border-b border-black">
          <span>shipping</span>
          <span className="font-semibold">{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between pb-2 capitalize border-b border-black">
          <span>tax</span>
          <span className="font-semibold">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between capitalize text-sm py-4">
          <span>order total</span>
          <span className="font-semibold">{formatPrice(orderTotal)}</span>
        </div>
      </div>
    </div>
  );
};
export default CheckoutTotals;
