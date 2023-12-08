import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";
import { ClientList, SearchForm, ClientsPagination} from "../components";
import { customFetch } from "../utils";
import {useQuery, useQueryClient} from "@tanstack/react-query"
import { getData } from "../features/client/clientSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const allClientQuery = (params) => {
  const {search, sort, page} = params
  // // ! I'm dumb :/ it's returning a promise, that's why... WAHHHH!!!
  return {
    queryKey: ["clients", search || "", sort || "oldest", page || "1"],
    queryFn: async () => {
      const {data} = await customFetch.get("/clients/search-clients", {
        params,
      })
      return data;
    }
  }
}

export const loader = (queryClient) => async ({request}) => {
  const url = new URL(request.url).searchParams;
  const params = Object.fromEntries(url);
  
  const data = await queryClient.ensureQueryData(allClientQuery(params));
  // queryClient.invalidateQueries(["clients"]);
  return {params, ...data}
}

const Clients = () => {
  const {params} = useLoaderData();
  const {data} = useQuery(allClientQuery(params));
  const dispatch = useDispatch()
  console.log(data);
  useEffect(() => {
    dispatch(getData(data))
  }, [data])

  return (
    <>
      <SearchForm />
      <ClientList />
      <ClientsPagination />
    </>
  )
}
export default Clients
