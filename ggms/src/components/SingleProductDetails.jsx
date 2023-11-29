import { useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
import AddToCart from "./AddToCart";

const SingleProductDetails = () => {
  const { id, attributes } = useLoaderData()
  
  const { title, company, price, description, image } =
    attributes;
  return (
    <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
      <img className="h-96 w-96 object-cover lg:w-full rounded-lg" src={image} alt={title} />
      <div>
        <h1 className="font-bold text-3xl capitalize">{title}</h1>
        <h3 className="mt-2 text-xl font-bold text-gray-300">{company}</h3>
        <h3 className="mt-2 text-xl">{formatPrice(price)}</h3>
        <p className="mt-6 leading-loose">{description}</p>
        <AddToCart id={id} attributes={attributes} />
      </div>
    </div>
  );
};
export default SingleProductDetails;
