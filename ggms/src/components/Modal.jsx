import {PiNoteBlankFill, PiNoteFill, PiCheckBold} from "react-icons/pi";
import { Form, useNavigation } from "react-router-dom";
import { customFetch } from "../utils";
import { useEffect, useState } from "react";

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
  const [saveText, setSaveText] = useState("save")
  console.log(navigation);
  const isSubmitting = navigation.state === "submitting";

  const changeSaveText = () => {
    setSaveText(<>saved <PiCheckBold/></>)

    setTimeout(() => {
      setSaveText("save")
    }, 3000)
  }

  useEffect(() => {
    if (isSubmitting) {
      changeSaveText()
    }
  }, [navigation.state])
  
  return (
    <>
      <button className="btn btn-ghost btn-sm" title="Add note" onClick={()=> {
        document.getElementById(id).showModal()
      }}>{!note ? <PiNoteBlankFill className="h-6 w-6"/> : <PiNoteFill className="h-6 w-6"/>}</button>
        <dialog id={id} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a note for <span className="capitalize text-primary">{name}</span></h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            <Form method="POST">
              <textarea name="note" placeholder="Note down important client updates or reminders.." rows="5" className="textarea textarea-bordered textarea-lg w-full text-sm row" defaultValue={note}></textarea>
              <input type="hidden" name="id" value={id} />  
              <div className="mt-4 flex justify-end">
              <button type="submit" className="btn btn-primary btn-sm capitalize w-40" disabled={isSubmitting}>
                {isSubmitting ? <>
                    <span className="loading loading-spinner"></span>
                    saving...
                </> : saveText}
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