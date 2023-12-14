const DateInput = ({defaultValue}) => {
  return (
    <div>
      <label htmlFor="birthdate" className="label label-text capitalize">birthdate</label>
      <input type="date" name="birthdate" id="birthdate" className="input-sm border border-base-content border-opacity-20 rounded-sm w-full bg-base-100 uppercase" defaultValue={defaultValue}/>
    </div>
  )
}
export default DateInput