import { Link } from "react-router-dom"
import {MdOutlineArrowRight} from "react-icons/md"

const Navigations = () => {
  return (
    <div className="flex items-center py-2">
      <Link className="hover:underline" to="/">Home</Link>
      <span className="text-slate-500"><MdOutlineArrowRight className="text-xl"/></span>
      <Link className="hover:underline" to="/products">Products</Link>
    </div>
    
  )
}
export default Navigations