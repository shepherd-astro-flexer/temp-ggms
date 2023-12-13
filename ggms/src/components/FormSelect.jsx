const FormSelect = ({optionsArray, option, searchObj, onChange}) => {
  return (
    <div className="flex flex-col justify-end">
        <label className="text-sm p-1 capitalize" htmlFor={option}>Select {option}</label>
        <select className="select select-sm select-bordered font-semibold" name={option} id={option} defaultValue={searchObj} onChange={onChange}>
            {optionsArray.map(val => <option key={val}>{val}</option>)}
        </select>
    </div>
  )
}
export default FormSelect