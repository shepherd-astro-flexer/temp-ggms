import { customFetch } from "../utils"
import { Navigations, SingleProductDetails } from "../components"

const singleProductQuery = (val) => {
  return {
    queryKey: ["products", val],
    queryFn: async ()=> {
      const {data: {data}} = await customFetch.get(`/products/${val}`)
      return data
    }
  }
}

export const loader = (queryClient) => async ({params}) => {
  const id = params.id
  const response = await queryClient.ensureQueryData(singleProductQuery(id))
  
  return response
}

const SingleProduct = () => {
  return (
    <div>
      <Navigations />
      <SingleProductDetails/>
    </div>
  )
}
export default SingleProduct