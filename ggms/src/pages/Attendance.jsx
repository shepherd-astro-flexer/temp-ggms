import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { currentDate } from "../utils";
import { AttendanceForm, AttendanceList } from "../components";

export const loader = async ({request}) => {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);
    console.log(searchParams);
    try {
        const {data} = await customFetch.get("/clients/search-clients", {
            params: searchParams.createdDate ? searchParams : {...searchParams, createdDate: currentDate()}
        });
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.msg || "something went wrong");
        return error;
    }
}

const Attendance = () => {
  return (
    <>
        <AttendanceForm />
        <AttendanceList/>
    </>
  )
}

export default Attendance;

