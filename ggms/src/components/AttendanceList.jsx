import { useLoaderData } from "react-router-dom";
import AttendeeCard from "./AttendeeCard";
import { useQuery } from "@tanstack/react-query";

const AttendanceList = () => {
  const {searchParams, queryFunc} = useLoaderData();
  const {data} = useQuery(queryFunc(searchParams));
  const {attendees, } = data;
   
  if (attendees.length < 1) {
    return <div className="mt-16">
    <h1 className="text-2xl tracking-wider md:text-3xl lg:text-4xl xl:text-5xl">No attendees to display...</h1>
  </div>
  }

  return (
    <div className="overflow-x-auto mt-16">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Last Name</th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {attendees.map((attendee, idx) => {
                return <AttendeeCard key={attendee.clientId} {...attendee} idx={idx + 1}/>
            })} 
            
            </tbody>
        </table>
    </div>
  )
}
export default AttendanceList

