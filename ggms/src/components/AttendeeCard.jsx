import { useLocation, useNavigate } from "react-router-dom"
import { customFetch } from "../utils"
import { useQueryClient } from "@tanstack/react-query";
import Modal from "./Modal";

const AttendeeCard = ({_id, name, lastName, clientId, idx, note}) => {
    const navigate = useNavigate();
    const {pathname, search} = useLocation();
    const queryClient = useQueryClient();

    const deleteAtendee = async () => {
       await customFetch.delete(`/attendance/${_id}`);
       queryClient.invalidateQueries(["attendance"]);
       navigate(`${pathname}${search}`);
    }

  return (
    <tr>
        <th>{idx}</th>
        <td className="capitalize">{name}</td>
        <td className="capitalize">{lastName}</td>
        <td><Modal id={_id} note={note} name={name}/></td>
        <td><button className="btn btn-xs btn-secondary capitalize" onClick={deleteAtendee}>delete</button></td>
    </tr>
  )
}
export default AttendeeCard
