import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';
import { ChartsContainer } from '../components';
import { MdQueryStats } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';

const singleStatsQuery = (params) => {
  return {
    queryKey: ["singleStats", params.id],
    queryFn: async () => {
      const {data} = await customFetch.get(`/clients/single-stats/${params.id}`);
      return data;
    }
  }
}

export const loader = (queryClient) => async ({params}) => {
  try {
    await queryClient.ensureQueryData(singleStatsQuery(params));
    return params;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "something went wrong");
    return redirect("/all-clients");
  }
}

const SingleStats = () => {
  const params = useLoaderData();
  const {data} = useQuery(singleStatsQuery(params))
  const {monthlyGymSessions, client} = data;
  const {name, lastName} = client
  return (
    <>
      <h1 className='text-3xl font-bold capitalize mb-2 flex gap-x-2'>monthly gym sessions <MdQueryStats /></h1>
      <p className="text-2xl font-semibold text-primary">{name} {lastName}</p>
      {monthlyGymSessions?.length > 0 && <ChartsContainer data={monthlyGymSessions} client={client}/>}
    </>
  );
};

export default SingleStats;
