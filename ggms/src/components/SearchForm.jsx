import FormSelect from "../components/FormSelect";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";
import FormInput from "./FormInput";
import { SORT_BY } from "../../../utils/constants";
import { useSelector } from "react-redux";

const SearchForm = () => {
  const navigate = useNavigate();
  // const {query: {search, sort}} = useLoaderData();
  const {data} = useSelector((store) => store.client);
  const {query: {search, sort}} = data;

  return (
    <Form className="bg-base-200 p-8 rounded-md">
      <h1 className="capitalize text-sm mb-2 md:text-md lg:lg xl:text-xl">search form</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormInput label="search name" name="search" size="input-sm" type="search" defaultValue={search}/>
        <FormSelect optionsArray={Object.values(SORT_BY)} option="sort" searchObj={sort}/>
        <div className="flex items-end mt-4">
          <SubmitBtn text="submit" size="btn-sm"/>
        </div>
        <div className="flex items-end mt-4">
          <button className="btn btn-sm btn-block btn-accent" type="button" onClick={() => {
            navigate("/all-clients")
          }}>
            reset
          </button>
        </div>
      </div>
    </Form>
  )
}

export default SearchForm