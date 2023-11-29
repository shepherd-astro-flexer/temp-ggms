import { useLoaderData } from "react-router-dom";

const OrdersContent = () => {
  const {data, meta} = useLoaderData()

  return (
    <div className="mt-8">
      <h1 className="text-md capitalize mb-4">total orders : {meta.pagination.total}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ attributes, id }) => {
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                attributes;
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersContent;
