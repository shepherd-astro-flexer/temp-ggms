import { Form, Link } from "react-router-dom";
import {LiaBirthdayCakeSolid} from "react-icons/lia";
// import {SlLocationPin} from "react-icons/sl";
import CardInfo from "./CardInfo";
import { formatDate } from "../utils";

const ClientCard = ({ client }) => {
  const {name, lastName, _id, birthdate} = client;
  
  return (
    <div className="bg-base-200 rounded-md">
       <div className="flex px-6 py-4 border-b border-b-base-100">
          <div className="grid place-items-center bg-primary rounded-sm w-14 h-14">
            <p className="font-bold capitalize text-xl">{name.slice(0, 1)}</p>
          </div>
          <div className="capitalize ml-4">
            <p className="text-md lg:text-lg xl:text-xl 2xl:text-2xl">{name}</p>
            <p className="text-neutral-content">{lastName}</p>
          </div>
      </div>
      <div className="grid grid-cols-2 px-6 py-4">
        {birthdate && <CardInfo Icon={LiaBirthdayCakeSolid} property={formatDate(birthdate)}/>}
      </div>
      <Form method="POST" action={`/dashboard/delete-job/${_id}`} className="flex px-6 py-4 gap-x-2">
        <Link className="btn btn-primary btn-sm capitalize" to={`/dashboard/edit-client/${_id}`}>edit</Link>
        <button className="btn btn-primary btn-sm capitalize" type="submit">delete</button>
      </Form>
    </div>
  );
};
export default ClientCard;
