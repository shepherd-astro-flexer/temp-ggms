import { ClientList, SearchForm, ClientsPagination} from "../components";
import { customFetch } from "../utils";

export const loader = async ({request}) => {
  const url = new URL(request.url).searchParams;
  const params = Object.fromEntries(url)
  
  try {
    const {data} = await customFetch.get("/clients/search-clients", {
      params
    })
    console.log(data);
    return data
  } catch (error) {
    console.log(error);
    return error
  }
}

const Clients = () => {
  return (
    <>
      <SearchForm />
      <ClientList />
      <ClientsPagination />
    </>
  )
}
export default Clients