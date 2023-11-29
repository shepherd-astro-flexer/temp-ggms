import ShippingInfo from "./ShippingInfo"
import CheckoutTotals from "./CheckoutTotals"

const ShippingContent = () => {
  return (
    <div className="grid gap-8 mt-8 md:grid-cols-2 items-start">
      <ShippingInfo/>
      <CheckoutTotals/>
    </div>
  )
}
export default ShippingContent
