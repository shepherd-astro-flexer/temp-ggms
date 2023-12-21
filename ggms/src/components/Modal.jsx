import {FaStickyNote} from "react-icons/fa";
import { Form } from "react-router-dom";
import { customFetch } from "../utils";
// ! modify the action
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
 } catch (error) {
  toast.error(error?.response?.data?.msg || "something went wrong")
 }

 return redirect("/dashboard/attendance")
}

const Modal = ({id}) => {

  return (
    <>
      <button className="btn btn-ghost btn-sm" title="Add note" onClick={()=> {
        document.getElementById(id).showModal()
      }}><FaStickyNote className="h-5 w-5"/></button>
        <dialog id={id} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a note</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            <Form method="POST">
              <textarea placeholder="Note down important client updates or reminders.." rows="5" className="textarea textarea-bordered textarea-lg w-full text-sm row"></textarea>
              <div className="mt-4 flex justify-end">
                <button className="btn btn-primary btn-sm capitalize" type="submit">save</button>
              </div>
            </Form>
          </div>  
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
      </dialog>
    </>
  )
}
export default Modal