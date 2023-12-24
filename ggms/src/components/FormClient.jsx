import { MEMBER_TYPE, SEX } from "../../../utils/constants";
import { Form } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import SubmitBtn from "./SubmitBtn";
import DateInput from "./DateInput";

const FormClient = () => {
  return (
    <Form method="POST" className="bg-base-200 p-8 rounded-md">
      <h1 className="capitalize text-md mb-2 md:text-xl lg:text-2xl xl:text-3xl">add client</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <FormInput label="name" name="name" size="input-sm" />
        <FormInput label="last name" name="lastName" size="input-sm"/>
        <FormInput label="email" name="email" size="input-sm" type="email" defaultValue="tara_laro@gilasgym.com"/>
        <DateInput />
        <FormSelect optionsArray={Object.values(SEX)} option="sex"/>
        <FormSelect optionsArray={Object.values(MEMBER_TYPE)} option="type"/>
        <div className="flex items-end mt-4">
          <SubmitBtn text="submit" size="btn-sm"/>
        </div>
      </div>
    </Form>
  )
}
export default FormClient