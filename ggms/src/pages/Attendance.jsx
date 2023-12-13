import { toast } from "react-toastify";
import { currentDate, customFetch } from "../utils";
import { AttendanceForm, AttendanceList } from "../components";
import {useQuery} from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";

const attendanceQuery = (searchParams) => {
    const params = searchParams.createdDate ? searchParams : {...searchParams, createdDate: currentDate()}
    const {page, createdDate, search} = params

    return {
        queryKey: ["attendance", search|| "", page || "1", createdDate || currentDate()],
        queryFn: async () => {
            const {data} = await customFetch.get("/clients/search-clients", {
                params
            });
            // console.log(data);
            return data;
        }
    }
}

export const loader = (queryClient) => async ({request}) => {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);
    // console.log(searchParams);

    try {
        await queryClient.ensureQueryData(attendanceQuery(searchParams))
        // const {data} = await customFetch.get("/clients/search-clients", {
        //     params: searchParams
        // });
        // console.log(data);
        return {searchParams, queryFunc: attendanceQuery};
    } catch (error) {
        toast.error(error?.response?.data?.msg || "something went wrong");
        return error;
    }
}

const Attendance = () => {
//   const searchParams = useLoaderData();
//   const data = useQuery(attendanceQuery(searchParams));
  // ! see the log
  // ! need to pass this data on the component as a prop

  return (
    <>
        <AttendanceForm />
        <AttendanceList /> 
    </>
  )
}

export default Attendance;

