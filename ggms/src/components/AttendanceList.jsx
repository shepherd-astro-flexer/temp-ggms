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
  // console.log(attendees);

  const total = attendees.reduce((accu, currentVal) => {
    if (currentVal.type === "regular") {
      accu += 30
    } else {
      accu += 20
    }

    return accu
  }, 0)

  return (
    <div className="overflow-x-auto mt-16">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Sales</th>
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
        <div>
          <p className="my-4 font-bold text-lg capitalize whitespace-nowrap">total sales : <span className="text-accent">{total}</span></p>
        </div>
    </div>
  )
}
export default AttendanceList

// <tr>
// <td className="mt-16 font-bold text-lg capitalize">total attendees : <span className="text-accent">{attendees.length}</span></td>
// </tr>


{/* <tr>
                <th className="mt-16 font-bold capitalize text-lg">total sales : <span className="text-accent">{total}</span></th>
              </tr> */}
