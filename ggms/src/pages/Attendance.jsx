import { toast } from "react-toastify";
import { currentDate, customFetch } from "../utils";
import { AttendanceForm, AttendanceList } from "../components";
import {useQuery} from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";

const attendaceQuery = (searchParams) => {
    const params = searchParams.createdDate ? searchParams : {...searchParams, createdDate: currentDate()}

    return {
        queryKey: ["attendance", {...params}],
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
    console.log(searchParams);

    try {
        await queryClient.ensureQueryData(attendaceQuery(searchParams))
        // const {data} = await customFetch.get("/clients/search-clients", {
        //     params: searchParams
        // });
        // console.log(data);
        return searchParams;
    } catch (error) {
        toast.error(error?.response?.data?.msg || "something went wrong");
        return error;
    }
}

const Attendance = () => {
  const searchParams = useLoaderData();
  const data = useQuery(attendaceQuery(searchParams));
  // ! see the log
    console.log(data);
  return (
    <>
        {/* <AttendanceForm /> */}
        {/* <AttendanceList />  */}
    </>
  )
}

export default Attendance;

