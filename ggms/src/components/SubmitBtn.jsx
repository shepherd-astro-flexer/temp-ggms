import { useNavigation } from "react-router-dom";


const SubmitBtn = ({ text, icon, size }) => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting";

  return (
    <button type="submit" className={`btn btn-primary btn-block ${size}`} disabled={isSubmitting}>
        {isSubmitting ? <>
            <span className="loading loading-spinner"></span>
            sending...
        </> : <>{text}{icon}</> || "submit"}
    </button>
  );
};
export default SubmitBtn;
