import { customFetch } from "../utils";
import { Filters, Pagination } from "../components";
import ProductsContent from "../components/ProductsContent";

const fetchFeaturedQuery = (params) => {
  return {
    queryKey: ["products", { ...params }],
    queryFn: async () => {
      const { data } = await customFetch.get("/products", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const searchObj = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const {data: products, meta} = await queryClient.ensureQueryData(fetchFeaturedQuery(searchObj));

    return {products, meta, searchObj};
  };

const Products = () => {
  return (
    <div>
      <Filters/>
      <ProductsContent/>
      <Pagination />
    </div>
  );
};

export default Products;