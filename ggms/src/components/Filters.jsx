import { useDispatch, useSelector } from "react-redux"
import { Form, Link, useLoaderData } from "react-router-dom"
import { formatPrice } from "../utils";
import { changePrice, resetPrice } from "../features/filter/filterSlice";
import FormSelect from "./FormSelect";

const Filters = () => {
    const {meta, searchObj} = useLoaderData()
    const {min, max, filters: {price}} = useSelector((store) => store.filter)
    const dispatch = useDispatch()
    const {categories, companies} = meta
    const sortArray = ["a-z", "z-a", "high", "low"]
    
  return (
    <Form className="grid gap-y-8 gap-x-4 bg-[#181920] px-8 py-5 rounded-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* search */}
        <div className="flex flex-col">
            <label htmlFor="search" className="text-sm p-1">Search Product</label>
            <input className="input input-secondary input-sm border-gray-500" type="search" name="search" id="search" defaultValue={searchObj.search}/>
        </div>
        {/* category */}
            <FormSelect optionsArray={categories} option={"category"} searchObj={searchObj.category} />
        {/* company */}
            <FormSelect optionsArray={companies} option={"company"} searchObj={searchObj.company} />
        {/* sort */}
            <FormSelect optionsArray={sortArray} option={"order"} searchObj={searchObj.order} />
        {/* price */}
        <div className="flex flex-col ">
            <label htmlFor="price" className="text-sm p-1 flex justify-between"><span>Search Price</span><span className="text-base">{formatPrice(price)}</span></label>
            <input className="range range-secondary range-sm border-gray-500" type="range" name="price" id="price" min={min} max={max} value={price} step="1000" onChange={(e) => {
                dispatch(changePrice(parseInt(e.target.value)))
            }}/>
            <ul className="p-2 flex justify-between text-xs font-bold">
                <li>{min}</li>
                <li>Max: {formatPrice(max)}</li>
            </ul>
        </div>
        {/* shipping */}
        <div className="flex flex-col place-items-center">
            <p className="text-sm p-2">Free Shipping</p>
            <input className="checkbox checkbox-secondary checkbox-sm" type="checkbox" name="shipping" defaultChecked={searchObj.shipping}/>
        </div>
        {/* search button */}
        <div className="flex place-items-center">
            <button className="btn btn-secondary btn-sm btn-block" type="submit">search</button>
        </div>
        {/* reset button */}
        <div className="flex place-items-center">
            <Link to="/products" className="btn btn-block btn-sm btn-accent text-gray-800" onClick={() => dispatch(resetPrice())}>reset</Link>
        </div>
    </Form>
  )
}
export default Filters