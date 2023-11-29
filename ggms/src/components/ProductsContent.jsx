import ProductsGrid from "./ProductsGrid"
import {PiListFill, PiGridFourFill} from "react-icons/pi"
import ProductsList from "./ProductsList"
import { useDispatch, useSelector } from "react-redux"
import { layoutGrid, layoutList } from "../features/products/productsSlice"
import { useLoaderData } from "react-router-dom"

const ProductsContent = () => {
  const {products, meta} = useLoaderData()
  const {isGrid} = useSelector((store) => store.products)
  const dispatch = useDispatch()

  return (
    <div>
      <div className="flex justify-between mt-10 pb-5">
        <h4 className="font-semibold">{meta.pagination.total} product{meta.pagination.total > 1 && "s"}</h4>
        <div className="flex gap-x-2">
          <button className={`btn btn-circle btn-sm ${isGrid ? "bg-[#181920]" : "bg-inherit"} outline-0 border-0 `}  type="button" onClick={() => dispatch(layoutGrid())}><PiGridFourFill className="h-5 w-5"/></button>
          <button className={`btn btn-circle btn-sm ${!isGrid ? "bg-[#181920]" : "bg-inherit"} outline-0 border-0 `}  type="button" onClick={() => dispatch(layoutList())}><PiListFill className="h-5 w-5"/></button>
        </div>
      </div>
      <hr className="border-black" />
      {isGrid ? <ProductsGrid products={products}/> : <ProductsList products={products}/>}
    </div>
  )
}
export default ProductsContent