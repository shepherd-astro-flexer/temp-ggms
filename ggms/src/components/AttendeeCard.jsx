import { useLocation, useNavigate } from "react-router-dom"
import { customFetch } from "../utils"
import { useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";

const AttendeeCard = ({_id, name, lastName, type, idx, note}) => {
    const navigate = useNavigate();
    const {pathname, search} = useLocation();
    const queryClient = useQueryClient();

    const deleteAtendee = async () => {
       await customFetch.delete(`/attendance/${_id}`);
       queryClient.invalidateQueries(["attendance"]);
       navigate(`${pathname}${search}`);
    }

  return (
    <tr className="capitalize hover:bg-primary-focus">
      <th>{idx}</th> 
      <td>{name}</td>
      <td>{lastName}</td>
      <td>{type === "regular" ? 30 : 20}</td>
      <td><Modal id={_id} note={note} name={name}/></td>
      <td><button className="btn btn-xs btn-secondary capitalize" onClick={deleteAtendee}>delete</button></td>
    </tr>
  )
}
export default AttendeeCard
