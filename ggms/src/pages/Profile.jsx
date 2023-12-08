import { Form, redirect, useLoaderData, useOutletContext } from "react-router-dom"
import { toast } from "react-toastify";
// local imports
import { FormInput, SubmitBtn, FileInput } from "../components"
import { customFetch } from "../utils";

// * action
export const action = (queryClient) => async ({request}) => {
    const formData = await request.formData();
    
    const file = formData.get("avatar");
    console.log(file.size > 500000);
    if (file && file.size > 500000) {
      toast.error("Image size is too large");
      return null
    }
    // console.log(formData.get("username"));
    try {
       // * Send the formData on the server if there is a file
        await customFetch.patch("/users/update-user", formData);
        queryClient.invalidateQueries(["user"])
        toast.success("Profile updated successfully");
    } catch (error) {
        toast.error(error?.response?.data?.msg || "Something went wrong")
    }

    return redirect("/")
}

// * loader
// export const loader = async () => {
//   try {
//       const {data} = await customFetch.get("/users/current-user");
//       return data
//   } catch (error) {
//       toast.error(error?.response?.data?.msg || "something went wrong");
//       return redirect("/");
//   }
// }

const Profile = () => {
  const {username, email} = useOutletContext();
  
  return (
    <Form method="POST" className="bg-base-200 p-8 rounded-md" encType="multipart/form-data">
      <h1 className="capitalize text-md mb-2 md:text-xl lg:text-2xl xl:text-3xl">profile</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <FileInput />
        <FormInput label="username" name="username" size="input-sm" defaultValue={username}/>
        <FormInput label="email" name="email" size="input-sm" type="email" testDefault="tara_laro@gilasgym.com" defaultValue={email}/>
        <div className="flex items-end mt-4">
          <SubmitBtn text="submit" size="btn-sm"/>
        </div>
      </div>
    </Form>
  )
}
export default Profile