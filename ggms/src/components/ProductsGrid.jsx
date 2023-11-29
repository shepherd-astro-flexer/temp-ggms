import { Link } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsGrid = ({ products }) => {
// * by default grid is one column, so we can just omit it

  if (products.length < 1) {
    return <div className="pt-16">
      <h2 className="text-2xl">Sorry, no products matched your search...</h2>
    </div>
  }

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map(({ id, attributes }) => {
        const { title, image, price } = attributes;
        return (
          <Link
            key={id}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
            to={`/products/${id}`}
          >
            <figure className="px-4 pt-4">
              <img
                className="h-64 rounded-xl md:h-48 w-full object-cover"
                src={image}
                alt={title}
              />
            </figure>
            <div className="card-body items-center text-center">
              <p className="card-title capitalize tracking-wider">
                {title}
              </p>
              <p className="text-secondary">{formatPrice(price)}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
