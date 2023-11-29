import { useLocation, useNavigate } from "react-router-dom"
import { customFetch } from "../utils"

const AttendeeCard = ({_id, name, lastName, clientId, idx}) => {
    const navigate = useNavigate()
    const {pathname, search} = useLocation()
    
    const deleteAtendee = async () => {
       await customFetch.delete(`/attendance/${_id}`)
       navigate(`${pathname}${search}`)
    }

  return (
    <tr>
        <th>{idx}</th>
        <td className="capitalize">{name}</td>
        <td className="capitalize">{lastName}</td>
        <td><button className="btn btn-xs btn-secondary capitalize" onClick={deleteAtendee}>delete</button></td>
    </tr>
  )
}
export default AttendeeCard
