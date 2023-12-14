import { useNavigate, useLocation, useLoaderData, Form, useSubmit } from "react-router-dom";
import { currentDate, customFetch, debounce } from "../utils";
import { toast } from "react-toastify";
import ClientsPagination from "./ClientsPagination";
import { useNavigation } from "react-router-dom/dist/umd/react-router-dom.development";
import { useQuery } from "@tanstack/react-query";

// import FormPagination from "./FormPagination";

export const action = (queryClient) => async ({request}) => {
  const formData = await request.formData();
  let data = Object.fromEntries(formData);
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams)
  data.createdDate = searchParams.createdDate || currentDate();
 try {
  const {data: client} = await customFetch.post("/attendance/", data);
  queryClient.invalidateQueries(["attendance"])
  const clientName = client.name.charAt(0).toUpperCase() + client.name.slice(1);
  toast.success(`Successfully added ${clientName} on the list`);
  return null
 } catch (error) {
  toast.error(error?.response?.data?.msg || "something went wrong")
  return error
 }
}

const AttendanceForm = () => {
  // ! hindi lang naman sa main page pwede gamitin yung useQuery, right?
  const {searchParams, queryFunc} = useLoaderData();
  const {data} = useQuery(queryFunc(searchParams));
  const {clients, attendees, query: {createdDate, search : searchName}} = data;
  
  const submit = useSubmit();
  // * used useSubmit hook for a different approach :D
  // const navigate = useNavigate();
  // const {pathname, search} = useLocation();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <div className="bg-base-200 p-8 rounded-md">
      <h1 className="text-3xl capitalize">attendance form</h1>
      <Form>
        <div>
          <label htmlFor="createdDate" className="label label-text">Choose a date:</label>
          <input type="date" name="createdDate" id="createdDate" className="input-sm max-w-md border border-base-content border-opacity-20 rounded-sm w-full bg-base-100 uppercase" defaultValue={createdDate} onChange={(e) => {
            submit(e.currentTarget.form)
          }}/>
          <p className="text-sm text-info">(Defaults to current date if ommited)</p>
        </div>
        <div className="mt-4">
          <label className="label label-text">Click or search a client that you want to add on the list:</label>
          <input type="search" name="search" placeholder="Search for a name or last name" className="input input-sm input-bordered w-full max-w-md" defaultValue={searchName} onInput={debounce((form) => {
            // ! the submit hook is expecting the FORM from the currentTarget
            submit(form)
          }, 2000)}/>
        </div>
      </Form>
      <div className="mt-4">
        <div className="grid grid-cols-2 mt-6 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
          {clients.length < 1 ? <p className="font-semibold tracking-wide">No results found...</p> : clients.map(client => {
              const {name, lastName, _id} = client;

              const attendeeExist = attendees.find(attendee => {
                  return attendee.clientId === _id
              })

              return <Form key={_id} method="POST">
                  <input type="hidden" name="name" value={name}/>
                  <input type="hidden" name="lastName" value={lastName}/>
                  <input type="hidden" name="clientId" value={_id}/>
                  <button className="btn btn-xs btn-primary btn-outline capitalize w-full" type="submit" disabled={attendeeExist || submitting}>
                  {name} {lastName}
                  </button>
              </Form>
          })}
        </div>
      </div>
      <ClientsPagination attendance />
    </div>
  )
}

export default AttendanceForm

// (e) => {
//   console.log(e.target.value);
//   submit(e.currentTarget.form)
// }
