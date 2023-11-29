const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
        className={`input input-bordered ${size}`}
        required={name === "search" ? false : true}
        id={name}
      />
    </div>
  );
};
export default FormInput;
