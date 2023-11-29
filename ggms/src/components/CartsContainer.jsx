import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import CheckoutTotals from "./CheckoutTotals";
import { Link } from "react-router-dom";

const CartsContainer = () => {
  const user = useSelector((store) => store.user.user)

  return (
    <div className="flex flex-col mt-8 lg:flex-row gap-x-12">
      <div className="mb-12 grid gap-y-6 lg:basis-8/12">
        <CartItems />
      </div>
      <div className="lg:basis-4/12">
        <CheckoutTotals />
        {user ? (
        <Link className="btn btn-secondary btn-block mt-8" to="/checkout">proceed to checkout</Link>
        ) : (
          <Link className="btn btn-secondary btn-block mt-8" to="/login">please login</Link>
        )}
      </div>
    </div>
  );
};
export default CartsContainer;
