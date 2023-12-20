import {FaStickyNote} from "react-icons/fa";
import { Form } from "react-router-dom";
import { customFetch } from "../utils";

const Modal = ({id}) => {
  const saveNote = async(e) => {
    console.log(e.target.value);

    await customFetch.patch(`attendance/${id}`);
  }

  return (
    <>
      <button className="btn btn-ghost btn-sm" title="Add note" onClick={()=> {
        document.getElementById(id).showModal()
      }}><FaStickyNote className="h-5 w-5"/></button>
        <dialog id={id} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a note</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            <div>
              <textarea placeholder="Note down important client updates or reminders.." rows="5" className="textarea textarea-bordered textarea-lg w-full text-sm row"></textarea>
              <div className="mt-4 flex justify-end">
                <button className="btn btn-primary btn-sm capitalize" type="button" onClick={saveNote}>save</button>
              </div>
            </div>
          </div>  
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
      </dialog>
    </>
  )
}
export default Modal