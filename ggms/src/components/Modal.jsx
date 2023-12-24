import {FaStickyNote} from "react-icons/fa";
import { Form, useNavigation } from "react-router-dom";
import { customFetch } from "../utils";

export const action = (queryClient) => async ({request}) => {
  const formData = await request.formData();
  let {note, id} = Object.fromEntries(formData);
 
 try {
  await customFetch.patch(`/attendance/${id}`, {note});
  queryClient.invalidateQueries(["attendance"])
  return null
 } catch (error) {
  toast.error(error?.response?.data?.msg || "something went wrong")
  return error
 }
}

const Modal = ({id, note, name}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  return (
    <>
      <button className="btn btn-ghost btn-sm" title="Add note" onClick={()=> {
        document.getElementById(id).showModal()
      }}><FaStickyNote className="h-5 w-5"/></button>
        <dialog id={id} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a note for <span className="capitalize text-primary">{name}</span></h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            <Form method="POST">
              <textarea name="note" placeholder="Note down important client updates or reminders.." rows="5" className="textarea textarea-bordered textarea-lg w-full text-sm row" defaultValue={note}></textarea>
              <input type="hidden" name="id" value={id} />  
              <div className="mt-4 flex justify-end">
              <button type="submit" className="btn btn-primary btn-sm capitalize btn-block" disabled={isSubmitting}>
                {isSubmitting ? <>
                    <span className="loading loading-spinner"></span>
                    saving...
                </> : "save"}
              </button>
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