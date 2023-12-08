import { useLoaderData } from "react-router-dom"
import ClientCard from "./ClientCard"
import { useSelector } from "react-redux";

const ClientList = () => {
  const {data} = useSelector((store) => store.client);
  const {totalJobs, clients} = data;

  if (clients.length < 1) {
    return <div className="mt-16">
      <h1 className="text-2xl tracking-wider md:text-3xl lg:text-4xl xl:text-5xl">No clients to display...</h1>
    </div>
  }

  return (
    <div className="mt-16">
      <h2 className="capitalize font-bold text-sm mb-5 md:text-md lg:lg xl:text-xl tracking-widest">{totalJobs} client{totalJobs > 1 ? "s" : ""} found</h2>
      <div className="grid gap-8 lg:grid-cols-2"> 
        {clients.map(client => {
          return <ClientCard key={client._id} client={client}/>
        })}
      </div>
    </div>
  )
}
export default ClientList